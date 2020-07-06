import { ContactsService } from './contacts.service';
import { ContactDTO, UpdateContactDTO } from './dto/contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    getAllContacts(): Promise<any>;
    getContactById(id: string): Promise<any>;
    insertContact(dataDto: ContactDTO): Promise<any>;
    updateContact(dataDto: UpdateContactDTO): Promise<any>;
    deleteContact(id: string): Promise<any>;
}
