import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';
// import { Address } from '../address/address.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BeforeInsert, Unique } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateAuthInput } from './dto/create.auth.input';
import * as bcrypt from 'bcryptjs';
import { AuthType } from './auth_type.enum';
import { AccessRole } from '../role/access_role.entity';
import { Heart } from '../../kasabe/models/heart/heart.entity';
import { Comment } from '../../kasabe/models/comment/comment.entity';
import { Rate } from '../../kasabe/models/rate/rate.entity';
import { Post } from '../../kasabe/models/post/post.entity';
import { Relation } from '../../kasabe/models/relation/relation.entity';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Auth)  @Field(() => Auth, {nullable: true})  
@Field(() => [Auth])   @Field(() => [Auth], {nullable: true})
`;

@Entity()
@Unique(['authname']) 
@ObjectType()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int) 
  auth_id: number;
  
  @Column()
  @Field()
  authname: string;
  
  @Column()
  password: string;
  
  @Column("enum", { enum: AuthType})
  @Field(() => AuthType)
  auth_type: AuthType;

  //* post
  @OneToMany(
    type => Post,
    post => post.auth,
    {
      // cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      // eager: true,
    },
  )
  @JoinColumn({ referencedColumnName: "post_id", name: "post_id"})
  @Field(() => [Post], { nullable: true })
  posts: Post[];
  
  //* comment
  @OneToMany(
    type => Comment,
    comment => comment.auth,
    {
      // cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      // eager: true,
    },
  )
  @JoinColumn({ referencedColumnName: "comment_id", name: "comment_id"})
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
  
  //* rate
  @OneToMany(
    type => Rate,
    rate => rate.auth,
    {
      // cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      // eager: true,
    },
  )
  @JoinColumn({ referencedColumnName: "rate_id", name: "rate_id"})
  @Field(() => [Rate], { nullable: true })
  rates: Rate[];
  
  //* AccessRole
  // // relation with Role
  // @OneToMany(
  //   type => AccessRole,
  //   role => role.auth,
  //   {
  //     cascade: [ 'insert', 'update' ],
  //     onDelete: 'CASCADE',
  //     // eager: true,
  //   },
  // )
  // @JoinColumn({ referencedColumnName: "role_id", name: "role_id"})
  // @Field(() => [AccessRole], { nullable: true })

  // ✅
  // @Column("text", { array: true })
  // @Field(() => [String])
  // roles: AuthType[];

  //* heart
  // @Field(() => [Heart],{ nullable: true })
  @OneToMany(
    type => Heart,
    heart => heart.auth,
  {
      // cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      // eager: true,
  },
  )
  // @JoinColumn({ referencedColumnName: "heart_id", name: "heart_id"})
  hearts: Heart[];
  
  //* relation
  // @Field(() => [Relation],{ nullable: true })
  @OneToMany(
    type => Relation,
    relation => relation.auth,
  {
      // cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      // eager: true,
  },
  )
  // @JoinColumn({ referencedColumnName: "relation_id", name: "relation_id"})
  relations: Relation[];
  
  // ✅
  @Column({
    type: "enum",
    enum: AuthType,
    array: true,
    // default: [AuthType.CUSTOMER]
  })
  @Field(() => [AuthType])
  roles: AuthType[];

  // ❌
  // @Column("enum", { enum: PersonRole})
  //   @Field(() => PersonRole)
  //   person_role: PersonRole;

  @Column()
  salt: string;
  

  async validatePassword(password: string): Promise<boolean> {
    const hashedPass = bcrypt.hashSync(password, this.salt);
    return hashedPass === this.password;
  }

  // relation between Auth and Address
  // @OneToMany(
  //   type => Address,
  //   address => address.auth,
  //   { eager: true },
  // )
  // // variable to access Many_Part from address_category_part
  // @JoinColumn({ name: 'address_id'})
  // @Field(() => [Address])
  // addresses: Address[];

  public static of(rAuth: CreateAuthInput): Auth {
      
    const nAuth = new Auth();

    Object.assign(nAuth, rAuth);

    return nAuth;

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




// @Entity()
// @Unique(['authname']) // say to pg these columns must be unique
// export class Auth extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   auth_id: number;

//   @Column()
//   authname: string;

//   @Column()
//   password: string;

//   @Column()
//   salt: string;

//   // @OneToMany(
//   //   type => Task,
//   //   task => task.auth,
//   //   { eager: true },
//   // )
//   // tasks: Task[];

//   async validatePassword(password: string): Promise<boolean> {
//     const hashedPass = bcrypt.hashSync(password, this.salt);
//     return hashedPass === this.password;
//   }
// }
