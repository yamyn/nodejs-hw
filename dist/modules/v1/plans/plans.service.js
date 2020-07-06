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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("../../../common/helper/response.helper.service");
const billing_plans_model_1 = require("src/database/sequelize-db/models/billing-plans.model");
const plan_validation_1 = require("./validation/plan.validation");
let PlansService = class PlansService {
    constructor(billingPlansModel, respService) {
        this.billingPlansModel = billingPlansModel;
        this.respService = respService;
    }
    async getAllPlans() {
        try {
            const plans = await this.billingPlansModel.getAllPlans();
            return this.respService.sendResponse(200, 'Succes find all plans', null, {
                data: plans,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async findPlanById(id) {
        try {
            await plan_validation_1.validateFindOneDeletePlanSchema.validateAsync({ id });
            const currentPlan = await this.billingPlansModel.findById(id);
            if (!currentPlan) {
                return this.respService.sendResponse(404, 'Error', `Not found row with id - ${id}`, null);
            }
            return this.respService.sendResponse(200, `Succes find plan by id - ${id}`, null, {
                data: currentPlan,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async insertPlan(dataDto) {
        try {
            dataDto = await plan_validation_1.validateCreatePlanSchema.validateAsync(dataDto);
            const plan = await this.billingPlansModel.create(dataDto);
            return this.respService.sendResponse(200, 'Succes create new plan', null, { data: plan });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async updatePlanById(dataDto) {
        try {
            dataDto = await plan_validation_1.validateUpdatePlanSchema.validateAsync(dataDto);
            await this.billingPlansModel.updateById(dataDto);
            const { id } = dataDto, data = __rest(dataDto, ["id"]);
            return this.respService.sendResponse(200, `Succes update plan with id - ${id}`, null, {
                data: { id, updatedFields: data },
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
    async deletePlanById(id) {
        try {
            await plan_validation_1.validateFindOneDeletePlanSchema.validateAsync({ id });
            await this.billingPlansModel.deleteById(id);
            return this.respService.sendResponse(200, `Succes delete plan by id - ${id}`, null, {
                data: id,
            });
        }
        catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
};
PlansService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof billing_plans_model_1.BillingPlansModel !== "undefined" && billing_plans_model_1.BillingPlansModel) === "function" ? _a : Object, response_helper_service_1.ResponseHelperService])
], PlansService);
exports.PlansService = PlansService;
//# sourceMappingURL=plans.service.js.map