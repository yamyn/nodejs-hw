import { IResponse } from '../interfaces/response.interface';
export declare class ResponseHelperService {
    sendResponse(statusCode: number, message: string, error: any, data: any): IResponse;
}
