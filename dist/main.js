"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const execution_time_interceptor_1 = require("./common/interceptors/execution-time.interceptor");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(body_parser_1.json({ limit: '50mb' }));
    app.use(body_parser_1.urlencoded({ limit: '50mb', extended: true }));
    app.useGlobalInterceptors(new execution_time_interceptor_1.ExecutionTimeInterceptor());
    app.setGlobalPrefix('api');
    swagger_1.SwaggerModule.setup('/api/v1/explorer', app, swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('Contacts Service Api Documentation')
        .setDescription('The documentation contains the api docs for project EMP')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()));
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map