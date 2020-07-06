export declare class ContactDTO {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
}
declare const UpdateContactDTO_base: import("@nestjs/common").Type<Partial<ContactDTO>>;
export declare class UpdateContactDTO extends UpdateContactDTO_base {
    readonly id: string;
}
export declare class DeleteContactDTO {
    readonly id: string;
}
export {};
