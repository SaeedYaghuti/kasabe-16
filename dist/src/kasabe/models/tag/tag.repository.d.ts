import { Repository } from 'typeorm';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { BuildTagInput } from './dto/create_tag.input';
export declare class TagRepository extends Repository<Tag> {
    private logger;
    build(rTag: BuildTagInput): Promise<Tag>;
    rebuild(rTag: UpdateTagInput): Promise<Tag>;
    fetchById(rId: number): Promise<Tag>;
}
