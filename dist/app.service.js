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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("./common/helper/response.helper.service");
let AppService = class AppService {
    constructor(responseHelperService) {
        this.responseHelperService = responseHelperService;
    }
    getHello() {
        return this.responseHelperService.sendResponse(200, 'Everything is perfect', null, null);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [response_helper_service_1.ResponseHelperService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map