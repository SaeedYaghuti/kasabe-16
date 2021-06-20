import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildHeartInput } from './dto/create_heart.input';
import { UpdateHeartInput } from './dto/update_heart.input';
import { Heart } from './heart.entity';
import { HeartRepository } from './heart.repository';

@Injectable()
export class HeartService {
    constructor(
        // Heart
        @InjectRepository(HeartRepository)
        private heartRepository: HeartRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Heart
    async build(heart: BuildHeartInput): Promise<Heart> {
        console.log('service build() is running');
        const gHeart = await this.heartRepository.build(heart);
        console.log('service build() db resutlt heart:> ');
        console.log(gHeart);
        return gHeart;
    }
    async rebuild(heart: UpdateHeartInput): Promise<Heart> {
        console.log('service rebuild() is running');
        const gHeart = await this.heartRepository.rebuild(heart);
        console.log('service rebuild() db resutlt heart:> ');
        console.log(gHeart);
        return gHeart;
    }
    async fetchById ( rId: number ): Promise<Heart> {
        console.log('service fetchById() is running');
        const fHeart = await this.heartRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fHeart:> ');
        console.log(fHeart);
        return fHeart;
    }
    //#endregion
 
}
