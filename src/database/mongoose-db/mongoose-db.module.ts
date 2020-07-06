import { ContactsMongoModel } from './models/contacts.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsSchema } from './schemas/contacts.schema';
import { ConfigModule } from '@nestjs/config';

const ProvidersAndExports = [ContactsMongoModel];

const mongoOption: any = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

if (process.env.NODE_ENV === 'production') {
    mongoOption.auth = {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
    };
}

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI, mongoOption),
        MongooseModule.forFeature([
            { name: 'Contacts', schema: ContactsSchema },
        ]),
    ],
    providers: ProvidersAndExports,
    exports: ProvidersAndExports,
})
export class MongooseDBModule {}
