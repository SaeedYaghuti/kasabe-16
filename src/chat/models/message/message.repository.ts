import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { Message } from './message.entity';
import { MessageCreateDto } from './dto/message_create.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  private logger = new Logger('MessageRepository');

  // clientRepository = getConnection().getCustomRepository(ClientRepository)
  
  // Message
  async messageCreate( rMessage: MessageCreateDto, sender_id: number ): Promise<Message> {

    const nMessage = Message.of(rMessage, sender_id); 
    
    const gMessage = await this.save(nMessage);
    
    const fMessage = await this.findOne({ message_id: gMessage.message_id });

    return fMessage;
  }
  
  async messageGetById( rId: number ): Promise<Message> {

    const fMessage = await Message.findOne({message_id: rId});
    // console.log('fMessage: ', fMessage);
    return fMessage;

  } 

  // messageGetByRoomId()

}

// export class MessageRepositoryFake {
//   public async messageCreate(): Promise<void> {}
//   public async messageGetById(): Promise<void> {}
// }
