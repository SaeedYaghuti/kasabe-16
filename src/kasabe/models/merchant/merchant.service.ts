import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantRepository } from './merchant.repository';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Merchant } from './merchant.entity';

@Injectable()
export class MerchantService {
    constructor(
        // Merchant
        @InjectRepository(MerchantRepository)
        private merchantRepository: MerchantRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Merchant
    async build(merchant: BuildMerchantInput): Promise<Merchant> {
        console.log('service build() is running');
        const gMerchant = await this.merchantRepository.build(merchant);
        console.log('service build() db resutlt merchant:> ');
        console.log(gMerchant);
        return gMerchant;
    }
    async rebuild(merchant: UpdateMerchantInput): Promise<Merchant> {
        console.log('service rebuild() is running');
        const gMerchant = await this.merchantRepository.rebuild(merchant);
        console.log('service rebuild() db resutlt merchant:> ');
        console.log(gMerchant);
        return gMerchant;
    }
    async fetchById ( rId: number ): Promise<Merchant> {
        // console.log('service fetchById() is running');
        const fMerchant = await this.merchantRepository.fetchById(rId);
        // console.log('service fetchById() db resutlt fMerchant:> ');
        console.log(fMerchant);
        return fMerchant;
    }
    //#endregion
 
}
