import { UpdateClockInClockOutDTO } from './dto/update-clock.dto';
import { TimesheetService } from './timesheet.service';
import { GetClockInClockOutDTO } from './dto/get-clock.dto';
export declare class TimesheetController {
    private readonly timeSheetService;
    constructor(timeSheetService: TimesheetService);
    updateClockInClockOutOrBreakTime(req: any, dataDto: UpdateClockInClockOutDTO): Promise<any>;
    getClockInClockOutOrBreakTime(req: any, dataDto: GetClockInClockOutDTO): Promise<any>;
}
