import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { BuildTagInput } from './dto/create_tag.input';

@Injectable()
export class TagService {
    constructor(
        // Tag
        @InjectRepository(TagRepository)
        private tagRepository: TagRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Tag
    async build(tag: BuildTagInput): Promise<Tag> {
        const gTag = await this.tagRepository.build(tag);
        // console.log(gTag);
        return gTag;
    }
    async rebuild(tag: UpdateTagInput): Promise<Tag> {
        const gTag = await this.tagRepository.rebuild(tag);
        // console.log(gTag);
        return gTag;
    }
    async fetchById ( rId: number ): Promise<Tag> {
        const fTag = await this.tagRepository.fetchById(rId);
        // console.log(fTag);
        return fTag;
    }
    //#endregion
 
}
