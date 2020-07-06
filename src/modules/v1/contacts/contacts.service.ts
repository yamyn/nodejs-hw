import { Injectable } from '@nestjs/common';

import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { ContactDTO, UpdateContactDTO } from './dto/contact.dto';
import { ContactsMongoModel } from 'src/database/mongoose-db/models/contacts.model';
// import {
//     validateFindOneDeletePlanSchema,
//     validateCreatePlanSchema,
//     validateUpdatePlanSchema,
// } from './validation/plan.validation';

@Injectable()
export class ContactsService {
    constructor(
        private readonly contactsModel: ContactsMongoModel,
        private readonly respService: ResponseHelperService,
    ) {}

    async getAllContacts(): Promise<any> {
        try {
            const contacts = await this.contactsModel.getAll();

            return this.respService.sendResponse(
                200,
                'Succes find all contacts',
                null,
                {
                    data: contacts,
                },
            );
        } catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }

    async findContactById(id: string): Promise<any> {
        try {
            // await validateFindOneDeletePlanSchema.validateAsync({ id });

            const contact = await this.contactsModel.getById(id);

            if (!contact) {
                return this.respService.sendResponse(
                    404,
                    'Error',
                    `Not found document with id - ${id}`,
                    null,
                );
            }

            return this.respService.sendResponse(
                200,
                `Succes find contact by id - ${id}`,
                null,
                {
                    data: contact,
                },
            );
        } catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }

    async insertContact(dataDto: ContactDTO): Promise<any> {
        try {
            // dataDto = await validateCreatePlanSchema.validateAsync(dataDto);

            const contact = await this.contactsModel.insert(dataDto);

            return this.respService.sendResponse(
                200,
                'Succes create new contact',
                null,
                { data: contact },
            );
        } catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }

    async updateContactById(dataDto: UpdateContactDTO): Promise<any> {
        try {
            // dataDto = await validateUpdatePlanSchema.validateAsync(dataDto);

            await this.contactsModel.update(dataDto);

            const { id, ...data } = dataDto;
            return this.respService.sendResponse(
                200,
                `Succes update contact with id - ${id}`,
                null,
                {
                    data: { id, updatedFields: data },
                },
            );
        } catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }

    async deleteContactById(id: string): Promise<any> {
        try {
            // await validateFindOneDeletePlanSchema.validateAsync({ id });

            await this.contactsModel.delete(id);

            return this.respService.sendResponse(
                200,
                `Succes delete contact by id - ${id}`,
                null,
                {
                    data: id,
                },
            );
        } catch (error) {
            return this.respService.sendResponse(400, 'Error', error, null);
        }
    }
}
