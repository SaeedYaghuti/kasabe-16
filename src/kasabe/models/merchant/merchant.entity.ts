import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { IsNotEmpty, IsString, IsOptional, IsInt, IsArray, validate, MaxLength, MinLength, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Tag } from '../tag/tag.entity';
import { Auth } from '../../../auth/auth/auth.entity';
import { MerchantCategory } from '../merchant_category/merchant_category.entity';
import { BadRequestException, Type } from '@nestjs/common';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { Post } from '../post/post.entity';
import { Article } from '../article/article.entity';
import { Relation } from '../relation/relation.entity';



@Entity({ name: 'merchant' })
@ObjectType()
export class Merchant extends BaseEntity {
    @Field(() => Int)  
    @PrimaryGeneratedColumn()
    merchant_id!: number;
    
    //* auth
    @ManyToOne(
        type => Auth,
        // auth => auth.merchants,
        {
        //   cascade: [ 'insert', 'update' ],
        //   onDelete: 'CASCADE',
        //   eager: false,
        },
    ) // only one side of relationship could be eager
    @JoinColumn({ name: 'auth_id'})
    @Field(() => Auth,{ nullable: true })
    auth?: Auth;

    @Field(() => Int,{ nullable: true })
    @Column({ nullable: true })
    auth_id?: number; // name without attribute

    //* article
    @OneToOne(
    type => Article,
    //// article => article.post,
    {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
    },
    ) 
    @JoinColumn({ name: 'article_id'})
    //// @Field(() => Article,{ nullable: true })
    article?: Article;

    @Column()
    //// @Field(() => Int,{ nullable: true })
    article_id?: number; 

    //* relation
    // @Field(() => [Relation],{ nullable: true })
    @OneToMany(
        type => Relation,
        relation => relation.merchant,
        {
            // cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
            // eager: true,
        },
    )
    // @JoinColumn({ referencedColumnName: "relation_id", name: "relation_id"})
    relations: Relation[];
    

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    @Field()
    @Column()
    merchant_title!: string; 
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @Field()
    @Column()
    tiny_description!: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    @Field({ nullable: true })
    @Column()
    long_description?: string; 
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Field()
    @Column()
    contact_name!: string; 
  
    @IsOptional()
    @IsString()
    @MinLength(10)
    // @MaxLength(20)
    @Field({ nullable: true })
    @Column()
    instagram_url?: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    @Field({ nullable: true })
    @Column()
    number_call?: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    @Field({ nullable: true })
    @Column()
    number_whatsapp?: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    @Field({ nullable: true })
    @Column()
    number_telegram?: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(16)
    @MaxLength(16)
    @Field({ nullable: true })
    @Column()
    bank_card_number?: string; 
    
    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    @Field({ nullable: true })
    @Column()
    bank_card_details: string; 
  
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    @Column()
    avatar_url?: string; 
    
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    @Column()
    header_url?: string; 
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(130)
    @Field({ nullable: true })
    @Column()
    note?: string; 
    
    @IsNotEmpty()
    @IsString()
    @Field({ nullable: true })
    @Column()
    location!: string;

    @Field({ nullable: true })
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    @Field({ nullable: true })
    updated_at: Date;

    //* merchant_category
    @ManyToOne(
        type => MerchantCategory,
        merchant_category => merchant_category.merchants,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          eager: false,
        },
    ) // only one side of relationship could be eager
    @JoinColumn({ name: 'merchant_category_id'})
    @Field(() => MerchantCategory,{ nullable: true })
    category?: MerchantCategory;

    @Field(() => Int,{ nullable: true })
    @Column({ nullable: true })
    merchant_category_id?: number; // name without attribute

    //* tag
    @IsOptional()
    @IsArray()
    // @ValidateNested({ each: true })
    // @ArrayMaxSize(10)
    // @Type(() => String)
    @ManyToMany(
        type => Tag,
        tag => tag.merchants,
        {
            cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
            eager: true,
            nullable: true 
        },
  
      )
    @JoinTable({ 
    name: 'tag_merchant',
    joinColumn: {
        name: 'merchant_id',
        referencedColumnName: 'merchant_id'
    },
    inverseJoinColumn: {
        name: 'tag_id',
        referencedColumnName: 'tag_id'
    } 
    })
    @Field(() => [Tag], {nullable: true})
    tags: Tag[];

    //* computed_column
    @Field()
    @Column({insert: false, update: false, select: true, nullable: true})
    rate_count?: string;
    
    @Field()
    @Column({insert: false, update: false, select: true, nullable: true})
    rate_avg?: string;

    //* helper_methods
    public static of(rMerchant: BuildMerchantInput): Merchant {
      
        const nMerchant = new Merchant();
    
        Object.assign(nMerchant, rMerchant);
    
        return nMerchant;
    
    }


    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

        const errors = await validate(this, {validationError: { target: true, value: true }});
        
        if (errors.length > 0) {

            console.log('<<checkDataValidation>> errors: ', errors);
            throw new BadRequestException('Validation failed!');

        }
    }

}
