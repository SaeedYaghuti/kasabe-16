import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { MessageType } from '../../../util/type/message.type';
import { BuildTagInput } from './dto/create_tag.input';
export declare class TagResolver {
    private tagService;
    constructor(tagService: TagService);
    tagTestQuery(message: string): Promise<MessageType>;
    tagTestMutation(message: string): Promise<MessageType>;
    build(tag: BuildTagInput): Promise<Tag>;
    rebuild(tag: UpdateTagInput): Promise<Tag>;
    fetchById(tag_id: number): Promise<Tag>;
}
