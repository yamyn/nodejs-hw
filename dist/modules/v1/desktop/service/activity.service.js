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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const activity_data_enum_1 = require("../../../../common/enums/activity-data.enum");
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const user_activity_data_model_1 = require("src/database/mongoose-db/models/user-activity-data.model");
const response_helper_service_1 = require("../../../../common/helper/response.helper.service");
const user_activity_validation_1 = require("../validation/user-activity.validation");
const nest_event_1 = require("nest-event");
let ActivityService = class ActivityService {
    constructor(userActivityDataMongoModel, responseHelperService, emitter) {
        this.userActivityDataMongoModel = userActivityDataMongoModel;
        this.responseHelperService = responseHelperService;
        this.emitter = emitter;
    }
    async insertUsageDataHandler(userData, activityData, userAgent) {
        console.log('-e-', userData.employee_id, '-d-', new Date(), ' === Activity received === ', '-em-', userData.email, '-f-', activityData.data.length);
        if (process.env.ENABLE_VALIDATION === 'true') {
            try {
                activityData = await user_activity_validation_1.validateActivityDataSchema.validateAsync(activityData);
            }
            catch (error) {
                throw new common_1.NotAcceptableException(error.details[0].message);
            }
        }
        const arrayData = activityData.data;
        if (arrayData.constructor !== Array || arrayData.length === 0) {
            throw new common_1.NotAcceptableException('Data should be passed in array');
        }
        try {
            let finalData = null;
            const alreadyData = await this.userActivityDataMongoModel.getOnlyIdBasedOnDataIdAndUserIdAndAdminId(userData.employee_id, userData.organization_id, arrayData[0].dataId);
            if (alreadyData) {
                const lastInsertedTimeWithModeEndSeconds = moment(alreadyData.dataId).add(alreadyData.mode.end, 'seconds');
                finalData = arrayData.filter((item) => {
                    console.log('----------curr=--------------', moment(item.dataId).format('YYYY-MM-DD HH:mm:ss Z'));
                    console.log('----------last=--------------', lastInsertedTimeWithModeEndSeconds.format('YYYY-MM-DD HH:mm:ss Z'));
                    console.log('----------Diff=--------------', moment(item.dataId).diff(lastInsertedTimeWithModeEndSeconds));
                    if (moment(item.dataId).diff(lastInsertedTimeWithModeEndSeconds) >= 0)
                        return {
                            adminId: userData.organization_id,
                            userEmail: userData.email,
                            userId: userData.employee_id,
                            systemTimeUtc: item.systemTimeUtc,
                            dataId: item.dataId,
                            date: moment(item.dataId).format('DD-MM-YYYY'),
                            time: moment(item.dataId).format('HH:mm:ss'),
                            taskNote: item.taskNote || '',
                            appVersion: userAgent,
                            timestampActual: Number(moment(item.systemTimeUtc).format('X')),
                            timestampServer: Number(moment().format('X')),
                            timestampInUtc: Number(moment().utc().format('X')),
                            projectId: item.projectId || 0,
                            taskId: item.taskId || 0,
                            breakInSeconds: 0,
                            clicksCount: item.clicksCount,
                            fakeActivitiesCount: item.fakeActivitiesCount,
                            keysCount: item.keysCount,
                            movementsCount: item.movementsCount,
                            activityPerSecond: {
                                buttonClicks: item.activityPerSecond.buttonClicks,
                                fakeActivities: item.activityPerSecond.fakeActivities,
                                keystrokes: item.activityPerSecond.keystrokes,
                                mouseMovements: item.activityPerSecond.mouseMovements,
                            },
                            mode: {
                                name: item.mode.name,
                                start: item.mode.start,
                                end: item.mode.end
                            },
                            appUsage: item.appUsage,
                            status: activity_data_enum_1.EActivityDataStatus.active
                        };
                });
            }
            else {
                finalData = arrayData.map((item) => {
                    return {
                        adminId: userData.organization_id,
                        userEmail: userData.email,
                        userId: userData.employee_id,
                        systemTimeUtc: item.systemTimeUtc,
                        dataId: item.dataId,
                        date: moment(item.dataId).format('DD-MM-YYYY'),
                        time: moment(item.dataId).format('HH:mm:ss'),
                        taskNote: item.taskNote || '',
                        appVersion: userAgent,
                        timestampActual: Number(moment(item.systemTimeUtc).format('X')),
                        timestampServer: Number(moment().format('X')),
                        timestampInUtc: Number(moment().utc().format('X')),
                        projectId: item.projectId || 0,
                        taskId: item.taskId || 0,
                        breakInSeconds: 0,
                        clicksCount: item.clicksCount,
                        fakeActivitiesCount: item.fakeActivitiesCount,
                        keysCount: item.keysCount,
                        movementsCount: item.movementsCount,
                        activityPerSecond: {
                            buttonClicks: item.activityPerSecond.buttonClicks,
                            fakeActivities: item.activityPerSecond.fakeActivities,
                            keystrokes: item.activityPerSecond.keystrokes,
                            mouseMovements: item.activityPerSecond.mouseMovements,
                        },
                        mode: {
                            name: item.mode.name,
                            start: item.mode.start,
                            end: item.mode.end
                        },
                        appUsage: item.appUsage,
                        status: activity_data_enum_1.EActivityDataStatus.active
                    };
                });
            }
            try {
                const result = await this.userActivityDataMongoModel.insert(finalData);
                this.emitter.emit('data-receieved-for-logs', result, userData);
                return this.responseHelperService.sendResponse(200, 'Data saved', null, { inserted: result.length });
            }
            catch (error) {
                return this.responseHelperService.sendResponse(400, 'Error in inserting data', error.message, null);
            }
        }
        catch (error) {
            return this.responseHelperService.sendResponse(400, 'Error in checking old data', error, null);
        }
    }
};
ActivityService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_activity_data_model_1.UserActivityDataMongoModel !== "undefined" && user_activity_data_model_1.UserActivityDataMongoModel) === "function" ? _a : Object, response_helper_service_1.ResponseHelperService,
        nest_event_1.NestEventEmitter])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map