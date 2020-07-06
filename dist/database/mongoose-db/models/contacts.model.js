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
exports.ContactsMongoModel = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ContactsMongoModel = class ContactsMongoModel {
    constructor(collection) {
        this.collection = collection;
    }
    async getAll() {
        return await this.collection.find().exec();
    }
    async getById(id) {
        return await this.collection
            .findOne({ _id: id })
            .lean()
            .exec();
    }
    async insert(contactsData) {
        const contact = await this.collection.create(contactsData);
        return contact;
    }
    async update(_a) {
        var { id } = _a, data = __rest(_a, ["id"]);
        return await this.collection.update({ _id: id }, { $set: data });
    }
    async delete(id) {
        return await this.collection.deleteOne({ _id: id });
    }
};
ContactsMongoModel = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Contacts')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContactsMongoModel);
exports.ContactsMongoModel = ContactsMongoModel;
//# sourceMappingURL=contacts.model.js.map