import { IResponse } from './common/interfaces/response.interface';
import { ResponseHelperService } from './common/helper/response.helper.service';
export declare class AppService {
    private readonly responseHelperService;
    constructor(responseHelperService: ResponseHelperService);
    getHello(): IResponse;
}
