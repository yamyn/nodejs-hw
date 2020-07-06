import { IResponse } from '../../../../common/interfaces/response.interface';
import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { IDecodedToken } from '../../../../common/interfaces/decoded-token.interface';
import { ScreenshotDTO } from '../dto/screenshot.dto';
import { IntegrationModel } from 'src/database/sequelize-db/models/integraion.model';
import { UploadDto } from '../dto/upload.dto';
import { StorageUtilInterface } from '../interfaces/storage-util.interface';
export declare class ScreenshotService {
    private readonly responseHelperService;
    private readonly integrationModel;
    private providers;
    constructor(responseHelperService: ResponseHelperService, integrationModel: IntegrationModel);
    uploadToCloud(Provider: typeof StorageUtilInterface, storage: any, files: UploadDto[], email: string): Promise<UploadDto[]>;
    endRequest(statusCode: number, message: string, files: UploadDto[]): Promise<IResponse>;
    hasNonUploadedFiles(files: any): boolean;
    upload(files: UploadDto[], userData: IDecodedToken, data: ScreenshotDTO): Promise<IResponse>;
}
