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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contacts_service_1 = require("./contacts.service");
const contact_dto_1 = require("./dto/contact.dto");
let ContactsController = class ContactsController {
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    async getAllContacts() {
        return await this.contactsService.getAllContacts();
    }
    async getContactById(id) {
        return await this.contactsService.findContactById(id);
    }
    async insertContact(dataDto) {
        return await this.contactsService.insertContact(dataDto);
    }
    async updateContact(dataDto) {
        return await this.contactsService.updateContactById(dataDto);
    }
    async deleteContact(id) {
        return await this.contactsService.deleteContactById(id);
    }
};
__decorate([
    common_1.Get(''),
    swagger_1.ApiOperation({
        description: 'Get all contacts',
        summary: 'Done',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getAllContacts", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({
        description: 'Get one contact by database id',
        summary: 'Done',
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getContactById", null);
__decorate([
    common_1.Post(''),
    swagger_1.ApiOperation({
        description: 'Insert new contact',
        summary: 'Done',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDTO]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "insertContact", null);
__decorate([
    common_1.Put(''),
    swagger_1.ApiOperation({
        description: 'Update contact by database document`s id',
        summary: 'Done',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.UpdateContactDTO]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "updateContact", null);
__decorate([
    common_1.Delete(''),
    swagger_1.ApiOperation({
        description: 'Delete Contact by database document`s id',
        summary: 'Done',
    }),
    swagger_1.ApiBody({ type: contact_dto_1.DeleteContactDTO }),
    __param(0, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "deleteContact", null);
ContactsController = __decorate([
    swagger_1.ApiTags('Contacts'),
    common_1.Controller('contacts'),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsController);
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map