import { Field, Float, ID, ObjectType, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateItemInput {

    @Field(() => Int)
    readonly item_id!: number;

    @Field({ nullable: true})
    readonly item_title?: string;

    @Field({ nullable: true})
    readonly item_description?: string;
}