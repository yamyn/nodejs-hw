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
exports.TimesheetService = void 0;
const common_1 = require("@nestjs/common");
const employee_attendance_model_1 = require("src/database/sequelize-db/models/employee-attendance.model");
const employee_timesheet_model_1 = require("src/database/sequelize-db/models/employee-timesheet.model");
const response_helper_service_1 = require("../../../common/helper/response.helper.service");
const click_in_click_out_validation_1 = require("./validation/click-in-click-out.validation");
const moment = require("moment-timezone");
let TimesheetService = class TimesheetService {
    constructor(empAttendanceModel, empTimesheetModel, respService) {
        this.empAttendanceModel = empAttendanceModel;
        this.empTimesheetModel = empTimesheetModel;
        this.respService = respService;
    }
    async updateTimeSheet(user, dataDto) {
        try {
            if (process.env.ENABLE_VALIDATION === 'true') {
                try {
                    dataDto = await click_in_click_out_validation_1.validateTimesheetSchema.validateAsync(dataDto);
                }
                catch (error) {
                    throw new common_1.NotAcceptableException(error.details[0].message);
                }
            }
            const employeeId = user.employee_id || user.id;
            const organizationId = user.organization_id || user.admin_id;
            if (employeeId) {
                if (dataDto.data.constructor === Array && dataDto.data.length > 0) {
                    let success = true;
                    for (let i = 0; i < dataDto.data.length; i++) {
                        let { startDate, endDate } = dataDto.data[i];
                        const { type, mode } = dataDto.data[i];
                        startDate = moment(startDate);
                        endDate = moment(endDate);
                        const duration = moment.duration(endDate.diff(startDate)).asSeconds();
                        let [attendanceData] = await this.empAttendanceModel.getUserAttendanceIdOnSingleDayElseCreate(startDate.format('YYYY-MM-DD'), employeeId, organizationId, startDate.format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss'));
                        attendanceData = attendanceData.get({ plain: true });
                        if (attendanceData) {
                            const curAttendanceId = attendanceData.id;
                            const curStartDate = startDate.format('YYYY-MM-DD HH:mm:ss');
                            const dbTimeSheetData = await this.empTimesheetModel.findOne(curAttendanceId, curStartDate, type, mode);
                            if (dbTimeSheetData) {
                                await dbTimeSheetData.update({ end_time: endDate.format('YYYY-MM-DD HH:mm:ss'), duration: duration });
                            }
                            else {
                                let timesheetEntryData = await this.empTimesheetModel.create(attendanceData.id, startDate.format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss'), type, mode, duration);
                                timesheetEntryData = timesheetEntryData.toJSON();
                            }
                        }
                        else {
                            success = false;
                            break;
                        }
                    }
                    if (success === true)
                        return this.respService.sendResponse(200, 'ClockIn/ClockOut data recorded', null, { status: 'updated' });
                    else
                        return this.respService.sendResponse(400, 'Error in Attendance', 'Some error occured while upserting attendance id', null);
                }
                else {
                    throw new common_1.NotAcceptableException('Data should be passed in array');
                }
            }
            else {
                return this.respService.sendResponse(400, 'EmployeeId is missing', 'Token does not contain employee id', null);
            }
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async getTimeSheet(user, dataDto) {
        try {
            if (process.env.ENABLE_VALIDATION === 'true') {
                try {
                    dataDto = await click_in_click_out_validation_1.validateClickInClickOutSchema.validateAsync(dataDto);
                }
                catch (error) {
                    throw new common_1.NotAcceptableException(error.details[0].message);
                }
            }
            const startDate = moment(dataDto.startDate).format('YYYY-MM-DD');
            const endDate = moment(dataDto.endDate).format('YYYY-MM-DD');
            const employeeId = user.employee_id || user.id;
            if (employeeId) {
                let fetchedList = await this.empAttendanceModel.getUserAttendanceDayWiseWithTimesheetData(startDate, endDate, employeeId);
                fetchedList = fetchedList.filter((item) => item.empTimesheets.id !== null);
                if (fetchedList.length === 0)
                    return this.respService.sendResponse(404, 'No data found', { count: 0, clockInList: fetchedList }, null);
                else
                    return this.respService.sendResponse(200, 'ClockIn/ClockOut data found', null, { count: fetchedList.length, clockInList: fetchedList });
            }
            else {
                return this.respService.sendResponse(400, 'EmployeeId is missing', 'Token does not contain employee id', null);
            }
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
};
TimesheetService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_attendance_model_1.EmployeeAttendanceModel !== "undefined" && employee_attendance_model_1.EmployeeAttendanceModel) === "function" ? _a : Object, typeof (_b = typeof employee_timesheet_model_1.EmployeeTimesheetModel !== "undefined" && employee_timesheet_model_1.EmployeeTimesheetModel) === "function" ? _b : Object, response_helper_service_1.ResponseHelperService])
], TimesheetService);
exports.TimesheetService = TimesheetService;
//# sourceMappingURL=timesheet.service.js.map