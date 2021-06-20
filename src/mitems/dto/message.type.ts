import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Field, Float, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Greet {

    @Field()
    to!: string;

    @Field()
    title!: string; 

    @Field({ nullable: true })
    time?: string;   
}
