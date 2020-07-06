import { StorageUtilInterface } from '../interfaces/storage-util.interface';
import { UploadDto } from '../dto/upload.dto';
export declare class OnedriveUtils implements StorageUtilInterface {
    private clientId;
    private clientSecret;
    private teamFolder;
    private redirectUrl;
    private accessToken;
    private email;
    initConnection(storage: any): Promise<void>;
    prepareFolderPath(email: string): Promise<void>;
    uploadFile(file: UploadDto): Promise<void>;
    getAccessToken(refreshToken: string): Promise<void>;
    getFolder(folderName: string, parentId: string): Promise<string>;
    createFolder(folderName: string, parentId: string): Promise<any>;
    uploadScreenshotToDrive(file: UploadDto, parentId: string): Promise<void>;
}
