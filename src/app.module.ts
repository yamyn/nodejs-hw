import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from 'nest-router';
import { HelperModule } from './common/helper/helper.module';
import { MongooseDBModule } from './database/mongoose-db/mongoose-db.module';
import { ContactsModule } from './modules/v1/contacts/contacts.module';

const routes: Routes = [{ path: 'v1', children: [ContactsModule] }];

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseDBModule,
        HelperModule,
        ContactsModule,
        RouterModule.forRoutes(routes),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure() {}
}
