import { Repository, EntityRepository } from 'typeorm';
import { Auth } from './auth.entity';
import {
  Query,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';
import { CreateAuthInput } from './dto/create.auth.input';
import { UpdateAuthInput } from './dto/update.auth.input';
import { LoginAuthInput } from './dto/login_auth.input';
import { AuthType } from './auth_type.enum';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  private logger = new Logger('AuthRepository');
  

  // ✅ to sign-up auth
  async build( rAuth: CreateAuthInput ): Promise<Auth> {

    console.log('AuthRepository rData: ', rAuth);

    const { auth_type, authname, password } = rAuth;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const nAuth = new Auth();
    nAuth.authname = authname;
    nAuth.salt = salt;
    nAuth.password = hashedPass;
    // TODO: get auth-role from rAuth
    // nAuth.auth_role = auth_role;
    nAuth.auth_type = AuthType.ADMIN;
    nAuth.roles = rAuth.auth_type;
    
    try {
      const gAuth = await nAuth.save();
      console.log('gAuth: ', gAuth);
      return gAuth;
    } catch (error) {
      console.log("<auth.repository| creataeAuth| error>", error);
      if (error.code === '23505') {
        // duplicate entity columnt authname
        throw new ConflictException('Authname already exist in database'); // send "statusCode": 409
      } else {
        throw new InternalServerErrorException(
          'There was a problem when adding auth to database',
        );
      }
    }
  }

  // ✅
  async validateLoginInput( loginAuthInput: LoginAuthInput ): Promise<string> {
    const { authname, password } = loginAuthInput;
    const auth = await Auth.findOne({ authname });

    if (auth && (await auth.validatePassword(password))) {
      return auth.authname;
    } else {
      return null;
    }
  }


  // ❓ not-checked
  async rebuild( rAuth: UpdateAuthInput ): Promise<Auth> {
    console.log('AuthRepository rData: ', rAuth);

    const nAuth = new Auth();
    nAuth.auth_id = rAuth.auth_id;
    nAuth.auth_type = rAuth.auth_role;
    nAuth.authname = rAuth.authname;
    
    try {
      await nAuth.save();
      const fAuth = await Auth.findOne(rAuth.auth_id);
      console.log('fAuth: ', fAuth);
      return fAuth;
    } catch (error) {
      this.logger.error(
        `!> Failed to update auth: ${JSON.stringify(rAuth)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update auth',
        origin: '@auth.repository.ts',
        auth: rAuth,
      });
    }
  }
  
  // ❓ not-checked
  async fetchById( rId: number ): Promise<Auth> {
    console.log('AuthRepository rId: ', rId);

    try {
      const fAuth = await Auth.findOne(rId);
      console.log('fAuth: ', fAuth);
      // const fcTree = await this.manager.getTreeRepository(Auth).findTrees();
      // console.log('fcTree: ', fcTree);
      return fAuth;
    } catch (error) {
      this.logger.error(
        `!> Failed to fetch auth by id: ${JSON.stringify(rId)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to fetch auth',
        origin: '@auth.repository.ts',
        auth_id: rId,
      });
    }
  }
  
  
  // X
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
    const { authname, password } = authCredentialsDto;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const auth = new Auth();
    auth.authname = authname;
    auth.salt = salt;
    auth.password = hashedPass;

    try {
      return await auth.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate entity columnt authname
        throw new ConflictException('Authname already exist in database'); // send "statusCode": 409
      } else {
        throw new InternalServerErrorException(
          'There was a problem when adding auth to database',
        );
      }
    }
  }

  // X
  async validateAuthPassword( authCredentialsDto: AuthCredentialsDto ): Promise<string> {
    
    console.log('<validateAuthPassword |authCredentialsDto>', authCredentialsDto);
    
    const { authname, password } = authCredentialsDto;
    const auth = await this.findOne({ authname });
    
    console.log('<validateAuthPassword |auth>', auth);
    
    if (auth && (await auth.validatePassword(password))) {
      return auth.authname;
    } else {
      return null;
    }
  }





  // async getTasks(filterDto: GetTasksFilterDto): Promise<Auth[]> {
  //     const {status, search } = filterDto;
  //     const query = this.createQueryBuilder('auth');
  //     if (status) {
  //         query.andWhere('auth.status = :status', { status });
  //     }

  //     if (search) {
  //         query.andWhere('(auth.title LIKE :search OR auth.description LIKE :search)', { search: `%${search}%`});
  //     }

  //     const auths = await query.getMany();
  //     return auths;
  // }
  // async createTask(createTaskDto: CreateTaskDto): Promise<Auth> {
  //     const {title, description } = createTaskDto;

  //     const auth = new Auth();
  //     auth.title = title;
  //     auth.description = description;
  //     auth.status = authStatus.OPEN;
  //     await auth.save();

  //     return auth;
  // }
}
