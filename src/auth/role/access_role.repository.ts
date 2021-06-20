import { Repository, EntityRepository } from 'typeorm';
import {
  Query,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';
import { AccessRole } from './access_role.entity';
import { CreateAccessRoleInput } from './dto/create.access_role.input';
import { UpdateAccessRoleInput } from './dto/update.access_role.input';

@EntityRepository(AccessRole)
export class AccessRoleRepository extends Repository<AccessRole> {
  private logger = new Logger('AccessRoleRepository');
  

  // ✅ to sign-up role
  // async createAccessRole( rAccessRole: CreateAccessRoleInput ): Promise<AccessRole> {
  async createAccessRole( rAccessRole: CreateAccessRoleInput ): Promise<void> {

    // console.log('AccessRoleRepository rData: ', rAccessRole);

    // const { role_role, rolename, password } = rAccessRole;

    // const salt = bcrypt.genSaltSync(10);
    // const hashedPass = bcrypt.hashSync(password, salt);

    // const nAccessRole = new AccessRole();
    // nAccessRole.rolename = rolename;
    // nAccessRole.salt = salt;
    // nAccessRole.password = hashedPass;
    // // TODO: get role-role from rAccessRole
    // // nAccessRole.role_role = role_role;
    // nAccessRole.role_role = AccessRoleAccessRole.STAFF;
    
    // try {
    //   const gAccessRole = await nAccessRole.save();
    //   console.log('gAccessRole: ', gAccessRole);
    //   return gAccessRole;
    // } catch (error) {
    //   if (error.code === '23505') {
    //     // duplicate entity columnt rolename
    //     throw new ConflictException('AccessRolename already exist in database'); // send "statusCode": 409
    //   } else {
    //     throw new InternalServerErrorException(
    //       'There was a problem when adding role to database',
    //     );
    //   }
    // }
  }

  


  // async updateAccessRole( rAccessRole: UpdateAccessRoleInput ): Promise<AccessRole> {
  async updateAccessRole( rAccessRole: UpdateAccessRoleInput ): Promise<void> {
    // console.log('AccessRoleRepository rData: ', rAccessRole);

    // const nAccessRole = new AccessRole();
    // nAccessRole.role_id = rAccessRole.role_id;
    // nAccessRole.role_role = rAccessRole.role_role;
    // nAccessRole.rolename = rAccessRole.rolename;
    
    // try {
    //   await nAccessRole.save();
    //   const fAccessRole = await AccessRole.findOne(rAccessRole.role_id);
    //   console.log('fAccessRole: ', fAccessRole);
    //   return fAccessRole;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update role: ${JSON.stringify(rAccessRole)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update role',
    //     origin: '@role.repository.ts',
    //     role: rAccessRole,
    //   });
    // }
  }
  
  
  // async getAccessRoleById( rId: number ): Promise<AccessRole> {
  async getAccessRoleById( rId: number ): Promise<void> {
    // console.log('AccessRoleRepository rId: ', rId);

    // try {
    //   const fAccessRole = await AccessRole.findOne(rId);
    //   console.log('fAccessRole: ', fAccessRole);
    //   // const fcTree = await this.manager.getTreeRepository(AccessRole).findTrees();
    //   // console.log('fcTree: ', fcTree);
    //   return fAccessRole;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch role by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch role',
    //     origin: '@role.repository.ts',
    //     role_id: rId,
    //   });
    // }
  }
  
}
