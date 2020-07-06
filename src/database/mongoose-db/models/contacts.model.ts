// import { IActivityUsageData } from './../../../modules/v1/desktop/interfaces/activity-usage-data.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContactsMongoModel {
    constructor(
        @InjectModel('Contacts')
        private readonly collection: Model<any>,
    ) {}

    async getAll() {
        return await this.collection.find().exec();
    }

    async getById(id: string) {
        return await this.collection
            .findOne({ _id: id })
            .lean()
            .exec();
    }

    async insert(contactsData: any): Promise<any> {
        const contact = await this.collection.create(contactsData);

        return contact;
    }

    async update({ id, ...data }: any): Promise<any> {
        return await this.collection.update({ _id: id }, { $set: data });
    }

    async delete(id: string): Promise<any> {
        return await this.collection.deleteOne({ _id: id });
    }
}
