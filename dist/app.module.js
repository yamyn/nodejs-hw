"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const nest_router_1 = require("nest-router");
const helper_module_1 = require("./common/helper/helper.module");
const mongoose_db_module_1 = require("./database/mongoose-db/mongoose-db.module");
const contacts_module_1 = require("./modules/v1/contacts/contacts.module");
const routes = [{ path: 'v1', children: [contacts_module_1.ContactsModule] }];
let AppModule = class AppModule {
    configure() { }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_db_module_1.MongooseDBModule,
            helper_module_1.HelperModule,
            contacts_module_1.ContactsModule,
            nest_router_1.RouterModule.forRoutes(routes),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map