import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Helmet from 'helmet';
import * as Compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExecutionTimeInterceptor } from './common/interceptors/execution-time.interceptor';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //app.use(Helmet(), Compression());
    app.enableCors();

    // body Parser
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));

    // Add global interceptor for calculating execution time for completing any req handler
    app.useGlobalInterceptors(new ExecutionTimeInterceptor());

    // prefixing 'api' to all routes
    app.setGlobalPrefix('api');

    SwaggerModule.setup(
        '/api/v1/explorer',
        app,
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .setTitle('Contacts Service Api Documentation')
                .setDescription(
                    'The documentation contains the api docs for project EMP',
                )
                .setVersion('1.0.0')
                .addBearerAuth()
                .build(),
        ),
    );
    await app.listen(process.env.PORT);
}
bootstrap();
