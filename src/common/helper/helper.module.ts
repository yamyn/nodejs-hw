import { Module, HttpModule } from '@nestjs/common';
import { ResponseHelperService } from './response.helper.service';
import { HttpHelperService } from './http.helper.service';

const ProvidersAndExports = [ResponseHelperService, HttpHelperService];

@Module({
    imports: [HttpModule],
    providers: ProvidersAndExports,
    exports: ProvidersAndExports,
})
export class HelperModule {}
