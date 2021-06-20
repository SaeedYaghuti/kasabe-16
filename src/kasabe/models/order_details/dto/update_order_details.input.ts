import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsString, IsDate, MinDate, IsInt } from 'class-validator';
import { OrderStatus } from '../../order/order_status.enum';
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
// we don't have price fields it would be take from db
@InputType()
export class UpdateOrderDetailsInput {
    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    order_details_id?: number;

    // @IsOptional()
    // @IsInt()
    // @Field(() => Int, {nullable: true})
    // product_id?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {nullable: true})
    quantity?: number;

    // Admin
    @IsOptional()
    @IsNumber()
    @Field(() => Int,{ nullable: true })
    shipper_id?: number;

    // under certain constraint
    @IsOptional()
    @IsDate()
    @MinDate(new Date())
    @Field({ nullable: true })
    required_date?: Date;

    // under certain constraint
    @IsOptional()
    @IsDate()
    @MinDate(new Date())
    @Field({ nullable: true })
    ship_date?: Date;

    // Admin
    @IsOptional()
    @IsNumber()
    @Field(() => Float,{ nullable: true })
    freight?: number;

    // Admin
    @IsOptional()
    @IsEnum(OrderStatus)
    @Field(() => String, {nullable: true})
    status?: OrderStatus;
}
