import { IResponse } from '../../../../common/interfaces/response.interface';
import { UsageActivityDataDTO } from '../dto/usage-activity-data.dto';
import { IDecodedToken } from '../../../../common/interfaces/decoded-token.interface';
import { UserActivityDataMongoModel } from 'src/database/mongoose-db/models/user-activity-data.model';
import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { NestEventEmitter } from 'nest-event';
export declare class ActivityService {
    private readonly userActivityDataMongoModel;
    private readonly responseHelperService;
    private readonly emitter;
    constructor(userActivityDataMongoModel: UserActivityDataMongoModel, responseHelperService: ResponseHelperService, emitter: NestEventEmitter);
    insertUsageDataHandler(userData: IDecodedToken, activityData: UsageActivityDataDTO, userAgent: string): Promise<IResponse>;
}
