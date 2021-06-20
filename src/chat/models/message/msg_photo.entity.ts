import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Message } from './message.entity';

@Entity({ name: 'msg_photo' })
export class MsgPhoto extends BaseEntity {
    @PrimaryGeneratedColumn()
    msg_photo_id: number;

    // relation with Message
    @OneToOne(
        type => Message,
        message => message.msg_photo,
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
    format: string;   // TODO: must change to Enum

    @Column({ nullable: true })
    volume: number; 
}
