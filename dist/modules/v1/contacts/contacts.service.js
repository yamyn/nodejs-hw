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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("../../../common/helper/response.helper.service");
const contacts_model_1 = require("../../../database/mongoose-db/models/contacts.model");
let ContactsService = class ContactsService {
    constructor(contactsModel, respService) {
        this.contactsModel = contactsModel;
        this.respService = respService;
    }
    async getAllContacts() {
        try {
            const contacts = await this.contactsModel.getAll();
            return this.respService.sendResponse(200, 'Succes find all contacts', null, {
                data: contacts,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async findContactById(id) {
        try {
            const contact = await this.contactsModel.getById(id);
            if (!contact) {
                return this.respService.sendResponse(404, 'Error', `Not found document with id - ${id}`, null);
            }
            return this.respService.sendResponse(200, `Succes find contact by id - ${id}`, null, {
                data: contact,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async insertContact(dataDto) {
        try {
            const contact = await this.contactsModel.insert(dataDto);
            return this.respService.sendResponse(200, 'Succes create new contact', null, { data: contact });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async updateContactById(dataDto) {
        try {
            await this.contactsModel.update(dataDto);
            const { id } = dataDto, data = __rest(dataDto, ["id"]);
            return this.respService.sendResponse(200, `Succes update contact with id - ${id}`, null, {
                data: { id, updatedFields: data },
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async deleteContactById(id) {
        try {
            await this.contactsModel.delete(id);
            return this.respService.sendResponse(200, `Succes delete contact by id - ${id}`, null, {
                data: id,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
};
ContactsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [contacts_model_1.ContactsMongoModel,
        response_helper_service_1.ResponseHelperService])
], ContactsService);
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map