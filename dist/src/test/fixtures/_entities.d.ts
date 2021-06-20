import { BaseEntity } from 'typeorm';
import { Message } from '../../chat/models/message/message.entity';
import { Room } from '../../chat/models/room/room.entity';
import { RoomClient } from '../../chat/models/room_client/room_client.entity';
import { Tag } from '../../kasabe/models/tag/tag.entity';
import { Supplier } from '../../kasabe/models/supplier/supplier.entity';
import { Shipper } from '../../kasabe/models/shipper/shipper.entity';
import { ProductCategory } from '../../kasabe/models/product_category/product_category.entity';
import { Product } from '../../kasabe/models/product/product.entity';
import { Person } from '../../kasabe/models/person/person.entity';
import { Customer } from '../../kasabe/models/customer/customer.entity';
import { Address } from '../../kasabe/models/address/address.entity';
import { Client } from '../../chat/models/client/client.entity';
import { Auth } from '../../auth/auth/auth.entity';
import { Merchant } from '../../kasabe/models/merchant/merchant.entity';
import { MerchantCategory } from '../../kasabe/models/merchant_category/merchant_category.entity';
import { Post } from '../../kasabe/models/post/post.entity';
import { Heart } from '../../kasabe/models/heart/heart.entity';
import { Article } from '../../kasabe/models/article/article.entity';
import { Order } from '../../kasabe/models/order/order.entity';
import { Comment } from '../../kasabe/models/comment/comment.entity';
import { Rate } from '../../kasabe/models/rate/rate.entity';
import { Relation } from '../../kasabe/models/relation/relation.entity';
import { Seen } from '../../kasabe/models/seen';
export interface Iof<T extends BaseEntity> {
    of(args: any): T | T[];
}
export interface IEntityMetadata {
    entityName: string;
    tableName: string;
    idTitle: string;
}
export interface IEntitySeed0<T extends BaseEntity> {
    entity: Iof<T>;
    items: any;
    entityMetaData: IEntityMetadata;
}
export interface IEntitySeed<T extends BaseEntity> {
    entity: any;
    samples: Partial<T>[];
    entityMetaData: IEntityMetadata;
}
export interface ISeed<T extends BaseEntity> {
    entity: any;
    customRepository?: any;
    inputs: {
        basic: Partial<T>[];
        custom: any[];
        service: any[];
    };
    entityMetaData: IEntityMetadata;
}
export declare const Seed: ISeed<Client | Room | RoomClient | Message | Tag | Supplier | Shipper | ProductCategory | Product | Person | Order | Customer | Address | Auth | Heart | Merchant | MerchantCategory | Post | Article | Comment | Rate | Relation | Seen>[];
export declare const EntitiesSeed: IEntitySeed<Client | Room | RoomClient | Message | Tag | Supplier | Shipper | ProductCategory | Product | Person | Order | Customer | Address | Auth | Heart | Merchant | MerchantCategory | Post | Article | Comment | Rate>[];
