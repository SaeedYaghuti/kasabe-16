import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { RoomType } from './room_type.enum';
import { Room } from './room.entity';
import { RoomCreateDto } from './dto/room_create.dto';
import { RoomUpdateDto } from './dto/room_update.dto';
import { Client } from '../client/client.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  private logger = new Logger('RoomRepository');
  
  // Room
  async roomCreate( rRoom: RoomCreateDto ): Promise<Room> {
    // console.log('RoomRepository: Room => rData: ', rRoom);

    const nRoom = Room.of(rRoom);

    const gRoom = await nRoom.save();
    
    return gRoom;
    
  }

  async roomGetById( rId: number ): Promise<Room> {

      const fRoom = await Room.findOne({room_id: rId});

      return fRoom;

  } 
  
  async clientsGetByRoomId( rId: number ): Promise<Client[]> {

    const fClients = await Client.createQueryBuilder("client")
      .innerJoinAndSelect("client.room_clients", "room_client", "room_client.room_id = :roomId", { roomId: rId })
      .getMany();

    return fClients;

  } 
  
  async roomsGetByClientId( rId: number ): Promise<Room[]> {
 
    const fRooms = await Room.createQueryBuilder("room")
      .innerJoinAndSelect("room.room_clients", "room_client", "room_client.client_id = :clientId", { clientId: rId })
      .getMany();
    // console.log('fRooms: ', fRooms);

    return fRooms;

  } // Room End

  // Update
  async roomUpdate( rRoom: RoomUpdateDto ): Promise<Room> {
    
    // Delete some attribute that only must by changed by authenticated 
    // delete rRoom.created_at;
    delete rRoom.is_active;
    delete rRoom.is_blocked;
    delete rRoom.is_reported;
    delete rRoom.updated_at;

    const fRoom = await this.findOne(rRoom.room_id);
    // console.log('roomUpdate => fRoom: ', fRoom);

    if (!fRoom) {
      throw new BadRequestException('Invalid room_id');
    }

    let toUpdateRoom = Object.assign(fRoom, rRoom);

    await Room.save(toUpdateRoom);
    // TODO: Mybe it is better to remove fetch updated dat
    const updatedRoom = await this.findOne(rRoom.room_id);
    // console.log('room.repository.ts> roomUpdate()> => updatedRoom: ', updatedRoom);
    return updatedRoom;
    
  }
  
  async roomUpdate0( rRoom: RoomUpdateDto ): Promise<Room> {
    console.log('roomUpdate => rData: ', rRoom);

    // get Room from DB
    let fRoom: Room;
    try {
      fRoom = await this.findOne(rRoom.room_id);
    } catch (error) {
      this.logger.error(
        `!> Failed to fetch room: ${JSON.stringify(rRoom)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to fetch room',
        origin: '@room.repository.ts',
        room: rRoom,
        error: error.stack,
      });
    }
    // console.log('roomUpdate => fRoom: ', fRoom);
    
    // prepare toUpdateCliet
    let toUpdateRoom: Room;
    try {
      toUpdateRoom = Object.assign(fRoom, rRoom);

      // Delete some attribute that only must by changed by authenticated 
      delete toUpdateRoom.created_at;
      delete toUpdateRoom.is_active;
      delete toUpdateRoom.is_blocked;
      delete toUpdateRoom.is_reported;
      delete toUpdateRoom.updated_at;

    } catch (error) {
      this.logger.error(
        `!> Failed to assign rRoom to toUpdateRoom>: ${JSON.stringify(toUpdateRoom)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to assign rRoom to toUpdateRoom',
        origin: '#room.repository.ts #roomUpdate()>',
        room: toUpdateRoom,
        error: error.stack,
      });
    }
    // console.log('#room.repository.ts #roomUpdate() => toUpdateRoom: ', toUpdateRoom);

    // update Room
    try {
      console.log('<<r.r.ts>> toUpdateRoom: ', toUpdateRoom);
      await Room.save(toUpdateRoom);
      // TODO: Mybe it is better to remove fetch updated dat
      const updatedRoom = await this.findOne(rRoom.room_id);
      // console.log('room.repository.ts> roomUpdate()> => updatedRoom: ', updatedRoom);
      return updatedRoom;
    } catch (error) {
      this.logger.error(
        `!> Failed to update room: ${JSON.stringify(rRoom)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update room',
        origin: '#room.repository.ts #roomUpdate()',
        room: rRoom,
        error: error.stack,
      });
    }

  }
}

class RoomRepositoryFake {
  public async roomCreate(): Promise<void> {}
  public async roomCreateSample(): Promise<void> {}
  public async roomUpdate(): Promise<void> {}
  public async roomGetById(): Promise<void> {}
  public async clientsGetByRoomId(): Promise<void> {}
  public async roomsGetByClientId(): Promise<void> {}
}
