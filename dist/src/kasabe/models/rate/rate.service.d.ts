import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';
export declare class RateService {
    private rateRepository;
    constructor(rateRepository: RateRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(rate: BuildRateInput): Promise<Rate>;
    rebuild(rate: UpdateRateInput): Promise<Rate>;
    fetchById(rId: number): Promise<Rate>;
}
