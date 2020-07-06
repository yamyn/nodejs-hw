import { StorageUtilInterface } from '../interfaces/storage-util.interface';
export declare class GoogleDriveUtils implements StorageUtilInterface {
    private mailFolderId;
    private drive;
    initConnection(storage: any): Promise<void>;
    prepareFolderPath(email: any): Promise<void>;
    uploadFile(file: any): Promise<void>;
    getFolderByName(name: any): Promise<any>;
    createNewFolder(name: any): Promise<any>;
    getFolderByParentId(parentId: any, name: any): Promise<any>;
    createNewFolderWithParent(name: any, parentId: any): Promise<any>;
    addSharePermissionToFolder(folderId: any): Promise<any>;
    uploadScreenshotToDrive(folderId: any, path: any, filename: any): Promise<any>;
}
