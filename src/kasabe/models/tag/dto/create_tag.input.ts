import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, Max, Min, Length } from 'class-validator';
import { ObjectType, Field, InputType } from 'type-graphql';

@InputType()
export class BuildTagInput {

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    @Field()
    tag_title!: string;

}
