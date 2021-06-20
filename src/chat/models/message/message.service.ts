import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
    constructor(
        // Message
        // @InjectRepository(MessageRepository)
        // private messageRepository: MessageRepository,

    ) {}

    // async messageCreate(message: MessageCreateDto): Promise<Message> {
    //     // console.log('service messageCreate() is running');
    //     const gMessage = await this.messageRepository.messageCreate(message);
    //     // console.log('service messageCreate() db resutlt message:> ');
    //     // console.log(gMessage);
    //     return gMessage;
    // }
}
