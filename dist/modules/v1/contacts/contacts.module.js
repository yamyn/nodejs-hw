"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const contacts_controller_1 = require("./contacts.controller");
const contacts_service_1 = require("./contacts.service");
const config_1 = require("@nestjs/config");
const mongoose_db_module_1 = require("../../../database/mongoose-db/mongoose-db.module");
const helper_module_1 = require("../../../common/helper/helper.module");
let ContactsModule = class ContactsModule {
};
ContactsModule = __decorate([
    common_1.Module({
        imports: [config_1.ConfigModule.forRoot(), mongoose_db_module_1.MongooseDBModule, helper_module_1.HelperModule],
        controllers: [contacts_controller_1.ContactsController],
        providers: [contacts_service_1.ContactsService],
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map