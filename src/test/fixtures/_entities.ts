import { SampleClientDtos } from './chat/sample_client.dto';
import { SampleRoomDtos } from './chat/sample_room.dto';
import { SampleRoomClientDtos } from './chat/sample_room_client.dto';
import { BaseEntity, Repository } from 'typeorm';
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
import { SupplierSampleInputs } from './kasabe/supplier/supplier.sample.input';
import { CreateShipperInputs } from './kasabe/shipper/build.shipper.inputs';
import { CreateProductCategoryInputs } from './kasabe/product_category/create.product_category.inputs';
import { Auth } from '../../auth/auth/auth.entity';
import { Merchant } from '../../kasabe/models/merchant/merchant.entity';
import { MerchantCategory } from '../../kasabe/models/merchant_category/merchant_category.entity';
import { Post } from '../../kasabe/models/post/post.entity';
import { Heart } from '../../kasabe/models/heart/heart.entity';
import { TagEntities } from './kasabe/tag/tag.entities';
import { AuthEntities } from './auth/auth.entities';
import { MerchantCategoryEntities } from './kasabe/merchant_category/merchant_category.entities';
import { MerchantEntities } from './kasabe/merchant/merchant.entities';
import { PostEntities } from './kasabe/post/post.entities';
import { HeartEntities } from './kasabe/heart/heart.entities';
import { Article } from '../../kasabe/models/article/article.entity';
import { ArticleEntities } from './kasabe/article/article.entities';
import { Order } from '../../kasabe/models/order/order.entity';
import { Comment } from '../../kasabe/models/comment/comment.entity';
import { Rate } from '../../kasabe/models/rate/rate.entity';
import { CommentEntities } from './kasabe/comment/comment.entities';
import { RateEntities } from './kasabe/rate/rate.entities';
import { SampleClientEntities } from './chat/sample_client.entities';
import { SampleMessageEntities } from './chat/sample_message.entities';
import { SampleRoomEntities } from './chat/sample_room.entities';
import { SampleRoomClientEntities } from './chat/sample_room_client.entities';
import { BuildAuthInputs } from './auth/build.auth.inputs';
import { BuildArticleInputs } from './kasabe/article/build.article.inputs';
import { BuildCommentInputs } from './kasabe/comment/build.comment.inputs';
import { BuildHeartInputs } from './kasabe/heart/build.heart.inputs';
import { BuildMerchantInputs } from './kasabe/merchant/build.merchant.inputs';
import { BuildMerchantCategoryInputs } from './kasabe/merchant_category/build.merchant_category.inputs';
import { BuildPostInputs } from './kasabe/post/build.post.inputs';
import { BuildRateInputs } from './kasabe/rate/build.rate.inputs';
import { BuildTagInputs } from './kasabe/tag/build.tag.inputs';
import { TagRepository } from '../../kasabe/models/tag/tag.repository';
import { AuthRepository } from '../../auth/auth/auth.repository';
import { ArticleRepository } from '../../kasabe/models/article/article.repository';
import { MerchantCategoryRepository } from '../../kasabe/models/merchant_category/merchant_category.repository';
import { MerchantRepository } from '../../kasabe/models/merchant/merchant.repository';
import { PostRepository } from '../../kasabe/models/post/post.repository';
import { CommentRepository } from '../../kasabe/models/comment/comment.repository';
import { RateRepository } from '../../kasabe/models/rate/rate.repository';
import { HeartRepository } from '../../kasabe/models/heart/heart.repository';
import { Relation } from '../../kasabe/models/relation/relation.entity';
import { RelationRepository } from '../../kasabe/models/relation/relation.repository';
import { Seen } from '../../kasabe/models/seen';
import { SeenRepository } from '../../kasabe/models/seen/seen.repository';
import { SeenEntities } from './kasabe/seen/seen.entities';
import { BuildSeenInputs } from './kasabe/seen/build.seen.inputs';
import { RelationEntities } from './kasabe/relation/relation.entities';
import { BuildRelationInputs } from './kasabe/relation/build.relation.inputs';

export interface Iof<T extends BaseEntity>{
    // of:Function;
    of(args: any): T| T[];
}
export interface IEntityMetadata {
    entityName: string, 
    tableName: string,
    idTitle: string,
}
export interface IEntitySeed0<T extends BaseEntity> {
    entity: Iof<T>,
    items: any, 
    entityMetaData: IEntityMetadata
}

//* for chat and ecommerce
export interface IEntitySeed<T extends BaseEntity> {
    entity: any,
    samples: Partial<T> [], 
    entityMetaData: IEntityMetadata
}

//* for kasabe
export interface ISeed<T extends BaseEntity> {
    entity: any,
    customRepository?: any, 
    inputs: {
        basic: Partial<T> [],
        custom: any[],
        service: any[],
    }, 
    entityMetaData: IEntityMetadata
}
// Two importants: Order of entity, and Items
export const Seed: ISeed<Client|Room|RoomClient|Message|Tag|Supplier|Shipper|ProductCategory|Product|Person|Order|Customer|Address|Auth|Heart|Merchant|MerchantCategory|Post|Article|Comment|Rate|Relation|Seen >[] = [
    //* kasabe
    { 
        entity: Auth, 
        customRepository: AuthRepository,
        inputs: { basic: AuthEntities, custom: BuildAuthInputs, service: []}, 
        entityMetaData: { entityName: "Auth", tableName: "auth", idTitle: "auth_id"}  
    },
    { 
        entity: Tag, 
        customRepository: TagRepository,
        inputs: { basic: TagEntities, custom: BuildTagInputs, service: []}, 
        entityMetaData: { entityName: "Tag", tableName: "tag", idTitle: "tag_id"}  
    },
    { // article, Article
        entity: Article, 
        customRepository: ArticleRepository, 
        inputs: { basic: ArticleEntities, custom: BuildArticleInputs, service: []}, 
        entityMetaData: { entityName: "Article", tableName: "article", idTitle: "article_id"}  
    },
    { // merchant_category, MerchantCategory
        entity: MerchantCategory,
        customRepository: MerchantCategoryRepository,
        inputs: { basic: MerchantCategoryEntities, custom: BuildMerchantCategoryInputs, service: []}, 
        entityMetaData: { entityName: "MerchantCategory", tableName: "merchant_category", idTitle: "id"}  
    },
    { // merchant, Merchant
        entity: Merchant, 
        customRepository: MerchantRepository,
        inputs: { basic: MerchantEntities, custom: BuildMerchantInputs, service: []}, 
        entityMetaData: { entityName: "Merchant", tableName: "merchant", idTitle: "merchant_id"}  
    },
    { // relation, Relation
        entity: Relation, 
        customRepository: RelationRepository,
        inputs: { basic: RelationEntities, custom: BuildRelationInputs, service: []}, 
        entityMetaData: { entityName: "Relation", tableName: "relation", idTitle: "relation_id"}  
    },
    { // post, Post
        entity: Post, 
        customRepository: PostRepository,
        inputs: { basic: PostEntities, custom: BuildPostInputs, service: []}, 
        entityMetaData: { entityName: "Post", tableName: "post", idTitle: "post_id"}  
    },
    { // comment, Comment
        entity: Comment,
        customRepository: CommentRepository, 
        inputs: { basic: CommentEntities, custom: BuildCommentInputs, service: []}, 
        entityMetaData: { entityName: "Comment", tableName: "comment", idTitle: "comment_id"}  
    },
    { // Heart, heart
        entity: Heart, 
        customRepository: HeartRepository,
        inputs: { basic: HeartEntities, custom: BuildHeartInputs, service: []}, 
        entityMetaData: { entityName: "Heart", tableName: "heart", idTitle: "heart_id"}  
    },
    { // Rate, rate
        entity: Rate,
        customRepository: RateRepository, 
        inputs: { basic: RateEntities, custom: BuildRateInputs, service: []}, 
        entityMetaData: { entityName: "Rate", tableName: "rate", idTitle: "rate_id"}  
    },
    { // Seen, seen
        entity: Seen,
        customRepository: SeenRepository, 
        inputs: { basic: SeenEntities, custom: BuildSeenInputs, service: []}, 
        entityMetaData: { entityName: "Seen", tableName: "seen", idTitle: "seen_id"}  
    },
];

//* for chat and ecommerce
export const EntitiesSeed: IEntitySeed<Client|Room|RoomClient|Message|Tag|Supplier|Shipper|ProductCategory|Product|Person|Order|Customer|Address|Auth|Heart|Merchant|MerchantCategory|Post|Article|Comment|Rate >[] = [
    //* chat
    // { entity: Client, samples: SampleClientEntities, entityMetaData: { entityName: "Client", tableName: "client"}  },
    // { entity: Room, samples: SampleRoomEntities, entityMetaData: { entityName: "Room", tableName: "room"}  },
    // { entity: RoomClient, samples: SampleRoomClientEntities, entityMetaData: { entityName: "RoomClient", tableName: "room_client"}  },
    // { entity: Message, samples: SampleMessageEntities, entityMetaData: { entityName: "Message", tableName: "message"}  },
    //* ecommerce
    { entity: Person, samples: [] , entityMetaData: { entityName: "Person", tableName: "person", idTitle: "person_id"}  },
    { entity: Address, samples: [] , entityMetaData: { entityName: "Address", tableName: "address", idTitle: "address_id"}  },
    { entity: Supplier, samples: SupplierSampleInputs , entityMetaData: { entityName: "Supplier", tableName: "supplier", idTitle: "supplier_id"}  },
    { entity: Shipper, samples: CreateShipperInputs , entityMetaData: { entityName: "Shipper", tableName: "shipper", idTitle: "shipper_id"}  },
    { entity: Customer, samples: [] , entityMetaData: { entityName: "Customer", tableName: "customer", idTitle: "customer_id"}  },
    { entity: Product, samples: [] , entityMetaData: { entityName: "Product", tableName: "product", idTitle: "product_id"}  },
    { entity: ProductCategory, samples: CreateProductCategoryInputs , entityMetaData: { entityName: "ProductCategory", tableName: "product_category", idTitle: "id"}  },
    { entity: Order, samples: [] , entityMetaData: { entityName: "Order", tableName: "orders", idTitle: "order_id"}  },
    //* kasabe
    // { entity: Auth, samples: AuthEntities , entityMetaData: { entityName: "Auth", tableName: "auth", idTitle: "auth_id"}  },
    // { entity: Tag, samples: TagEntities , entityMetaData: { entityName: "Tag", tableName: "tag", idTitle: "tag_id"}  },
    // { entity: Article, samples: ArticleEntities , entityMetaData: { entityName: "Article", tableName: "article", idTitle: "article_id"}  },
    // { entity: MerchantCategory, samples: MerchantCategoryEntities , entityMetaData: { entityName: "MerchantCategory", tableName: "merchant_category", idTitle: "id"}  },
    // { entity: Merchant, samples: MerchantEntities , entityMetaData: { entityName: "Merchant", tableName: "merchant", idTitle: "merchant_id"}  },
    // { entity: Post, samples: PostEntities , entityMetaData: { entityName: "Post", tableName: "post", idTitle: "post_id"}  },
    // { entity: Comment, samples: CommentEntities , entityMetaData: { entityName: "Comment", tableName: "comment", idTitle: "comment_id"}  },
    // { entity: Rate, samples: RateEntities , entityMetaData: { entityName: "Rate", tableName: "rate", idTitle: "rate_id"}  },
    // { entity: Heart, samples: HeartEntities , entityMetaData: { entityName: "Heart", tableName: "heart", idTitle: "heart_id"}  },

];