import { TagRepository } from './tag.repository';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { BuildTagInput } from './dto/create_tag.input';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: TagRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(tag: BuildTagInput): Promise<Tag>;
    rebuild(tag: UpdateTagInput): Promise<Tag>;
    fetchById(rId: number): Promise<Tag>;
}
