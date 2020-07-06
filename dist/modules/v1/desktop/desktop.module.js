"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopModule = void 0;
const mongoose_db_module_1 = require("../../../database/mongoose-db/mongoose-db.module");
const common_1 = require("@nestjs/common");
const desktop_controller_1 = require("./desktop.controller");
const activity_service_1 = require("./service/activity.service");
const helper_module_1 = require("../../../common/helper/helper.module");
const screenshot_service_1 = require("./service/screenshot.service");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const user_feature_service_1 = require("./service/user-feature.service");
const sequelize_db_module_1 = require("src/database/sequelize-db/sequelize-db.module");
const nest_event_1 = require("nest-event");
const production_stat_service_1 = require("./service/production-stat.service");
const logs_recorded_event_1 = require("./events/logs-recorded.event");
let DesktopModule = class DesktopModule {
};
DesktopModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            nest_event_1.NestEventModule,
            mongoose_db_module_1.MongooseDBModule,
            helper_module_1.HelperModule,
            sequelize_db_module_1.SequelizeDbModule,
            platform_express_1.MulterModule.register({ dest: process.env.SS_UPLOAD_PATH }),
            common_1.HttpModule
        ],
        controllers: [desktop_controller_1.DesktopController],
        providers: [activity_service_1.ActivityService, screenshot_service_1.ScreenshotService, user_feature_service_1.UserFeatureService, production_stat_service_1.ProductionStatsService, logs_recorded_event_1.DataLogEventHandler]
    })
], DesktopModule);
exports.DesktopModule = DesktopModule;
//# sourceMappingURL=desktop.module.js.map