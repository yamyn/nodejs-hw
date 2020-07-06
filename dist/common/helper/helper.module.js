"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("./response.helper.service");
const http_helper_service_1 = require("./http.helper.service");
const ProvidersAndExports = [response_helper_service_1.ResponseHelperService, http_helper_service_1.HttpHelperService];
let HelperModule = class HelperModule {
};
HelperModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        providers: ProvidersAndExports,
        exports: ProvidersAndExports,
    })
], HelperModule);
exports.HelperModule = HelperModule;
//# sourceMappingURL=helper.module.js.map