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
exports.PlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plans_service_1 = require("./plans.service");
const plan_dto_1 = require("./dto/plan.dto");
let PlansController = class PlansController {
    constructor(plansService) {
        this.plansService = plansService;
    }
    async getAllPlans() {
        return await this.plansService.getAllPlans();
    }
    async getPlanById(id) {
        return await this.plansService.findPlanById(id);
    }
    async insertNewPlan(dataDto) {
        return await this.plansService.insertPlan(dataDto);
    }
    async updatePlan(dataDto) {
        return await this.plansService.updatePlanById(dataDto);
    }
    async deletePlan(id) {
        return await this.plansService.deletePlanById(id);
    }
};
__decorate([
    common_1.Get(''),
    swagger_1.ApiOperation({
        description: 'Get all plans',
        summary: 'Done',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getAllPlans", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({
        description: 'Get one plan by database id',
        summary: 'Done',
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getPlanById", null);
__decorate([
    common_1.Post(''),
    swagger_1.ApiOperation({
        description: 'Insert new plan',
        summary: 'Done',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.PlanDTO]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "insertNewPlan", null);
__decorate([
    common_1.Put(''),
    swagger_1.ApiOperation({
        description: 'Update plan by database row`s id',
        summary: 'Done',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.UpdatePlanDTO]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "updatePlan", null);
__decorate([
    common_1.Delete(''),
    swagger_1.ApiOperation({
        description: 'Delete plan by database row`s id',
        summary: 'Done',
    }),
    swagger_1.ApiBody({ type: plan_dto_1.DeletePlanDTO }),
    __param(0, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "deletePlan", null);
PlansController = __decorate([
    swagger_1.ApiTags('Plans'),
    common_1.Controller('plans'),
    __metadata("design:paramtypes", [plans_service_1.PlansService])
], PlansController);
exports.PlansController = PlansController;
//# sourceMappingURL=plans.controller.js.map