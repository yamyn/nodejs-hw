import { AppService } from './app.service';
import { IResponse } from './common/interfaces/response.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): IResponse;
}
