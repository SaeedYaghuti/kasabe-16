import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsString, IsDate, IsArray, IsISO8601, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderDetailsInput } from '../../order_details/dto/update_order_details.input';
import { OrderStatus } from '../order_status.enum';
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
export class UpdateOrderInput {
    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    order_id!: number;

    // @IsOptional()
    // @IsString()
    // @Field({ nullable: true })
    // order_number!: string;

    // @IsOptional()
    // @IsNumber()
    // @Field(() => Int, { nullable: true })
    // customer_id!: number;

    // only admin
    @IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true })
    shipper_id!: number;

    // @IsOptional()
    // @IsDate()
    // @Field({ nullable: true })
    // order_date!: Date;

    //under certain constraint
    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    required_date!: Date;

    //under certain constraint
    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    ship_date!: Date;

    // Admin
    @IsOptional()
    @IsNumber()
    @Field(() => Float, { nullable: true })
    freight!: number;

    // Admin
    @IsOptional()
    @IsEnum(OrderStatus)
    @Field(() => String, { nullable: true })
    status!: OrderStatus;

    @IsOptional()
    @IsArray()
    @Type(() => UpdateOrderDetailsInput)
    @Field(() => [UpdateOrderDetailsInput], { nullable: true })
    order_details!: UpdateOrderDetailsInput[];
}
