import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from '../auth/auth.module';
import { PubSub } from 'graphql-subscriptions';
import { ChatGateway } from './chat.gateway';
import { RealtimeModule } from '../realtime/realtime.module';
import { MessageRepository } from './models/message/message.repository';
import { RoomClientRepository } from './models/room_client/room_client.repository';
import { RoomRepository } from './models/room/room.repository';
import { ClientRepository } from './models/client/client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature( [
      RoomClientRepository,
      RoomRepository,
      MessageRepository,
      ClientRepository,
      // ProductRepository,
      // ProductCategoryRepository,
      // PersonRepository,
      // AddressRepository,
      // TagRepository,
      // CustomerRepository,
      // ShipperRepository,
      // SupplierRepository,
      // OrderRepository,
    ]),
    // TODO: return comment to code
    // AuthModule,
    RealtimeModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ChatService, 
    ChatResolver,
    ChatGateway,
  ]
})
export class ChatModule {}

