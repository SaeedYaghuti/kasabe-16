import { Field, Float, InputType, ObjectType } from "type-graphql";

@InputType()
export class ItemInput {

    @Field()
    readonly title: string;
    
    @Field(() => Float)
    readonly price: number;

    @Field()
    readonly description: string;
}