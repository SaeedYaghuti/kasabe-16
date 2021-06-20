import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Product } from '../product/product.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BuildTagInput } from './dto/create_tag.input';
import { BadRequestException } from '@nestjs/common';
import { IsNotEmpty, IsString, Max, Min, validate, IsOptional, Length } from 'class-validator';
import { Merchant } from '../merchant/merchant.entity';


`
@ObjectType()
@Field(() =)    @Field(() =,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@Entity({ name: 'tag' })
@Unique(['tag_title'])
@ObjectType()
export class Tag extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    tag_id!: number;

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    @Field()
    @Column()
    tag_title!: string; // heart: main_warhouse, home, ...

    // Many_to_Many relationship with Product
    @ManyToMany(
        type => Product,
        product => product.tags,
        {
            cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
        },
    )
    @Field(() => [Product])
    products: Product[];
    
    
    @ManyToMany(
        type => Merchant,
        merchant => merchant.tags,
        {
            cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
        },
    )
    @Field(() => [Merchant])
    merchants: Merchant[];

    public static of(rTag: BuildTagInput): Tag {
      
        const nTag = new Tag();
    
        Object.assign(nTag, rTag);
    
        return nTag;
    
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

        const errors = await validate(this, {validationError: { target: true, value: true }});
        
        if (errors.length > 0) {

            console.log('<checkDataValidation |errors>', errors);
            throw new BadRequestException('Validation failed!');

        }
    }
}
