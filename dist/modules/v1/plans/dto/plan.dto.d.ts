export declare class PlanDTO {
    readonly name: string;
    readonly planId: string;
    readonly invoiceName: string;
    readonly description: string;
    readonly showDescInvoices: boolean;
    readonly showDescQuotes: boolean;
    readonly billEveryCount: number;
    readonly billEveryType: string;
    readonly pricingModel: string;
    readonly pricingCharacteristic: any;
    readonly freeTrialCount: number;
    readonly freeTrialType: string;
    readonly displayInCustomerPortal: boolean;
    readonly checkoutUsDropinScript: boolean;
}
declare const UpdatePlanDTO_base: import("@nestjs/common").Type<Partial<PlanDTO>>;
export declare class UpdatePlanDTO extends UpdatePlanDTO_base {
    readonly id: number;
}
export declare class DeletePlanDTO {
    readonly id: number;
}
export {};
