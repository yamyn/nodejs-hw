"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ContactsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
}, { timestamps: true, autoIndex: true });
//# sourceMappingURL=contacts.schema.js.map