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
exports.validateFindOneDeletePlanSchema = exports.validateUpdatePlanSchema = exports.validateCreatePlanSchema = void 0;
const joi = __importStar(require("@hapi/joi"));
const plans_data_enum_1 = require("../../../../common/enums/plans-data.enum");
exports.validateCreatePlanSchema = joi
    .object({
    name: joi
        .string()
        .trim()
        .required()
        .min(3),
    planId: joi
        .string()
        .trim()
        .required()
        .min(3),
    invoiceName: joi
        .string()
        .trim()
        .min(3),
    description: joi
        .string()
        .trim()
        .min(3),
    showDescInvoices: joi.boolean(),
    showDescQuotes: joi.boolean(),
    billEveryCount: joi
        .number()
        .positive()
        .required(),
    billEveryType: joi
        .string()
        .trim()
        .required()
        .valid(...Object.values(plans_data_enum_1.EBillEvery)),
    pricingModel: joi
        .string()
        .trim()
        .required()
        .valid(...Object.values(plans_data_enum_1.EPricingModel)),
    pricingCharacteristic: joi.any().required(),
    freeTrialCount: joi
        .number()
        .positive()
        .required(),
    freeTrialType: joi
        .string()
        .trim()
        .required()
        .valid(...Object.values(plans_data_enum_1.EFreeTrial)),
    displayInCustomerPortal: joi.boolean(),
    checkoutUsDropinScript: joi.boolean(),
})
    .required();
exports.validateUpdatePlanSchema = joi
    .object({
    id: joi
        .number()
        .positive()
        .required(),
    name: joi
        .string()
        .trim()
        .min(3),
    planId: joi
        .string()
        .trim()
        .min(3),
    invoiceName: joi
        .string()
        .trim()
        .min(3),
    description: joi
        .string()
        .trim()
        .min(3),
    showDescInvoices: joi.boolean(),
    showDescQuotes: joi.boolean(),
    billEveryCount: joi.number().positive(),
    billEveryType: joi
        .string()
        .trim()
        .valid(...Object.values(plans_data_enum_1.EBillEvery)),
    pricingModel: joi
        .string()
        .trim()
        .valid(...Object.values(plans_data_enum_1.EPricingModel)),
    pricingCharacteristic: joi.any(),
    freeTrialCount: joi.number().positive(),
    freeTrialType: joi
        .string()
        .trim()
        .valid(...Object.values(plans_data_enum_1.EFreeTrial)),
    displayInCustomerPortal: joi.boolean(),
    checkoutUsDropinScript: joi.boolean(),
})
    .required();
exports.validateFindOneDeletePlanSchema = joi.object({
    id: joi
        .number()
        .positive()
        .required(),
});
//# sourceMappingURL=plan.validation.js.map