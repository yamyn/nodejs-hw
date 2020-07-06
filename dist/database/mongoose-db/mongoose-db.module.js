"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseDBModule = void 0;
const contacts_model_1 = require("./models/contacts.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contacts_schema_1 = require("./schemas/contacts.schema");
const config_1 = require("@nestjs/config");
const ProvidersAndExports = [contacts_model_1.ContactsMongoModel];
const mongoOption = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
if (process.env.NODE_ENV === 'production') {
    mongoOption.auth = {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
    };
}
let MongooseDBModule = class MongooseDBModule {
};
MongooseDBModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI, mongoOption),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Contacts', schema: contacts_schema_1.ContactsSchema },
            ]),
        ],
        providers: ProvidersAndExports,
        exports: ProvidersAndExports,
    })
], MongooseDBModule);
exports.MongooseDBModule = MongooseDBModule;
//# sourceMappingURL=mongoose-db.module.js.map