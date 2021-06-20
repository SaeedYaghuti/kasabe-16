import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Message } from './message.entity';

@Entity({ name: 'msg_audio' })
export class MsgAudio extends BaseEntity {
    @PrimaryGeneratedColumn()
    msg_audio_id: number;

    // relation with Message
    @OneToOne(
        type => Message,
        message => message.msg_audio,
        {
            cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
            // only one side of relationship could be eager
            eager: false,
        },
    ) 
    @JoinColumn({ name: 'message_id' })
    message: Message;
    @Column({ nullable: true })
    message_id: number;
    
    @Column()
    url: string; 

    @Column({ nullable: true })
    duration: number;   
    
    @Column({ nullable: true })
    format: string;   // TODO: must change to Enum

    @Column({ nullable: true })
    volume: number; 
}
