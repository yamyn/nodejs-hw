import { StorageUtilInterface } from '../interfaces/storage-util.interface';
import { UploadDto } from '../dto/upload.dto';
export declare class FtpUtils implements StorageUtilInterface {
    private client;
    private email;
    initConnection(storage: any): Promise<void>;
    prepareFolderPath(email: string): Promise<void>;
    uploadFile(file: UploadDto): Promise<void>;
}
