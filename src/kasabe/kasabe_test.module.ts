import { Module } from '@nestjs/common';
// import { AuthModule } from '../auth/auth.module';
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
// import { AddressResolver } from './models/address/address.resolver';
import { DatabaseModule } from '../database/database.module';
import { AddressResolver } from './models/address/address.resolver';
import { CustomerResolver } from './models/customer/customer.resolver';
import { OrderResolver } from './models/order/order.resolver';
import { PersonResolver } from './models/person/person.resolver';
import { ProductResolver } from './models/product/product.resolver';
import { ProductCategoryResolver } from './models/product_category/product_category.resolver';
import { ShipperResolver } from './models/shipper/shipper.resolver';
import { SupplierResolver } from './models/supplier/supplier.resolver';
import { TagResolver } from './models/tag/tag.resolver';
import { DatabaseService } from '../database/database.service';
import { TestUtils } from '../test/test.utils';


@Module({
    imports: [ 
        DatabaseModule, 
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            buildSchemaOptions: { dateScalarMode: "timestamp" },
        }), 
    ],
    providers: [
        DatabaseService,
        TestUtils,

        TagRepository, 
        TagService,
        TagResolver,
        
        SupplierRepository, 
        SupplierService,
        SupplierResolver,
        
        ShipperRepository, 
        ShipperService,
        ShipperResolver,
        
        ProductCategoryRepository, 
        ProductCategoryService,
        ProductCategoryResolver,
        
        ProductRepository, 
        ProductService,
        ProductResolver,
        
        PersonRepository, 
        PersonService,
        PersonResolver,
        
        OrderRepository, 
        OrderService,
        OrderResolver,
        
        CustomerRepository, 
        CustomerService,
        CustomerResolver,
        
        AddressRepository, 
        AddressService,
        AddressResolver,

        KasabeService, 
        KasabeResolver,
  ]
        
})
export class KasabeTestModule {}

