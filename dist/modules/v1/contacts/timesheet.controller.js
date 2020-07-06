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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const update_clock_dto_1 = require("./dto/update-clock.dto");
const timesheet_service_1 = require("./timesheet.service");
const get_clock_dto_1 = require("./dto/get-clock.dto");
let TimesheetController = class TimesheetController {
    constructor(timeSheetService) {
        this.timeSheetService = timeSheetService;
    }
    async updateClockInClockOutOrBreakTime(req, dataDto) {
        return await this.timeSheetService.updateTimeSheet(req.user, dataDto);
    }
    async getClockInClockOutOrBreakTime(req, dataDto) {
        return await this.timeSheetService.getTimeSheet(req.user, dataDto);
    }
};
__decorate([
    common_1.Post('record-clock-in'),
    swagger_1.ApiOperation({ description: 'Insert User\'s clock-in/clock-out time OR break-time', summary: 'Done' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_clock_dto_1.UpdateClockInClockOutDTO]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "updateClockInClockOutOrBreakTime", null);
__decorate([
    common_1.Post('clock-in'),
    swagger_1.ApiOperation({ description: 'Insert User\'s clock-in/clock-out time OR break-time', summary: 'Done' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_clock_dto_1.GetClockInClockOutDTO]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "getClockInClockOutOrBreakTime", null);
TimesheetController = __decorate([
    swagger_1.ApiTags('Timesheet'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('timesheet'),
    __metadata("design:paramtypes", [typeof (_a = typeof timesheet_service_1.TimesheetService !== "undefined" && timesheet_service_1.TimesheetService) === "function" ? _a : Object])
], TimesheetController);
exports.TimesheetController = TimesheetController;
//# sourceMappingURL=timesheet.controller.js.map