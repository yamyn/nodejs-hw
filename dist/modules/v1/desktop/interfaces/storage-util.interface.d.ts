import { UploadDto } from '../dto/upload.dto';
export declare class StorageUtilInterface {
    initConnection: (storage: any) => Promise<void>;
    prepareFolderPath: (email: string) => Promise<void>;
    uploadFile: (file: UploadDto) => Promise<void>;
}
