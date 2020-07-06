import { IResponse } from '../../../../common/interfaces/response.interface';
import { ResponseHelperService } from 'src/common/helper/response.helper.service';
export declare class UserFeatureService {
    private readonly responseHelperService;
    constructor(responseHelperService: ResponseHelperService);
    fetchFeature(): Promise<IResponse>;
}
