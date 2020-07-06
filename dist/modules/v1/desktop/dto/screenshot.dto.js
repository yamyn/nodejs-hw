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
exports.ScreenshotDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ScreenshotDTO {
    constructor() {
        this.projectId = 0;
        this.taskId = 0;
    }
}
__decorate([
    swagger_1.ApiProperty({
        type: 'string', format: 'binary', required: true,
        description: 'Please make every screenshot name as the DateObject when it was taken. (format:`HH-YYYY-MM-DD HH-mm-ss-sc0.ext`, example:`13-2020-04-23 13-55-07-sc0.jpg`)'
    }),
    __metadata("design:type", Array)
], ScreenshotDTO.prototype, "screenshots", void 0);
__decorate([
    swagger_1.ApiProperty({ type: 'number', default: 0, example: 21, description: 'Project Id related to screenshot' }),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsInt(),
    class_validator_1.Min(-1),
    __metadata("design:type", Number)
], ScreenshotDTO.prototype, "projectId", void 0);
__decorate([
    swagger_1.ApiProperty({ type: 'number', default: 0, example: 10, description: 'Task Id related to screenshot' }),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsInt(),
    class_validator_1.Min(-1),
    __metadata("design:type", Number)
], ScreenshotDTO.prototype, "taskId", void 0);
exports.ScreenshotDTO = ScreenshotDTO;
//# sourceMappingURL=screenshot.dto.js.map