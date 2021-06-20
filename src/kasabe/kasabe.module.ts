import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from '../auth/auth.module';
import { PubSub } from 'graphql-subscriptions';
import { RealtimeModule } from '../realtime/realtime.module';
import { ProductRepository } from './models/product/product.repository';
import { AddressRepository } from './models/address/address.repository';
import { CustomerRepository } from './models/customer/customer.repository';
import { OrderRepository } from './models/order/order.repository';
import { PersonRepository } from './models/person/person.repository';
import { ProductCategoryRepository } from './models/product_category/product_category.repository';
import { ShipperRepository } from './models/shipper/shipper.repository';
import { SupplierRepository } from './models/supplier/supplier.repository';
import { TagRepository } from './models/tag/tag.repository';
import { KasabeService } from './kasabe.service';
// import { KasabeResolver } from './ecommerce.resolver';
import { TagService } from './models/tag/tag.service';
// import { TagResolver } from './models/tag/tag.resolve';
import { SupplierService } from './models/supplier/supplier.service';
// import { SupplierResolver } from './models/supplier/supplier.resolver';
import { ShipperService } from './models/shipper/shipper.service';
// import { ShipperResolver } from './models/shipper/shipper.resolver';
import { ProductCategoryService } from './models/product_category/product_category.service';
// import { ProductCategoryResolver } from './models/product_category/product_category.resolver';
import { ProductService } from './models/product/product.service';
// import { ProductResolver } from './models/product/product.resolver';
import { PersonService } from './models/person/person.service';
// import { PersonResolver } from './models/person/person.resolver';
import { OrderService } from './models/order/order.service';
// import { OrderResolver } from './models/order/order.resolver';
import { CustomerService } from './models/customer/customer.service';
// import { CustomerResolver } from './models/customer/customer.resolver';
import { AddressService } from './models/address/address.service';
import { GraphQLModule } from '@nestjs/graphql';
import { KasabeResolver } from './kasabe.resolver';
import { AuthModule } from '../auth/auth.module';
import { ArticleRepository } from './models/article/article.repository';
// import { AddressResolver } from './models/address/address.resolver';
import { CommentRepository } from './models/comment/comment.repository';
import { HeartRepository } from './models/heart/heart.repository';
import { MerchantRepository } from './models/merchant/merchant.repository';
import { MerchantCategoryRepository } from './models/merchant_category/merchant_category.repository';
import { PostRepository } from './models/post/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature( [
      ProductRepository,
      ProductCategoryRepository,
      PersonRepository,
      AddressRepository,
      TagRepository,
      CustomerRepository,
      ShipperRepository,
      SupplierRepository,
      OrderRepository,
      
      ArticleRepository,
      CommentRepository,
      HeartRepository,
      MerchantRepository,
      MerchantCategoryRepository,
      PostRepository,
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    AuthModule,
    RealtimeModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    
    // TagService,
    // TagResolver,
    
    // SupplierService,
    // SupplierResolver,
    
    // ShipperService,
    // ShipperResolver,
    
    // ProductCategoryService,
    // ProductCategoryResolver,
    
    // ProductService,
    // ProductResolver,
    
    // PersonService,
    // PersonResolver,
    
    // OrderService,
    // OrderResolver,
    
    // CustomerService,
    // CustomerResolver,
    
    // AddressService,
    // AddressResolver,

    KasabeService, 
    KasabeResolver,
  ]
})
export class KasabeModule {}

