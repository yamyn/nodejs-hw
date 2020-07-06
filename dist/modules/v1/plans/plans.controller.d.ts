import { PlansService } from './plans.service';
import { PlanDTO, UpdatePlanDTO } from './dto/plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    getAllPlans(): Promise<any>;
    getPlanById(id: string): Promise<any>;
    insertNewPlan(dataDto: PlanDTO): Promise<any>;
    updatePlan(dataDto: UpdatePlanDTO): Promise<any>;
    deletePlan(id: string): Promise<any>;
}
