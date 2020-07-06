import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseDBModule } from '../../../database/mongoose-db/mongoose-db.module';

import { HelperModule } from 'src/common/helper/helper.module';

@Module({
    imports: [ConfigModule.forRoot(), MongooseDBModule, HelperModule],
    controllers: [ContactsController],
    providers: [ContactsService],
})
export class ContactsModule {}
