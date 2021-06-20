import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Query, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { RoomClientCreateDto, RoomClientCascadeDto } from './dto/room_client_create.dto';
import { RoomClient } from './room_client.entity';
import { ClientRole } from '../client/client_role.enum';
import { Room } from '../room/room.entity';
import { Client } from '../client/client.entity';
import { RoomClientUpdateDto } from './dto/room_client_update.dto';

@EntityRepository(RoomClient)
export class RoomClientRepository extends Repository<RoomClient> {
  private logger = new Logger('RoomClientRepository');
  
  // RoomClient
  async room_clientCreate( rRC: RoomClientCreateDto ): Promise<RoomClient> {

    const nRoomClient = RoomClient.of(rRC);

    const gRoomClient = await this.save(nRoomClient);

    // return fRoomClient;
    return gRoomClient;

  }
  
  async roomClientCreateCascade( rRC: RoomClientCascadeDto ): Promise<RoomClient> {

    const nRoomClient = new RoomClient();
    nRoomClient.room = rRC.room;
    nRoomClient.client = rRC.client;
    nRoomClient.client_role = ClientRole.ADMIN;

    const gRoomClient = await this.save(nRoomClient);

    // console.log('<<roomClientCreateCascade>> gRoomClient: ', gRoomClient);

    return gRoomClient;
  }
  
  //❌
  async roomClientCreateArray( rRCs: RoomClientCreateDto[] ): Promise<RoomClient[]> {

    // MYBE THESE CHECKENG WILL BE DONE AUTOMATICALLY BY PG
    // whether we have such a room?

    const gRoomClients: RoomClient[] = [];

    for (const rRC of rRCs) {
      const nRoomClient = RoomClient.of(rRC);

      try {
        const gRoomClient = await this.save(nRoomClient);
        gRoomClients.push(gRoomClient);
      } catch (error) {
        throw new BadRequestException({
          message: '!> Failed to save room_client',
          origin: '@room_client.repository.ts',
          room_client: rRC,
          error: error.message,
        });
      }


    }

    return gRoomClients;
  }
  
  // Update
  async room_clientUpdate( rRoomClient: RoomClientUpdateDto ): Promise<RoomClient> {

    let fRoom = await this.findOne(rRoomClient.room_client_id);

    fRoom.client_role = rRoomClient.client_role;
    
    const updatedRoom = await this.save(fRoom);

    return updatedRoom;
    
  }

  async clientsGetByRoomId( rId: number ): Promise<Client[]> {

    const fClients = await Client.createQueryBuilder("client")
    .innerJoinAndSelect("client.room_clients", "room_client", "room_client.room_id = :room_clientId", { room_clientId: rId })
    .getMany();

    return fClients;

  } // RoomClient End
  
  async room_clientsGetByClientId( clientId: number ): Promise<RoomClient[]> {
    
    // const fRooms = await RoomClient.createQueryBuilder("room_client")
    // .innerJoinAndSelect("room_client.room_clients", "room_client", "room_client.client_id = :clientId", { clientId: rId })
    // .getMany();
    
    const fRooms = await this.find({ client_id: clientId});

    return fRooms;

  } // RoomClient End
  
  // Get
  async clientLeftRoom( client_id: number, room_id: number ): Promise<DeleteResult> {
 
    const deleteResult = await RoomClient.delete({ room_id, client_id });
    // console.log('#clientLeftRoom()> deleteResult: ', deleteResult);

    return deleteResult;

  } // RoomClient End
  
  // Get
  async room_clientGetById( rId: number ): Promise<RoomClient> {

    const fRoom = await RoomClient.findOne(rId);

    return fRoom;
    
  } 
  
}

// export class RoomClientRepositoryFake {
//   public async room_clientCreate(): Promise<void> {}
//   public async room_clientCreateSample(): Promise<void> {}
//   public async room_clientUpdate(): Promise<void> {}
//   public async clientsGetByRoomId(): Promise<void> {}
//   public async room_clientsGetByClientId(): Promise<void> {}
//   public async clientLeftRoom(): Promise<void> {}
//   public async room_clientGetById(): Promise<void> {}
// }
