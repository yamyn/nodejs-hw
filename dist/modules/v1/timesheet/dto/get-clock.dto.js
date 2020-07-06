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
exports.GetClockInClockOutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetClockInClockOutDTO {
}
__decorate([
    swagger_1.ApiProperty({ type: 'string', default: null, example: new Date().toISOString(), description: 'When the clock starts / break starts' }),
    __metadata("design:type", Date)
], GetClockInClockOutDTO.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiProperty({ type: 'string', default: null, example: new Date().toISOString(), description: 'When the clock ends / break ends' }),
    __metadata("design:type", Date)
], GetClockInClockOutDTO.prototype, "endDate", void 0);
exports.GetClockInClockOutDTO = GetClockInClockOutDTO;
//# sourceMappingURL=get-clock.dto.js.map