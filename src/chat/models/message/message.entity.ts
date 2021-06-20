import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
import { MsgVideo } from './msg_video.entity';
import { MsgAudio } from './msg_audio.entity';
import { MsgPhoto } from './msg_photo.entity';
import { MsgSticker } from './msg_sticker.entity';
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';
import { validate, IsNotEmpty, IsDate, IsOptional, validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { MessageCreateDto } from './dto/message_create.dto';
import { MessageRecipiant } from './messag_recipiant.enum';

@Entity('message')
  export class Message extends BaseEntity {
    //#region COLUMNS
    @PrimaryGeneratedColumn()
    message_id!: number;

    @Column({ nullable: true})
    @IsOptional()
    text?: string;

    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    created_at!: Date;
    
    @Column({nullable: false})
    @IsNotEmpty()
    @IsDate()
    updated_at!: Date;

    //#endregion
    
    //#region  RELATIONS
    
    // relation with Client (SENDER)
    @ManyToOne(
      type => Client,
      client => client.sent_messages,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: false,
      },
    ) 
    @JoinColumn({ name: 'sender_client_id'})
    sender_client?: Client;
    @Column()
    sender_client_id: number; 
    

    // relation with Client (RECIVER)
    @ManyToOne(
      type => Client,
      client => client.recived_messages,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: false,
      },
    ) 
    @JoinColumn({ name: 'reciver_client_id'})
    reciver_client?: Client;
    @Column({ nullable: true })
    reciver_client_id?: number;
    
    
    // relation with ROOM (RECIVER)
    @ManyToOne(
      type => Room,
      room => room.recived_messages,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: false,
      },
    ) 
    @JoinColumn({ name: 'reciver_room_id'})
    reciver_room?: Room;
    @Column({ nullable: true })
    reciver_room_id?: number;


    // relation with Video
    @OneToOne(
      type => MsgVideo,
      msgVideo => msgVideo.message,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: true,
      },
    ) 
    @JoinColumn({ name: 'msg_video_id' })
    msg_video?: MsgVideo;
    @Column({ nullable: true })
    msg_video_id?: number;
    
    
    // relation with Audio
    @OneToOne(
      type => MsgAudio,
      msgAudio => msgAudio.message,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: true,
      },
    ) 
    @JoinColumn({ name: 'msg_audio_id' })
    msg_audio?: MsgAudio;
    @Column({ nullable: true })
    msg_audio_id?: number;
    

    // relation with Photo
    @OneToOne(
      type => MsgPhoto,
      msgPhoto => msgPhoto.message,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: true,
      },
    ) 
    @JoinColumn({ name: 'msg_photo_id' })
    msg_photo?: MsgPhoto;
    @Column({ nullable: true })
    msg_photo_id?: number;

    
    // relation with Sticker
    @OneToOne(
      type => MsgSticker,
      msgSticker => msgSticker.message,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // only one side of relationship could be eager
        eager: true,
      },
    ) 
    @JoinColumn({ name: 'msg_sticker_id' })
    msg_sticker?: MsgSticker;
    @Column({ nullable: true })
    msg_sticker_id?: number;
    
    //#endregion

    // public static of(params: Partial<Message>): Message {
    public static of(params: MessageCreateDto, sender_id: number): Message {
      
      const nMessage = new Message();

      // TODO: 🎯 if message is sent to room maybe we should check if it has member of room or not?
  
      Object.assign(nMessage, params);

      nMessage.sender_client_id = sender_id;
      nMessage.created_at = new Date();
      nMessage.updated_at = new Date();
  
      return nMessage;
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {
      const errors = await validate(this);
      if (errors.length > 0) {
        // console.log('<<checkDataValidation>> errors: ', errors);
        throw new BadRequestException('Validation failed!');
      }
    }
  }