"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_service_1 = require("../chat/chat.service");
const message_repository_1 = require("../chat/models/message/message.repository");
const client_repository_1 = require("../chat/models/client/client.repository");
const room_repository_1 = require("../chat/models/room/room.repository");
const room_client_repository_1 = require("../chat/models/room_client/room_client.repository");
const address_repository_1 = require("./models/address/address.repository");
const customer_repository_1 = require("./models/customer/customer.repository");
const order_repository_1 = require("./models/order/order.repository");
const person_repository_1 = require("./models/person/person.repository");
const product_category_repository_1 = require("./models/product_category/product_category.repository");
const product_repository_1 = require("./models/product/product.repository");
const shipper_repository_1 = require("./models/shipper/shipper.repository");
const supplier_repository_1 = require("./models/supplier/supplier.repository");
const tag_repository_1 = require("./models/tag/tag.repository");
describe('kasabe.service.spec.ts c1', () => {
    let app;
    let chatService;
    let messageRepository;
    beforeEach(async () => {
        class ClientRepositoryFake {
            async clientCreate() { }
            async clientUpdate() { }
            async clientGetById() { }
            async clientsGetByRoomId() { }
        }
        class MessageRepositoryFake {
            async messageCreate() { }
            async messageGetById() { }
        }
        class RoomClientRepositoryFake {
            async room_clientCreate() { }
            async room_clientCreateSample() { }
            async room_clientUpdate() { }
            async clientsGetByRoomId() { }
            async room_clientsGetByClientId() { }
            async clientLeftRoom() { }
            async room_clientGetById() { }
        }
        class RoomRepositoryFake {
            async roomCreate() { }
            async roomCreateSample() { }
            async roomUpdate() { }
            async roomGetById() { }
            async clientsGetByRoomId() { }
            async roomsGetByClientId() { }
        }
        class AddressRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class CustomerRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class OrderRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class PersonRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class ProductCategoryRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class ProductRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class ShipperRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class SupplierRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        class TagRepositoryFake {
            async build() { }
            async rebuild() { }
            async fetchById() { }
        }
        const module = await testing_1.Test.createTestingModule({
            imports: [],
            providers: [
                chat_service_1.ChatService,
                {
                    provide: client_repository_1.ClientRepository,
                    useClass: ClientRepositoryFake,
                },
                {
                    provide: room_repository_1.RoomRepository,
                    useClass: RoomRepositoryFake,
                },
                {
                    provide: room_client_repository_1.RoomClientRepository,
                    useClass: RoomClientRepositoryFake,
                },
                {
                    provide: message_repository_1.MessageRepository,
                    useClass: MessageRepositoryFake,
                },
                {
                    provide: address_repository_1.AddressRepository,
                    useClass: AddressRepositoryFake,
                },
                {
                    provide: customer_repository_1.CustomerRepository,
                    useClass: CustomerRepositoryFake,
                },
                {
                    provide: order_repository_1.OrderRepository,
                    useClass: OrderRepositoryFake,
                },
                {
                    provide: person_repository_1.PersonRepository,
                    useClass: PersonRepositoryFake,
                },
                {
                    provide: product_category_repository_1.ProductCategoryRepository,
                    useClass: ProductCategoryRepositoryFake,
                },
                {
                    provide: product_repository_1.ProductRepository,
                    useClass: ProductRepositoryFake,
                },
                {
                    provide: shipper_repository_1.ShipperRepository,
                    useClass: ShipperRepositoryFake,
                },
                {
                    provide: supplier_repository_1.SupplierRepository,
                    useClass: SupplierRepositoryFake,
                },
                {
                    provide: tag_repository_1.TagRepository,
                    useClass: TagRepositoryFake,
                },
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        chatService = app.get(chat_service_1.ChatService);
        messageRepository = app.get(message_repository_1.MessageRepository);
    });
});
//# sourceMappingURL=kasabe.service.spe.js.map