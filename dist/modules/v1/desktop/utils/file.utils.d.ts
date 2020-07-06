import { UploadDto } from '../dto/upload.dto';
import { ScreenshotDTO } from '../dto/screenshot.dto';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const saveFiles: (files: UploadDto[], email: string, data: ScreenshotDTO) => Promise<void>;
export declare const deleteFilesFromLocal: (files: UploadDto[]) => Promise<void>;
export declare const deleteFileFromLocal: (file: UploadDto) => Promise<void>;
