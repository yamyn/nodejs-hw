import { ActivityService } from './service/activity.service';
import { UsageActivityDataDTO } from './dto/usage-activity-data.dto';
import { ScreenshotService } from './service/screenshot.service';
import { ScreenshotDTO } from './dto/screenshot.dto';
import { UserFeatureService } from './service/user-feature.service';
import { UploadDto } from './dto/upload.dto';
export declare class DesktopController {
    private readonly activityService;
    private readonly ssService;
    private readonly featureService;
    constructor(activityService: ActivityService, ssService: ScreenshotService, featureService: UserFeatureService);
    insertUsageActivityData(req: any, usageActivityDto: UsageActivityDataDTO): Promise<any>;
    uploadScreenShots(files: UploadDto[], req: any, ssData: ScreenshotDTO): Promise<any>;
    fetchFeature(): Promise<any>;
}
