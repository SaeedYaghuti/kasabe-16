import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne } from 'typeorm';
import { ClientRole } from './client_role.enum';
import { Client } from './client.entity';
import { Room } from '../room/room.entity';

// Github: https://github.com/typeorm/typeorm/issues/1224

@Entity({ name: 'client_subscriber' })
export class ClientSubscriber extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_subscriber_id: number;

    // // relation with Client
    // @ManyToOne(
    //   type => Client, 
    //   client => client.room_clients, 
    //   { primary: true }
    // )
    // client: Client;

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

    // relation with Room
    // @ManyToOne(
    //   type => Room, 
    //   room => room.room_clients, 
    //   { primary: true }
    // )
    // room: Room;


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

    
    @Column("enum", { enum: ClientRole})
    client_role: ClientRole;
}
