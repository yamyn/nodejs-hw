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
exports.DeletePlanDTO = exports.UpdatePlanDTO = exports.PlanDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const plans_data_enum_1 = require("../../../../common/enums/plans-data.enum");
class PlanDTO {
}
__decorate([
    swagger_1.ApiProperty({
        description: `A descriptive name for plan. <br />
    In case, 'invoiceName' field is not provided, name wil be displayed to customers`,
        required: true,
        type: 'string',
        default: null,
        example: `Scale`,
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `This will be reference used by https://apidocs.chargebee.com/docs/api/ to identity this Plan`,
        required: true,
        type: 'string',
        default: null,
        example: `cbdemo_scale`,
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "planId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Name displayed to customers on the hosted pages, customers portal and invoices`,
        required: false,
        type: 'string',
        default: null,
        example: `Scale`,
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "invoiceName", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Description about the plan to show in the hosted pages & customer portal`,
        type: 'string',
        required: false,
        default: null,
        example: `very well plan`,
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Show plan description in Invoices`,
        type: 'boolean',
        default: false,
        example: `false`,
    }),
    __metadata("design:type", Boolean)
], PlanDTO.prototype, "showDescInvoices", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Show plan description in Quotes`,
        type: 'boolean',
        default: false,
        example: `false`,
    }),
    __metadata("design:type", Boolean)
], PlanDTO.prototype, "showDescQuotes", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `How many credits need pay per one period(it's - 'billEveryType')`,
        type: 'number',
        required: false,
        default: 1,
        example: `5`,
    }),
    __metadata("design:type", Number)
], PlanDTO.prototype, "billEveryCount", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `The period during which the payment(it's - 'billEveryCount') is made`,
        type: 'string',
        required: false,
        default: plans_data_enum_1.EBillEvery.month,
        example: plans_data_enum_1.EBillEvery.year,
        enum: Object.values(plans_data_enum_1.EBillEvery),
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "billEveryType", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `The pricing model determines how payment will be made according to plan`,
        type: 'string',
        default: plans_data_enum_1.EPricingModel.flatFee,
        example: plans_data_enum_1.EPricingModel.perUnit,
        enum: Object.values(plans_data_enum_1.EPricingModel),
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "pricingModel", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Pricing options that are typical of select models(it's - 'pricingModel') only`,
        type: 'object',
        default: null,
        example: `5`,
    }),
    __metadata("design:type", Object)
], PlanDTO.prototype, "pricingCharacteristic", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `How many units(it's - 'freeTrialType') will the specify trial period last`,
        type: 'number',
        required: false,
        default: 0,
        example: `3`,
    }),
    __metadata("design:type", Number)
], PlanDTO.prototype, "freeTrialCount", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `The period that determines the type of units(it's - 'freeTrialCount')`,
        type: 'string',
        default: plans_data_enum_1.EFreeTrial.month,
        required: false,
        example: plans_data_enum_1.EFreeTrial.day,
        enum: Object.values(plans_data_enum_1.EFreeTrial),
    }),
    __metadata("design:type", String)
], PlanDTO.prototype, "freeTrialType", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Display in customer portal`,
        type: 'boolean',
        default: true,
        example: `true`,
    }),
    __metadata("design:type", Boolean)
], PlanDTO.prototype, "displayInCustomerPortal", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: `Checkout using drop-in script`,
        type: 'boolean',
        default: true,
        example: `true`,
    }),
    __metadata("design:type", Boolean)
], PlanDTO.prototype, "checkoutUsDropinScript", void 0);
exports.PlanDTO = PlanDTO;
class UpdatePlanDTO extends swagger_1.PartialType(PlanDTO) {
}
__decorate([
    swagger_1.ApiProperty({
        description: `Database row's id`,
        required: true,
        type: 'number',
        default: null,
        example: `1`,
    }),
    __metadata("design:type", Number)
], UpdatePlanDTO.prototype, "id", void 0);
exports.UpdatePlanDTO = UpdatePlanDTO;
class DeletePlanDTO {
}
__decorate([
    swagger_1.ApiProperty({
        description: `Database row's id`,
        required: true,
        type: 'number',
        default: null,
        example: `1`,
    }),
    __metadata("design:type", Number)
], DeletePlanDTO.prototype, "id", void 0);
exports.DeletePlanDTO = DeletePlanDTO;
//# sourceMappingURL=plan.dto.js.map