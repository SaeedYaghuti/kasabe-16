import { SeenService } from './seen.service';
import { BuildSeenInput } from './dto/create_seen.input';
import { UpdateSeenInput } from './dto/update_seen.input';
import { Seen } from './seen.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class SeenResolver {
    private seenService;
    constructor(seenService: SeenService);
    seenTestQuery(message: string): Promise<MessageType>;
    seenTestMutation(message: string): Promise<MessageType>;
    build(seen: BuildSeenInput): Promise<Seen>;
    rebuild(seen: UpdateSeenInput): Promise<Seen>;
    fetchById(rId: number): Promise<Seen>;
}
