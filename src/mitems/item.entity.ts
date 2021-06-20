import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Field, Float, ID, ObjectType, Int } from 'type-graphql';

@Entity({ name: 'item' })
@ObjectType()
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    item_id!: number;

    @Column()
    @Field()
    item_title!: string; 

    @Column({ nullable: true })
    @Field({ nullable: true })
    item_description?: string;   

}
