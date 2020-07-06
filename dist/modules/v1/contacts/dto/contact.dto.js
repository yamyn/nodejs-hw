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
exports.DeleteContactDTO = exports.UpdateContactDTO = exports.ContactDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ContactDTO {
}
__decorate([
    swagger_1.ApiProperty({
        description: `A descriptive name for contact`,
        required: true,
        type: 'string',
        default: null,
        example: `Mango`,
    }),
    __metadata("design:type", String)
], ContactDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Unique email for contact`,
        required: true,
        uniqueItems: true,
        type: 'string',
        default: null,
        example: `mango@gmail.com`,
    }),
    __metadata("design:type", String)
], ContactDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Telephone number for contact`,
        required: true,
        type: 'string',
        default: null,
        example: `0660847583`,
    }),
    __metadata("design:type", String)
], ContactDTO.prototype, "phone", void 0);
exports.ContactDTO = ContactDTO;
class UpdateContactDTO extends swagger_1.PartialType(ContactDTO) {
}
__decorate([
    swagger_1.ApiProperty({
        description: `Database document's id`,
        required: true,
        type: 'string',
        default: null,
        example: `5f0309aef37826faf7367ef0`,
    }),
    __metadata("design:type", String)
], UpdateContactDTO.prototype, "id", void 0);
exports.UpdateContactDTO = UpdateContactDTO;
class DeleteContactDTO {
}
__decorate([
    swagger_1.ApiProperty({
        description: `Database document's id`,
        required: true,
        type: 'string',
        default: null,
        example: `5f0309aef37826faf7367ef0`,
    }),
    __metadata("design:type", String)
], DeleteContactDTO.prototype, "id", void 0);
exports.DeleteContactDTO = DeleteContactDTO;
//# sourceMappingURL=contact.dto.js.map