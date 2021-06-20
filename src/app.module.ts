import { Module, MiddlewareConsumer, RequestMethod, Get } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { RealtimeModule } from './realtime/realtime.module';
import { DatabaseModule } from './database';
// import { EcommerceModule } from './ecommerce/ecommerce.module';
import { ItemsModule } from './items/items.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/auth.roles';
import { FileModule } from './file/file.module';
import { KasabeModule } from './kasabe/kasabe.module';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    // TypeOrmModule.forRoot(postgresqlConfig), // connect to database
    GraphQLModule.forRoot(
      // dev
      // {
      //   debug: true,
      //   playground: true,
      //   typePaths: ['**/*.graphql'],
      //   definitions: {
      //     path: join(process.cwd(), 'src/graphql.ts'),
      //   },
      //   installSubscriptionHandlers: true,
      //   subscriptions: {
      //     keepAlive: 5000,
      //   }
      // },

      // test
      {
        autoSchemaFile: 'schema.gql',
      },
    ),
    DatabaseModule,
    AuthModule,
    ChatModule,
    // EcommerceModule,
    RealtimeModule,
    ItemsModule,
    FileModule,
    KasabeModule,

  ],
  controllers: [],
  providers: [
    // ChatGateway,
  ],
})
export class AppModule {

  // Malik
  constructor(private readonly connection: Connection ) {
    // tslint:disable-next-line: no-console
    // console.log('connection status: ', connection.isConnected);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({
    //     path: 'products',
    //     method: RequestMethod.GET,
    //   })
    //   .forRoutes(ProductsController);
  }
}
