"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./models/product/product.repository");
const address_repository_1 = require("./models/address/address.repository");
const customer_repository_1 = require("./models/customer/customer.repository");
const order_repository_1 = require("./models/order/order.repository");
const person_repository_1 = require("./models/person/person.repository");
const product_category_repository_1 = require("./models/product_category/product_category.repository");
const shipper_repository_1 = require("./models/shipper/shipper.repository");
const supplier_repository_1 = require("./models/supplier/supplier.repository");
const tag_repository_1 = require("./models/tag/tag.repository");
const kasabe_service_1 = require("./kasabe.service");
const tag_service_1 = require("./models/tag/tag.service");
const supplier_service_1 = require("./models/supplier/supplier.service");
const shipper_service_1 = require("./models/shipper/shipper.service");
const product_category_service_1 = require("./models/product_category/product_category.service");
const product_service_1 = require("./models/product/product.service");
const person_service_1 = require("./models/person/person.service");
const order_service_1 = require("./models/order/order.service");
const customer_service_1 = require("./models/customer/customer.service");
const address_service_1 = require("./models/address/address.service");
const graphql_1 = require("@nestjs/graphql");
const kasabe_resolver_1 = require("./kasabe.resolver");
const database_module_1 = require("../database/database.module");
const address_resolver_1 = require("./models/address/address.resolver");
const customer_resolver_1 = require("./models/customer/customer.resolver");
const order_resolver_1 = require("./models/order/order.resolver");
const person_resolver_1 = require("./models/person/person.resolver");
const product_resolver_1 = require("./models/product/product.resolver");
const product_category_resolver_1 = require("./models/product_category/product_category.resolver");
const shipper_resolver_1 = require("./models/shipper/shipper.resolver");
const supplier_resolver_1 = require("./models/supplier/supplier.resolver");
const tag_resolver_1 = require("./models/tag/tag.resolver");
const database_service_1 = require("../database/database.service");
const test_utils_1 = require("../test/test.utils");
let KasabeTestModule = class KasabeTestModule {
};
KasabeTestModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                buildSchemaOptions: { dateScalarMode: "timestamp" },
            }),
        ],
        providers: [
            database_service_1.DatabaseService,
            test_utils_1.TestUtils,
            tag_repository_1.TagRepository,
            tag_service_1.TagService,
            tag_resolver_1.TagResolver,
            supplier_repository_1.SupplierRepository,
            supplier_service_1.SupplierService,
            supplier_resolver_1.SupplierResolver,
            shipper_repository_1.ShipperRepository,
            shipper_service_1.ShipperService,
            shipper_resolver_1.ShipperResolver,
            product_category_repository_1.ProductCategoryRepository,
            product_category_service_1.ProductCategoryService,
            product_category_resolver_1.ProductCategoryResolver,
            product_repository_1.ProductRepository,
            product_service_1.ProductService,
            product_resolver_1.ProductResolver,
            person_repository_1.PersonRepository,
            person_service_1.PersonService,
            person_resolver_1.PersonResolver,
            order_repository_1.OrderRepository,
            order_service_1.OrderService,
            order_resolver_1.OrderResolver,
            customer_repository_1.CustomerRepository,
            customer_service_1.CustomerService,
            customer_resolver_1.CustomerResolver,
            address_repository_1.AddressRepository,
            address_service_1.AddressService,
            address_resolver_1.AddressResolver,
            kasabe_service_1.KasabeService,
            kasabe_resolver_1.KasabeResolver,
        ]
    })
], KasabeTestModule);
exports.KasabeTestModule = KasabeTestModule;
//# sourceMappingURL=kasabe_test.module.js.map