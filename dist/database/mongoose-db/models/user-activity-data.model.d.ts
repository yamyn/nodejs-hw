import { IActivityUsageData } from './../../../modules/v1/desktop/interfaces/activity-usage-data.interface';
import { Model } from 'mongoose';
export declare class UserActivityDataMongoModel {
    private readonly collection;
    constructor(collection: Model<any>);
    getAll(): Promise<any[]>;
    getOnlyIdBasedOnDataIdAndUserIdAndAdminId(userId: number, adminId: number, dataId: string): Promise<Pick<any, string | number | symbol> | Pick<any, string | number | symbol>[]>;
    insert(activityData: IActivityUsageData[]): Promise<any>;
}
