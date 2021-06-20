import { Repository } from 'typeorm';
import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Rate } from './rate.entity';
export declare class RateRepository extends Repository<Rate> {
    private logger;
    build(rRate: BuildRateInput): Promise<Rate>;
    rebuild(rRate: UpdateRateInput): Promise<Rate>;
    fetchById(rId: number): Promise<Rate>;
    getMerchantRatesForAuth01(rMerchantId: number, rUsrId: number): Promise<Rate[]>;
    getMerchantRatesForAuth02(rMerchantId: number, rUsrId: number): Promise<Rate[]>;
    getMerchantRatesForAuth03(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantRatesForAuth04(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantRatesForAuth05(rMerchantId: number, rAuthId: number): Promise<any[]>;
    getMerchantRatesForAuth06(rMerchantId: number, rAuthId: number): Promise<Rate[]>;
    getRateHeart(auth_id: number, rate_article_id: number): Promise<any>;
    getRateCommentData(rate_article_id: number): Promise<any>;
    fetch01(rate_id: number, auth_id: number): Promise<any>;
}
