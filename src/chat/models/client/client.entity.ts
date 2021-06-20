import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Length, validate, IsEmail, IsOptional, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Message } from '../message/message.entity';
import { RoomClient } from '../room_client/room_client.entity';
import { ClientCreateInput } from './dto/client_create.input';

@Entity("client")
  export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_id: number;
    
    @OneToMany(
      type => RoomClient, 
      room_client => room_client.client
    )
    room_clients: RoomClient[];

    @Column()
    @Length(3, 30)
    client_fname: string; // first name
    
    @Column()
    @Length(3, 30)
    client_lname: string; // last name
    
    @Column({nullable: true})
    @IsOptional()
    @Length(3, 30)
    client_mname?: string; // middle name
    
    @Column({nullable: false})
    // TODO: phone checking
    phone: string;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @Column({nullable: false})
    @Length(8, 50)
    password: string;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    last_seen: Date;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    last_typed: Date;

    @Column({nullable: false})
    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;

    @Column({nullable: true})
    @IsOptional()
    @IsBoolean()
    is_reported: boolean;

    @Column({nullable: true})
    @IsOptional()
    @IsBoolean()
    is_blocked: boolean;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    created_at!: Date;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    updated_at!: Date;

    @Column({nullable: true})
    client_socket_id: string;

    @Column({nullable: true})
    client_socket_authname: string;

    //#region Relations

    // relation with Client (SENDER)
    @OneToMany(
      // type =>  Many_Table
      type => Message,
      // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
      message => message.sender_client,
      {
        // cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // eager: true,
      },
    )
    @JoinColumn({ referencedColumnName: "message_id", name: "message_id"})
    // variable to access Many_Part from One_part
    sent_messages: Message[];
    
    
    // relation with Message (RECIVER)
    @OneToMany(
      // type =>  Many_Table
      type => Message,
      // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
      message => message.sender_client,
      {
        // cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // eager: true,
      },
    )
    @JoinColumn({ referencedColumnName: "message_id", name: "message_id"})
    // variable to access Many_Part from One_part
    recived_messages: Message[];


    // Helper Method
    // public static of(dto: partial<Client>): Client {
    public static of(rClient: ClientCreateInput): Client {

      console.log('<<client.ent>> rClient: ', rClient );
      
      const nClient = new Client();

      Object.assign(nClient, rClient);

      nClient.last_seen = new Date();
      nClient.last_typed = new Date();
      nClient.is_active = true;
      nClient.is_reported = true;
      nClient.is_blocked = false;
      nClient.created_at = new Date();
      nClient.updated_at = new Date();
      return nClient;

    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

      const errors = await validate(this, {validationError: { target: true, value: true }});
      
      if (errors.length > 0) {

        console.log('<<checkDataValidation>> errors: ', errors);
        throw new BadRequestException('Validation failed!');

      }
    }

    //#endregion
  }