import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsString, IsDate, MinDate } from 'class-validator';
import { OrderStatus } from '../../order/order_status.enum';
import { Field, Float,ObjectType, Int, InputType } from 'type-graphql';


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
export class CreateOrderDetailsInput {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    product_id!: number;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float)
    quantity!: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Int,{ nullable: true })
    shipper_id?: number;

    @IsOptional()
    @IsDate()
    @MinDate(new Date())
    @Field({ nullable: true }) 
    required_date?: Date;

    @IsOptional()
    @IsDate()
    @MinDate(new Date())
    @Field({ nullable: true }) 
    ship_date?: Date;

    @IsOptional()
    @IsNumber()
    @Field(() => Float,{ nullable: true }) 
    freight?: number;

    //  TODO: should change to IsNotEmpty
    @IsOptional()
    @IsEnum(OrderStatus)
    @Field(() => String,{ nullable: true }) 
    status?: OrderStatus;
}
