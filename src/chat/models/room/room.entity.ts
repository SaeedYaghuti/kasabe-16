import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validate, IsNotEmpty, IsOptional, Length, IsDate, IsBoolean, IsEnum } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Message } from '../message/message.entity';
import { RoomType } from './room_type.enum';
import { RoomCreateDto } from './dto/room_create.dto';
import { RoomClient } from '../room_client/room_client.entity';

@Entity({ name: 'room' })
// anjoinColumncester of auth, group, chanel, ... that can send/recive message
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    room_id: number;

    //#region RELATIONS

    // ManyToMany relation with RoomClient
    @OneToMany(
        type => RoomClient, 
        room_client => room_client.room
    )
    room_clients: RoomClient[];


    // relation Room (RECIVER) with Message 
    @OneToMany(
        // type =>  Many_Table
        type => Message,
        // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
        message => message.reciver_room,
        {
          // cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          // eager: true,
        },
      )
      @JoinColumn({ referencedColumnName: "message_id", name: "message_id"})
      // variable to access Many_Part from One_part
      recived_messages: Message[];
    //#endregion

    @Column("enum", { enum: RoomType})
    @IsNotEmpty()
    @IsEnum(RoomType)
    room_type: RoomType; 

    @Column()
    @IsNotEmpty()
    @Length(3)
    title: string; 

    @Column({ nullable: true })
    @IsOptional()
    @Length(3)
    status: string;   
    
    //TODO: may be we need multiple profile photo  -> we must change
    @Column({ nullable: true })
    @IsOptional()
    @Length(3)
    // 🎯 TODO: URL validation 
    profile_image_url: string;   // TODO: must change to Enum+

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
    created_at: Date;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    updated_at: Date;

    //#region  Helper Method
    public static of(rRoom: RoomCreateDto): Room {
      const nRoom = new Room();

      Object.assign(nRoom, rRoom);

      nRoom.is_active = true;
      nRoom.is_reported = false;
      nRoom.is_blocked = false;
      nRoom.created_at = new Date();
      nRoom.updated_at = new Date();
      return nRoom;

    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {
      const errors = await validate(this);
      if (errors.length > 0) {
        // console.log('<<of>> errors: ', errors);
        throw new BadRequestException('Validation failed!');
      }
    }
    //#endregion
}
