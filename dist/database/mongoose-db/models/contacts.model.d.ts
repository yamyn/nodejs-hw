import { Model } from 'mongoose';
export declare class ContactsMongoModel {
    private readonly collection;
    constructor(collection: Model<any>);
    getAll(): Promise<any[]>;
    getById(id: string): Promise<Pick<any, string | number | symbol> | Pick<any, string | number | symbol>[]>;
    insert(contactsData: any): Promise<any>;
    update({ id, ...data }: any): Promise<any>;
    delete(id: string): Promise<any>;
}
