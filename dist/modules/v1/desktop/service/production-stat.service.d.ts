import { IDecodedToken } from '../../../../common/interfaces/decoded-token.interface';
import { ResponseHelperService } from 'src/common/helper/response.helper.service';
import { IResponse } from '../../../../common/interfaces/response.interface';
import { ProductionStatsModel } from 'src/database/sequelize-db/models/production-stats.model';
export declare class ProductionStatsService {
    private readonly responseHelperService;
    private readonly productionStatsModel;
    constructor(responseHelperService: ResponseHelperService, productionStatsModel: ProductionStatsModel);
    getProductionStarts(userData: IDecodedToken): Promise<IResponse>;
}
