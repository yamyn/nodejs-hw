import { HttpService } from '@nestjs/common';
export declare class HttpHelperService {
    private readonly httpService;
    constructor(httpService: HttpService);
    httpGet(url: string, headers: any): Promise<any>;
    httpPost(url: string, data: any): Promise<any>;
}
