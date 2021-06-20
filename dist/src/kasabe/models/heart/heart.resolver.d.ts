import { HeartService } from './heart.service';
import { BuildHeartInput } from './dto/create_heart.input';
import { UpdateHeartInput } from './dto/update_heart.input';
import { Heart } from './heart.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class HeartResolver {
    private heartService;
    constructor(heartService: HeartService);
    heartTestQuery(message: string): Promise<MessageType>;
    heartTestMutation(message: string): Promise<MessageType>;
    build(heart: BuildHeartInput): Promise<Heart>;
    rebuild(heart: UpdateHeartInput): Promise<Heart>;
    fetchById(rId: number): Promise<Heart>;
}
