import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import faker from 'faker';
import { KasabeService } from './kasabe.service';
import { ChatService } from '../chat/chat.service';
import { MessageRepository } from '../chat/models/message/message.repository';
import { ClientRepository } from '../chat/models/client/client.repository';
import { RoomRepository } from '../chat/models/room/room.repository';
import { RoomClientRepository } from '../chat/models/room_client/room_client.repository';
import { AddressRepository } from './models/address/address.repository';
import { CustomerRepository } from './models/customer/customer.repository';
import { OrderRepository } from './models/order/order.repository';
import { PersonRepository } from './models/person/person.repository';
import { ProductCategoryRepository } from './models/product_category/product_category.repository';
import { ProductRepository } from './models/product/product.repository';
import { ShipperRepository } from './models/shipper/shipper.repository';
import { SupplierRepository } from './models/supplier/supplier.repository';
import { TagRepository } from './models/tag/tag.repository';

describe('kasabe.service.spec.ts c1', () => {
  let app: INestApplication;
  
  let chatService: ChatService;
  let messageRepository: MessageRepository;

  beforeEach(async () => {
    //#region  Fake Repository
    class ClientRepositoryFake {
      public async clientCreate(): Promise<void> {}
      public async clientUpdate(): Promise<void> {}
      public async clientGetById(): Promise<void> {}
      public async clientsGetByRoomId(): Promise<void> {}
    }
    class MessageRepositoryFake {
      public async messageCreate(): Promise<void> {}
      public async messageGetById(): Promise<void> {}
    }
    class RoomClientRepositoryFake {
      public async room_clientCreate(): Promise<void> {}
      public async room_clientCreateSample(): Promise<void> {}
      public async room_clientUpdate(): Promise<void> {}
      public async clientsGetByRoomId(): Promise<void> {}
      public async room_clientsGetByClientId(): Promise<void> {}
      public async clientLeftRoom(): Promise<void> {}
      public async room_clientGetById(): Promise<void> {}
    }
    class RoomRepositoryFake {
      public async roomCreate(): Promise<void> {}
      public async roomCreateSample(): Promise<void> {}
      public async roomUpdate(): Promise<void> {}
      public async roomGetById(): Promise<void> {}
      public async clientsGetByRoomId(): Promise<void> {}
      public async roomsGetByClientId(): Promise<void> {}
    }
    class AddressRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class CustomerRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class OrderRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class PersonRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class ProductCategoryRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class ProductRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class ShipperRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class SupplierRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    class TagRepositoryFake {
      public async build(): Promise<void> {}
      public async rebuild(): Promise<void> {}
      public async fetchById(): Promise<void> {}
    }
    //#endregion

    const module: TestingModule = await Test.createTestingModule({
      imports: [ ],
      providers: [
        ChatService,
        {
          provide: ClientRepository,
          useClass: ClientRepositoryFake,
        },
        {
          provide: RoomRepository,
          useClass: RoomRepositoryFake,
        },
        {
          provide: RoomClientRepository,
          useClass: RoomClientRepositoryFake,
        },
        {
          provide: MessageRepository,
          useClass: MessageRepositoryFake,
        },
        {
          provide: AddressRepository,
          useClass: AddressRepositoryFake,
        },
        {
          provide: CustomerRepository,
          useClass: CustomerRepositoryFake,
        },
        {
          provide: OrderRepository,
          useClass: OrderRepositoryFake,
        },
        {
          provide: PersonRepository,
          useClass: PersonRepositoryFake,
        },
        {
          provide: ProductCategoryRepository,
          useClass: ProductCategoryRepositoryFake,
        },
        {
          provide: ProductRepository,
          useClass: ProductRepositoryFake,
        },
        {
          provide: ShipperRepository,
          useClass: ShipperRepositoryFake,
        },
        {
          provide: SupplierRepository,
          useClass: SupplierRepositoryFake,
        },
        {
          provide: TagRepository,
          useClass: TagRepositoryFake,
        },
      ]

    })
    .compile();

    app = module.createNestApplication();
    await app.init();

    chatService = app.get<ChatService>(ChatService);
    messageRepository = app.get<MessageRepository>(MessageRepository);
  });
  
});
