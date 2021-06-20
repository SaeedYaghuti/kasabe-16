import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

@InputType()
export class CreateItemInput {
    @Field()
    item_title!: string; 
    
    @Field({ nullable: true })
    item_description?: string;  
}