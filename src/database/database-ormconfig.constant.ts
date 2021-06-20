import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Client } from '../chat/models/client/client.entity';
import { Message } from '../chat/models/message/message.entity';
import { MsgAudio } from '../chat/models/message/msg_audio.entity';
import { MsgVideo } from '../chat/models/message/msg_video.entity';
import { MsgPhoto } from '../chat/models/message/msg_photo.entity';
import { MsgSticker } from '../chat/models/message/msg_sticker.entity';
import { ClientSubscriber } from '../chat/models/client/client_subscriber.entity';
import { Room } from '../chat/models/room/room.entity';
import { RoomClient } from '../chat/models/room_client/room_client.entity';

import { Tag } from '../kasabe/models/tag/tag.entity';
import { Supplier } from '../kasabe/models/supplier/supplier.entity';
import { Shipper } from '../kasabe/models/shipper/shipper.entity';
import { ProductCategory } from '../kasabe/models/product_category/product_category.entity';
import { Product } from '../kasabe/models/product/product.entity';
import { Person } from '../kasabe/models/person/person.entity';
import { Address } from '../kasabe/models/address/address.entity';
import { Customer } from '../kasabe/models/customer/customer.entity';
import { Order } from '../kasabe/models/order/order.entity';
import { OrderDetails } from '../kasabe/models/order_details/order_details.entity';
// import { Item } from 'src/mitems/item.entity';
import { Item } from '../mitems/item.entity';
import { Auth } from '../auth/auth/auth.entity';
import { Merchant, MerchantCategory, Post, Heart, Article, Comment, Rate  } from '../kasabe';
import { Relation } from '../kasabe/models/relation/relation.entity';
import { Seen } from '../kasabe/models/seen/seen.entity';

export function getOrmConfig() {
    let OrmConfig: TypeOrmModuleOptions;
    
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
    } else if (process.env.NODE_ENV === 'test') {
        OrmConfig = {
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'rootpass',
            database: 'chat-test',
            entities: [
                Client, Room, RoomClient,Message, MsgAudio, MsgVideo, MsgPhoto, MsgSticker, ClientSubscriber,
                Tag, Supplier, Shipper, ProductCategory, Product, Person, Order, OrderDetails, Customer, Address,
                Item,
                Auth,
                Merchant,MerchantCategory,Post,Heart,Article,Comment,Rate,Relation,Seen,
            ],
            // entities: [__dirname + '/../**/*.entity.{js, ts}'],
            // entities: ['src/**/*.entity.{js, ts}'],
            synchronize: true,
            keepConnectionAlive: true,
        };
    }
    // console.table(OrmConfig);
    return OrmConfig;
}

// const settings = {
//     host: process.env.POSTGRES_HOST,
//     port: parseInt(process.env.POSTGRES_PORT, 10),
//     authname: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,
// };
