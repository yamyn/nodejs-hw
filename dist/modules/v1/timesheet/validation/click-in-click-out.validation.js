"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTimesheetSchema = exports.validateClickInClickOutSchema = void 0;
const joi = __importStar(require("@hapi/joi"));
exports.validateClickInClickOutSchema = joi.object({
    startDate: joi.string().trim().required().isoDate(),
    endDate: joi.string().trim().required().isoDate(),
}).required();
const sessionEachObjectSchema = joi.object({
    type: joi.number().positive().valid(1, 2).required(),
    mode: joi.number().positive().valid(1, 2).required(),
    startDate: joi.string().trim().required().isoDate(),
    endDate: joi.string().trim().required().isoDate()
});
const sessionArraySchema = joi.array().items(sessionEachObjectSchema).min(1).unique().required();
exports.validateTimesheetSchema = joi.object({
    data: joi.alternatives().try(sessionEachObjectSchema, sessionArraySchema).required()
});
//# sourceMappingURL=click-in-click-out.validation.js.map