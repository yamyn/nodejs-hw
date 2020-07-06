import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import {
    ContactDTO,
    UpdateContactDTO,
    DeleteContactDTO,
} from './dto/contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Get('')
    @ApiOperation({
        description: 'Get all contacts',
        summary: 'Done',
    })
    async getAllContacts(): Promise<any> {
        return await this.contactsService.getAllContacts();
    }

    @Get(':id')
    @ApiOperation({
        description: 'Get one contact by database id',
        summary: 'Done',
    })
    async getContactById(@Param('id') id: string): Promise<any> {
        return await this.contactsService.findContactById(id);
    }

    @Post('')
    @ApiOperation({
        description: 'Insert new contact',
        summary: 'Done',
    })
    async insertContact(@Body() dataDto: ContactDTO): Promise<any> {
        return await this.contactsService.insertContact(dataDto);
    }

    @Put('')
    @ApiOperation({
        description: 'Update contact by database document`s id',
        summary: 'Done',
    })
    async updateContact(@Body() dataDto: UpdateContactDTO): Promise<any> {
        return await this.contactsService.updateContactById(dataDto);
    }

    @Delete('')
    @ApiOperation({
        description: 'Delete Contact by database document`s id',
        summary: 'Done',
    })
    @ApiBody({ type: DeleteContactDTO })
    async deleteContact(@Body('id') id: string): Promise<any> {
        return await this.contactsService.deleteContactById(id);
    }
}
