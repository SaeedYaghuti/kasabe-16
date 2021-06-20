import { Field, Float,Int, ObjectType } from "type-graphql";

@ObjectType()
export class ItemType {

    @Field(() => Int)
    readonly id?: string;

    @Field()
    readonly title: string;
    
    @Field(() => Float)
    readonly price: number;

    @Field()
    readonly description: string;
}