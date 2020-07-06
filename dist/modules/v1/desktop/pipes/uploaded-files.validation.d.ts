import { PipeTransform } from '@nestjs/common';
import { ScreenshotDTO } from '../dto/screenshot.dto';
export declare class UploadedFilesValidation implements PipeTransform {
    transform(value: ScreenshotDTO): ScreenshotDTO;
}
