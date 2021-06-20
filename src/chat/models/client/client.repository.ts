import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Client } from './client.entity';
import { ClientUpdateDto } from './dto/client_update.dto';
import { ClientCreateInput } from './dto/client_create.input';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  private logger = new Logger('ClientRepository');
  
  // Client
  async clientCreate( rClient: ClientCreateInput ): Promise<Client> {
   
    const nClient = await Client.of(rClient);
    const gClient = await this.save(nClient);
    // const gClient = await nClient.save();

    return gClient;
  }

  async clientGetById( rId: number ): Promise<Client> {

    const fClient = await Client.findOne(rId);
    return fClient;
  } 
  
  async clientUpdate( rClient: ClientUpdateDto ): Promise<Client> {
    
    const fClient = await Client.findOneOrFail(rClient.client_id);

    const toUpdateClient = Object.assign(fClient, rClient);
    // 🎯  TODO: Delete some attribute that only must by changed by authenticated 
    // delete toUpdateClient.created_at;
    // delete toUpdateClient.is_active;
    // delete toUpdateClient.is_blocked;
    // delete toUpdateClient.is_reported;
    // delete toUpdateClient.password;
    // delete toUpdateClient.updated_at;

    // update Client
    const uClient = await this.save(toUpdateClient);
    return uClient;
    
  }

  async clientsGetByRoomId( roomId: number ): Promise<Client[]> {

    const fClients = await Client.createQueryBuilder("client")
      .innerJoin("client.room_clients", "room_client")
      .innerJoin("room_client.room", "room", "room.room_id =:roomId", { roomId })
      .getMany();
    // console.log('fClients: ', fClients);

    return fClients;
  } 
}

// export class ClientRepositoryFake {
//   public async clientCreate(): Promise<void> {}
//   public async clientUpdate(): Promise<void> {}
//   public async clientGetById(): Promise<void> {}
//   public async clientsGetByRoomId(): Promise<void> {}
// }
