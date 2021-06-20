import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ObjectType, Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateTagInput {
    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    tag_id!: number;

    @IsNotEmpty()
    @IsString()
    @Field()
    tag_title!: string;

}
