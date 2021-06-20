import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ClientRole } from '../client/client_role.enum';
import { Client } from '../client/client.entity';
import { IsNotEmpty, IsEnum, validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { RoomClientCreateDto, RoomClientCascadeDto } from './dto/room_client_create.dto';
import { Room } from '../room/room.entity';

// Github: https://github.com/typeorm/typeorm/issues/1224

@Entity({ name: 'room_client' })
@Unique('UQ_CLIENT_ROOM', ["client_id", "room_id"] )
export class RoomClient extends BaseEntity {
    @PrimaryGeneratedColumn()
    room_client_id: number;

    // relation with Room
    @ManyToOne(
      type => Room,
      room => room.room_clients,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: false,
      },
    ) 
    @JoinColumn({ name: 'room_id'})
    room: Room;
    @Column("integer")
    room_id: number;

    // relation with Client
    @ManyToOne(
      type => Client,
      client => client.room_clients,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: false,
      },
    ) 
    @JoinColumn({ name: 'client_id'})
    client: Client;
    @Column("integer")
    client_id: number;

    
    @Column("enum", { enum: ClientRole})
    @IsNotEmpty()
    @IsEnum(ClientRole)
    client_role: ClientRole;

    //#region  Helper Method
    public static of(rRoomClient: RoomClientCreateDto): RoomClient {
      
      // 🎯 TODO; we must check that client already is member of this room or not
      const nRoomClient = new RoomClient();
      
      nRoomClient.room_id = rRoomClient.room_id;
      nRoomClient.client_id = rRoomClient.client_id;
      nRoomClient.client_role = rRoomClient.client_role;

      return nRoomClient;
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {
      const errors = await validate(this, {validationError: { target: true, value: true }});
      if (errors.length > 0) {
        console.log('<<of>> errors: ', errors);
        throw new BadRequestException('Validation failed!');
      }
    }
    //#endregion
}
