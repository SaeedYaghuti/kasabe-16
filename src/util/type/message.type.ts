import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class MessageType {
    @Field()
    readonly message: string;
}