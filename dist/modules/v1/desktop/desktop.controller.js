"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopController = void 0;
const activity_service_1 = require("./service/activity.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usage_activity_data_dto_1 = require("./dto/usage-activity-data.dto");
const screenshot_service_1 = require("./service/screenshot.service");
const platform_express_1 = require("@nestjs/platform-express");
const screenshot_dto_1 = require("./dto/screenshot.dto");
const user_feature_service_1 = require("./service/user-feature.service");
const uploaded_files_validation_1 = require("./pipes/uploaded-files.validation");
const file_utils_1 = require("./utils/file.utils");
let DesktopController = class DesktopController {
    constructor(activityService, ssService, featureService) {
        this.activityService = activityService;
        this.ssService = ssService;
        this.featureService = featureService;
    }
    async insertUsageActivityData(req, usageActivityDto) {
        return await this.activityService.insertUsageDataHandler(req.user, usageActivityDto, req.headers["user-agent"]);
    }
    async uploadScreenShots(files, req, ssData) {
        return await this.ssService.upload(files, req.user, ssData);
    }
    async fetchFeature() {
        return await this.featureService.fetchFeature();
    }
};
__decorate([
    common_1.Post('add-activity-log'),
    swagger_1.ApiOperation({ description: 'Insert app usage and user activity', summary: 'Done' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usage_activity_data_dto_1.UsageActivityDataDTO]),
    __metadata("design:returntype", Promise)
], DesktopController.prototype, "insertUsageActivityData", null);
__decorate([
    common_1.Post('upload-screenshots'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('screenshots', 50, {
        fileFilter: file_utils_1.imageFileFilter
    })),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiOperation({ description: 'It will upload screenshot to specific storage', summary: 'Initial' }),
    swagger_1.ApiBody({ description: 'Files to upload (Swagger only supports single file upload. But API is capable of handling several files in one req)', type: screenshot_dto_1.ScreenshotDTO, isArray: true }),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Req()),
    __param(2, common_1.Body(new common_1.ValidationPipe({ transform: true }), uploaded_files_validation_1.UploadedFilesValidation)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, screenshot_dto_1.ScreenshotDTO]),
    __metadata("design:returntype", Promise)
], DesktopController.prototype, "uploadScreenShots", null);
__decorate([
    common_1.Get('feature-status'),
    swagger_1.ApiOperation({ description: 'It is for feature status. Either on or off', summary: 'Initial' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DesktopController.prototype, "fetchFeature", null);
DesktopController = __decorate([
    swagger_1.ApiTags('Desktop'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('desktop'),
    __metadata("design:paramtypes", [activity_service_1.ActivityService,
        screenshot_service_1.ScreenshotService,
        user_feature_service_1.UserFeatureService])
], DesktopController);
exports.DesktopController = DesktopController;
//# sourceMappingURL=desktop.controller.js.map