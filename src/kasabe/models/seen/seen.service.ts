import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildSeenInput } from './dto/create_seen.input';
import { UpdateSeenInput } from './dto/update_seen.input';
import { Seen } from './seen.entity';
import { SeenRepository } from './seen.repository';

@Injectable()
export class SeenService {
    constructor(
        // Seen
        @InjectRepository(SeenRepository)
        private seenRepository: SeenRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Seen
    async build(seen: BuildSeenInput): Promise<Seen> {
        console.log('service build() is running');
        const gSeen = await this.seenRepository.build(seen);
        console.log('service build() db resutlt seen:> ');
        console.log(gSeen);
        return gSeen;
    }
    async rebuild(seen: UpdateSeenInput): Promise<Seen> {
        console.log('service rebuild() is running');
        const gSeen = await this.seenRepository.rebuild(seen);
        console.log('service rebuild() db resutlt seen:> ');
        console.log(gSeen);
        return gSeen;
    }
    async fetchById ( rId: number ): Promise<Seen> {
        console.log('service fetchById() is running');
        const fSeen = await this.seenRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fSeen:> ');
        console.log(fSeen);
        return fSeen;
    }
    //#endregion
 
}
