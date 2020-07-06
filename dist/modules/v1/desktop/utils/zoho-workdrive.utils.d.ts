import { AxiosResponse } from 'axios';
import { StorageUtilInterface } from '../interfaces/storage-util.interface';
import { IFETCHOPTIONS } from '../interfaces/zoho-wd.interface';
import { UploadDto } from '../dto/upload.dto';
export declare class ZohoWorkdriveUtils implements StorageUtilInterface {
    private teamFolder;
    private clientId;
    private clientSecret;
    private headers;
    private domain;
    private email;
    initConnection(storage: any): Promise<void>;
    prepareFolderPath(email: string): Promise<void>;
    uploadFile(file: UploadDto): Promise<void>;
    getAccessToken(refreshToken: string): Promise<void>;
    getZUserId(): Promise<string>;
    getWorkspacesOpt(zUserId: string): Promise<IFETCHOPTIONS>;
    getParentFoldersOpt({ id, url, }: IFETCHOPTIONS): Promise<IFETCHOPTIONS>;
    createTeamFolder(teamID: string): Promise<AxiosResponse>;
    getFoldersOpt({ id, url }: {
        id: any;
        url: any;
    }, folderName: string): Promise<any>;
    createFolder(parentFoldId: string, folderName: string): Promise<AxiosResponse>;
    uploadScreenshotToDrive(file: UploadDto, folderId: string): Promise<void>;
}
