import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
    constructor(
        // Rate
        @InjectRepository(RateRepository)
        private rateRepository: RateRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Rate
    async build(rate: BuildRateInput): Promise<Rate> {
        console.log('service build() is running');
        const gRate = await this.rateRepository.build(rate);
        console.log('service build() db resutlt rate:> ');
        console.log(gRate);
        return gRate;
    }
    async rebuild(rate: UpdateRateInput): Promise<Rate> {
        console.log('service rebuild() is running');
        const gRate = await this.rateRepository.rebuild(rate);
        console.log('service rebuild() db resutlt rate:> ');
        console.log(gRate);
        return gRate;
    }
    async fetchById ( rId: number ): Promise<Rate> {
        console.log('service fetchById() is running');
        const fRate = await this.rateRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fRate:> ');
        console.log(fRate);
        return fRate;
    }
    //#endregion
 
}
