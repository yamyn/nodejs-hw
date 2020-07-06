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
exports.HttpHelperService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let HttpHelperService = class HttpHelperService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async httpGet(url, headers) {
        let response = null;
        if (headers) {
            response = await this.httpService
                .get(url, { headers })
                .pipe(operators_1.map(res => res.data))
                .toPromise();
        }
        else {
            response = await this.httpService
                .get(url)
                .pipe(operators_1.map(res => res.data))
                .toPromise();
        }
        if (response.error) {
            throw new common_1.BadRequestException(response.error.message);
        }
        return response;
    }
    async httpPost(url, data) {
        const response = await this.httpService
            .post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .pipe(operators_1.map(res => res.data))
            .toPromise();
        if (response.error) {
            throw new common_1.BadRequestException(response.error_description || response.error.message);
        }
        return response;
    }
};
HttpHelperService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], HttpHelperService);
exports.HttpHelperService = HttpHelperService;
//# sourceMappingURL=http.helper.service.js.map