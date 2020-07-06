"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLogEventHandler = void 0;
const common_1 = require("@nestjs/common");
const nest_event_1 = require("nest-event");
const events_1 = require("events");
const moment = require("moment-timezone");
const employee_attendance_model_1 = require("src/database/sequelize-db/models/employee-attendance.model");
const async_1 = require("async");
const decoded_token_interface_1 = require("src/common/interfaces/decoded-token.interface");
let DataLogEventHandler = class DataLogEventHandler extends events_1.EventEmitter {
    constructor(httpService, empAttendanceModel) {
        super();
        this.httpService = httpService;
        this.empAttendanceModel = empAttendanceModel;
    }
    updateActivityAndUsage(data, timezone) {
        data.forEach((item) => {
            (async () => {
                try {
                    this.httpService.post(process.env.ACTIVITY_PRODUCTIVITY_URL, {
                        organization_id: item.adminId,
                        task_id: item.taskId <= 0 ? 0 : item.taskId,
                        project_id: item.projectId <= 0 ? 0 : item.projectId,
                        employee_id: item.userId,
                        break_duration: item.breakInSeconds,
                        appUsage: item.appUsage.map((elem, index) => {
                            return {
                                app: elem.app || '',
                                start: elem.start,
                                end: index + 1 === item.appUsage.length && elem.end == 0 ? item.mode.end : elem.end,
                                url: elem.url,
                                keystrokes: elem.keystrokes,
                                title: elem.title
                            };
                        }),
                        activityPerSecond: item.activityPerSecond,
                        systemTimeUtc: item.systemTimeUtc,
                        email: item.userEmail,
                        timezone
                    }).subscribe(res => { console.log(res.data.message); }, error => {
                        console.error("Error in updating activities stats");
                        if (error && error.response && error.response.data)
                            return console.log(error.response.data);
                        else
                            return console.log(error.errno);
                    });
                }
                catch (err) {
                    console.log('--erre---', err);
                }
            })();
        });
    }
    async updateAttendance(dataObjectToUpdate, endDate) {
        await dataObjectToUpdate.update({ end_time: endDate.format('YYYY-MM-DD HH:mm:ss') });
    }
    async getMaxLogoutTime(sysTimeUtc, userData, previousLoginTime, previousLogoutTime, startDate) {
        let maxLogoutTime = moment(sysTimeUtc);
        const setting = userData.logoutOptions || {
            option: 2,
            specificTimeUTC: '00:00',
            specificTimeUser: '00:00',
            afterFixedHours: 10
        };
        ;
        switch (setting.option) {
            case 1: {
                if (setting.specificTimeUTC === '00:00') {
                    maxLogoutTime = previousLoginTime.clone().endOf('day');
                }
                else {
                    const timeSpecified = setting.specificTimeUTC.split(':');
                    maxLogoutTime = previousLoginTime.clone().set({ hours: parseInt(timeSpecified[0]), minutes: parseInt(timeSpecified[1]), seconds: 0 });
                }
                break;
            }
            case 2: {
                if (setting.specificTimeUser === '00:00') {
                    maxLogoutTime = previousLoginTime.clone().tz(userData.timezone).endOf('day');
                }
                else {
                    const timeSpecified = setting.specificTimeUser.split(':');
                    maxLogoutTime = previousLoginTime.clone().tz(userData.timezone).set({ hours: parseInt(timeSpecified[0]), minutes: parseInt(timeSpecified[1]), seconds: 0 });
                }
                break;
            }
            case 3: {
                maxLogoutTime = previousLoginTime.add(1, 'day');
                break;
            }
            case 4: {
                if ((previousLogoutTime.tz(userData.timezone).date() < startDate.tz(userData.timezone).date()) && startDate.diff(previousLogoutTime) >= setting.afterFixedHours) {
                    maxLogoutTime = previousLogoutTime;
                }
                else {
                    maxLogoutTime = previousLoginTime.add(1, 'day');
                }
                break;
            }
            default:
                break;
        }
        return maxLogoutTime;
    }
    async updateToken(data, userData) {
        async_1.forEachSeries(data, (item, iterator) => {
            (async () => {
                const startDate = moment(item.systemTimeUtc);
                const startTime = moment(item.systemTimeUtc);
                const endDate = moment(item.systemTimeUtc).add(item.activityPerSecond.buttonClicks.length > 900 ? 180 : item.activityPerSecond.buttonClicks.length, 'seconds');
                const previousAttendanceRawData = await this.empAttendanceModel.getLastInsertedAttendanceLastInserted(item.userId, startDate.format('YYYY-MM-DD'));
                if (previousAttendanceRawData) {
                    const previousAttendanceData = previousAttendanceRawData.toJSON();
                    const previousLoginTime = moment(previousAttendanceData.start_time);
                    const previousLogoutTime = moment(previousAttendanceData.end_time);
                    const maxLogoutTime = await this.getMaxLogoutTime(item.systemTimeUtc, userData, previousLoginTime, previousLogoutTime, startDate);
                    if (startDate.diff(maxLogoutTime) > 0) {
                        let newStartDate = startDate.clone().tz(userData.timezone).format('YYYY-MM-DD');
                        if (newStartDate == previousAttendanceData.date) {
                            newStartDate = startDate.clone().tz(userData.timezone).add(1, 'day').format('YYYY-MM-DD');
                        }
                        await this.empAttendanceModel.insertAttendance(item.userId, item.adminId, newStartDate, startTime.format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss'));
                        iterator();
                    }
                    else {
                        if (maxLogoutTime.diff(endDate) > 0) {
                            await this.updateAttendance(previousAttendanceRawData, endDate);
                            iterator();
                        }
                        else {
                            await this.updateAttendance(previousAttendanceRawData, maxLogoutTime.tz('Africa/Abidjan'));
                            await this.empAttendanceModel.insertAttendance(item.userId, item.adminId, maxLogoutTime.add(1, 'seconds').format('YYYY-MM-DD'), maxLogoutTime.tz('Africa/Abidjan').add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss'));
                            iterator();
                        }
                    }
                }
                else {
                    await this.empAttendanceModel.insertAttendance(item.userId, item.adminId, startDate.format('YYYY-MM-DD'), startTime.format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss'));
                    iterator();
                }
            })();
        }, err => {
            if (err)
                return console.log('--err--', err.message);
            this.updateActivityAndUsage(data, userData.timezone);
        });
    }
};
__decorate([
    nest_event_1.On('data-receieved-for-logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, typeof (_a = typeof decoded_token_interface_1.IDecodedToken !== "undefined" && decoded_token_interface_1.IDecodedToken) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DataLogEventHandler.prototype, "updateToken", null);
DataLogEventHandler = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService, typeof (_b = typeof employee_attendance_model_1.EmployeeAttendanceModel !== "undefined" && employee_attendance_model_1.EmployeeAttendanceModel) === "function" ? _b : Object])
], DataLogEventHandler);
exports.DataLogEventHandler = DataLogEventHandler;
//# sourceMappingURL=logs-recorded.event.js.map