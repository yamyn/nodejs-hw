import { IDecodedToken } from '../../../common/interfaces/decoded-token.interface';
import { UpdateClockInClockOutDTO } from './dto/update-clock.dto';
import { EmployeeAttendanceModel } from 'src/database/sequelize-db/models/employee-attendance.model';
import { EmployeeTimesheetModel } from 'src/database/sequelize-db/models/employee-timesheet.model';
import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { GetClockInClockOutDTO } from './dto/get-clock.dto';
export declare class TimesheetService {
    private readonly empAttendanceModel;
    private readonly empTimesheetModel;
    private readonly respService;
    constructor(empAttendanceModel: EmployeeAttendanceModel, empTimesheetModel: EmployeeTimesheetModel, respService: ResponseHelperService);
    updateTimeSheet(user: IDecodedToken, dataDto: UpdateClockInClockOutDTO): Promise<any>;
    getTimeSheet(user: IDecodedToken, dataDto: GetClockInClockOutDTO): Promise<any>;
}
