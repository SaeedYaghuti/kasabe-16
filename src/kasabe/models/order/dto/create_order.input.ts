import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsString, IsDate, IsArray, IsISO8601 } from 'class-validator';
import { PersonRole } from '../../person/person_role.enum';
import { OrderStatus } from '../order_status.enum';
import { CreateOrderDetailsInput } from '../../order_details/dto/create_order_details.input';
import { Type } from 'class-transformer';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
@InputType()
export class CreateOrderInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    order_number!: string;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    customer_id!: number;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    shipper_id!: number;

    @IsNotEmpty()
    @IsISO8601()
    @Field()
    order_date!: Date;

    @IsNotEmpty()
    @IsISO8601()
    @Field()
    required_date!: Date;

    @IsNotEmpty()
    @IsISO8601()
    @Field()
    ship_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float) 
    freight!: number;

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    // @Field(() => OrderStatus) 
    @Field(() => String) 
    status!: OrderStatus;

    @IsNotEmpty()
    @IsArray()
    @Type(() => CreateOrderDetailsInput)
    @Field(() => [CreateOrderDetailsInput]) 
    order_details!: CreateOrderDetailsInput[];
}
