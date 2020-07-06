import { IActivityUsageData } from "../interfaces/activity-usage-data.interface";
import { IActivityRequestData } from "../interfaces/activity-request.interface";
export declare class UsageActivityDataDTO implements IActivityRequestData {
    readonly sign: string;
    readonly data: IActivityUsageData[];
}
