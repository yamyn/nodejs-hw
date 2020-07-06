import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { ContactDTO, UpdateContactDTO } from './dto/contact.dto';
import { ContactsMongoModel } from 'src/database/mongoose-db/models/contacts.model';
export declare class ContactsService {
    private readonly contactsModel;
    private readonly respService;
    constructor(contactsModel: ContactsMongoModel, respService: ResponseHelperService);
    getAllContacts(): Promise<any>;
    findContactById(id: string): Promise<any>;
    insertContact(dataDto: ContactDTO): Promise<any>;
    updateContactById(dataDto: UpdateContactDTO): Promise<any>;
    deleteContactById(id: string): Promise<any>;
}
