import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { MessageCreateDto } from './dto/message_create.dto';
export declare class MessageRepository extends Repository<Message> {
    private logger;
    messageCreate(rMessage: MessageCreateDto, sender_id: number): Promise<Message>;
    messageGetById(rId: number): Promise<Message>;
}
