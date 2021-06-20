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
import { CreateAccessRoleInput } from './dto/create.access_role.input';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => AccessRole)  @Field(() => Role, {nullable: true})  
@Field(() => [AccessRole])   @Field(() => [Role], {nullable: true})
`;

@Entity()
@ObjectType()
export class AccessRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int) 
  role_id: number;
  
  @Column()
  @Field()
  role_resource: string; // Video

  @Column()
  @Field()
  role_action: string; // read

  @Column()
  @Field()
  role_possession: string; // any

  // relation with Auth (RECIVER)
  // @ManyToOne(
  //   type => Auth,
  //   auth => auth.roles,
  //   {
  //     // cascade: [ 'insert', 'update' ],
  //     // onDelete: 'CASCADE',
  //     // only one side of relationship could be eager
  //     eager: false,
  //   },
  // ) 
  // @JoinColumn({ name: 'auth_id'})
  // auth?: Auth;
  // @Column({ nullable: true })
  // auth_id?: number;

  public static of(rAccessRole: CreateAccessRoleInput): AccessRole {
      
    const nAccessRole = new AccessRole();

    Object.assign(nAccessRole, rAccessRole);

    return nAccessRole;

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
// @Unique(['rolename']) // say to pg these columns must be unique
// export class AccessRole extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   role_id: number;

//   @Column()
//   rolename: string;

//   @Column()
//   password: string;

//   @Column()
//   salt: string;

//   // @OneToMany(
//   //   type => Task,
//   //   task => task.role,
//   //   { eager: true },
//   // )
//   // tasks: Task[];

//   async validatePassword(password: string): Promise<boolean> {
//     const hashedPass = bcrypt.hashSync(password, this.salt);
//     return hashedPass === this.password;
//   }
// }
