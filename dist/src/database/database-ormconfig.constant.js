"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_entity_1 = require("../chat/models/client/client.entity");
const message_entity_1 = require("../chat/models/message/message.entity");
const msg_audio_entity_1 = require("../chat/models/message/msg_audio.entity");
const msg_video_entity_1 = require("../chat/models/message/msg_video.entity");
const msg_photo_entity_1 = require("../chat/models/message/msg_photo.entity");
const msg_sticker_entity_1 = require("../chat/models/message/msg_sticker.entity");
const client_subscriber_entity_1 = require("../chat/models/client/client_subscriber.entity");
const room_entity_1 = require("../chat/models/room/room.entity");
const room_client_entity_1 = require("../chat/models/room_client/room_client.entity");
const tag_entity_1 = require("../kasabe/models/tag/tag.entity");
const supplier_entity_1 = require("../kasabe/models/supplier/supplier.entity");
const shipper_entity_1 = require("../kasabe/models/shipper/shipper.entity");
const product_category_entity_1 = require("../kasabe/models/product_category/product_category.entity");
const product_entity_1 = require("../kasabe/models/product/product.entity");
const person_entity_1 = require("../kasabe/models/person/person.entity");
const address_entity_1 = require("../kasabe/models/address/address.entity");
const customer_entity_1 = require("../kasabe/models/customer/customer.entity");
const order_entity_1 = require("../kasabe/models/order/order.entity");
const order_details_entity_1 = require("../kasabe/models/order_details/order_details.entity");
const item_entity_1 = require("../mitems/item.entity");
const auth_entity_1 = require("../auth/auth/auth.entity");
const kasabe_1 = require("../kasabe");
const relation_entity_1 = require("../kasabe/models/relation/relation.entity");
const seen_entity_1 = require("../kasabe/models/seen/seen.entity");
function getOrmConfig() {
    let OrmConfig;
    if (process.env.NODE_ENV === 'dev') {
        OrmConfig = {
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'rootpass',
            database: 'chat',
            entities: [__dirname + '/../**/*.entity.{js, ts}'],
            synchronize: true,
            keepConnectionAlive: true,
        };
    }
    else if (process.env.NODE_ENV === 'test') {
        OrmConfig = {
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'rootpass',
            database: 'chat-test',
            entities: [
                client_entity_1.Client, room_entity_1.Room, room_client_entity_1.RoomClient, message_entity_1.Message, msg_audio_entity_1.MsgAudio, msg_video_entity_1.MsgVideo, msg_photo_entity_1.MsgPhoto, msg_sticker_entity_1.MsgSticker, client_subscriber_entity_1.ClientSubscriber,
                tag_entity_1.Tag, supplier_entity_1.Supplier, shipper_entity_1.Shipper, product_category_entity_1.ProductCategory, product_entity_1.Product, person_entity_1.Person, order_entity_1.Order, order_details_entity_1.OrderDetails, customer_entity_1.Customer, address_entity_1.Address,
                item_entity_1.Item,
                auth_entity_1.Auth,
                kasabe_1.Merchant, kasabe_1.MerchantCategory, kasabe_1.Post, kasabe_1.Heart, kasabe_1.Article, kasabe_1.Comment, kasabe_1.Rate, relation_entity_1.Relation, seen_entity_1.Seen,
            ],
            synchronize: true,
            keepConnectionAlive: true,
        };
    }
    return OrmConfig;
}
exports.getOrmConfig = getOrmConfig;
//# sourceMappingURL=database-ormconfig.constant.js.map