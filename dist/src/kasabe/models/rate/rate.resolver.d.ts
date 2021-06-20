import { RateService } from './rate.service';
import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Rate } from './rate.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class RateResolver {
    private rateService;
    constructor(rateService: RateService);
    rateTestQuery(message: string): Promise<MessageType>;
    rateTestMutation(message: string): Promise<MessageType>;
    build(rate: BuildRateInput): Promise<Rate>;
    rebuild(rate: UpdateRateInput): Promise<Rate>;
    fetchById(rId: number): Promise<Rate>;
}
