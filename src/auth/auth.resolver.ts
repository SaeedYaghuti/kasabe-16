import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Auth } from './auth/auth.entity';
import { AuthService } from './auth.service';
import { MessageType } from '../util/type/message.type';
import { CreateAuthInput } from './auth/dto/create.auth.input';
import { UpdateAuthInput } from './auth/dto/update.auth.input';
import { LoginAuthInput } from './auth/dto/login_auth.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guard/gql_auth.guard';
import { CurrentAuth } from './decorator/current_auth.decorator';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { GqlACGuard } from './guard/acguard.guard';
import { GqlAuthRoles } from './decorator/auth_roles.decorator';
import { LoginToken } from './role/dto/login_token.type';


@Resolver('Auth')
export class AuthResolver {
    
    constructor(
        private authService: AuthService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async authTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('authTestQuery is running...');
        return await this.authService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async authTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.authService.testQuery(message);
    }

    @Query(() => MessageType)
    async testGuardQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('testGuardQuery is running...');
        return await this.authService.testQuery(message);
    }
    
    @Query(() => Auth)
    @UseGuards(GqlAuthGuard)
    async whoAmI(@CurrentAuth() auth: Auth ): Promise<Auth> {
        console.log("<auth.resolver| whoAmI| auth", auth);
        // return await this.authService.fetchById(auth.auth_id);
        return auth;
    }
    
    @Query(() => Auth)
    @Roles('admin')
    @UseGuards(GqlAuthGuard, RolesGuard)
    async testAC(@CurrentAuth() auth: Auth ): Promise<Auth> {
        console.log("<auth.resolver| testAC| auth>", auth);
        // return await this.authService.fetchById(auth.auth_id);
        return auth;
    }
    
    @Query(() => String)
    @UseGuards(GqlAuthGuard, GqlACGuard)
    @UseRoles({
        resource: 'video',
        action: 'read',
        possession: 'any',
    })
    async testRBAC(@GqlAuthRoles() authRoles: any ): Promise<string> {
    // async testRBAC(@CurrentAuth() auth: Auth): Promise<string> {
        console.log("<auth.resolver| testRBAC| authRoles>", authRoles);
        // return await this.authService.fetchById(auth.auth_id);
        return "testRBAC";
    }

    //#endregion

    //#region  Auth

    @Mutation(() => Auth)
    async build( @Args('auth') auth: CreateAuthInput ): Promise<Auth> {
        console.log('mutation build() is running...');
        return await this.authService.build(auth);
    }


    @Query(() => LoginToken)
    async loginAuth( @Args('loginAuthInput') loginAuthInput: LoginAuthInput ): Promise<LoginToken> {
        console.log('mutation loginAuth() is running...');
        return await this.authService.loginAuth(loginAuthInput);
    }

    // ❓ not checked
    // @Mutation(() => Auth)
    // async rebuild( @Args('auth') auth: UpdateAuthInput ): Promise<Auth> {
    //     console.log('mutation rebuild() is running...');
    //     return await this.authService.rebuild(auth);
    // }
    // ❓ not checked
    // @Query(() => Auth)
    // async fetchById (@Args('auth_id') rId: number): Promise<Auth> {
    //     return await this.authService.fetchById(rId);
    // }

    //#endregion

}
