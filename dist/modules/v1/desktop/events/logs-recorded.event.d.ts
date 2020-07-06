/// <reference types="node" />
import { HttpService } from '@nestjs/common';
import { EventEmitter } from 'events';
import { IActivityUsageData } from '../interfaces/activity-usage-data.interface';
import { EmployeeAttendanceModel } from 'src/database/sequelize-db/models/employee-attendance.model';
import { IDecodedToken } from 'src/common/interfaces/decoded-token.interface';
export declare class DataLogEventHandler extends EventEmitter {
    private readonly httpService;
    private readonly empAttendanceModel;
    constructor(httpService: HttpService, empAttendanceModel: EmployeeAttendanceModel);
    updateActivityAndUsage(data: IActivityUsageData[], timezone: string): void;
    updateAttendance(dataObjectToUpdate: any, endDate: any): Promise<void>;
    getMaxLogoutTime(sysTimeUtc: any, userData: IDecodedToken, previousLoginTime: any, previousLogoutTime: any, startDate: any): Promise<any>;
    updateToken(data: IActivityUsageData[], userData: IDecodedToken): Promise<any>;
}
