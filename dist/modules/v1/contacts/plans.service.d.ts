import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { PlanDTO, UpdatePlanDTO } from './dto/plan.dto';
import { BillingPlansModel } from 'src/database/sequelize-db/models/billing-plans.model';
export declare class PlansService {
    private readonly billingPlansModel;
    private readonly respService;
    constructor(billingPlansModel: BillingPlansModel, respService: ResponseHelperService);
    getAllPlans(): Promise<any>;
    findPlanById(id: string): Promise<any>;
    insertPlan(dataDto: PlanDTO): Promise<any>;
    updatePlanById(dataDto: UpdatePlanDTO): Promise<any>;
    deletePlanById(id: string): Promise<any>;
}
