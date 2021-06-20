"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const realtime_module_1 = require("../realtime/realtime.module");
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
const graphql_1 = require("@nestjs/graphql");
const kasabe_resolver_1 = require("./kasabe.resolver");
const auth_module_1 = require("../auth/auth.module");
const article_repository_1 = require("./models/article/article.repository");
const comment_repository_1 = require("./models/comment/comment.repository");
const heart_repository_1 = require("./models/heart/heart.repository");
const merchant_repository_1 = require("./models/merchant/merchant.repository");
const merchant_category_repository_1 = require("./models/merchant_category/merchant_category.repository");
const post_repository_1 = require("./models/post/post.repository");
let KasabeModule = class KasabeModule {
};
KasabeModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_repository_1.ProductRepository,
                product_category_repository_1.ProductCategoryRepository,
                person_repository_1.PersonRepository,
                address_repository_1.AddressRepository,
                tag_repository_1.TagRepository,
                customer_repository_1.CustomerRepository,
                shipper_repository_1.ShipperRepository,
                supplier_repository_1.SupplierRepository,
                order_repository_1.OrderRepository,
                article_repository_1.ArticleRepository,
                comment_repository_1.CommentRepository,
                heart_repository_1.HeartRepository,
                merchant_repository_1.MerchantRepository,
                merchant_category_repository_1.MerchantCategoryRepository,
                post_repository_1.PostRepository,
            ]),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql'
            }),
            auth_module_1.AuthModule,
            realtime_module_1.RealtimeModule,
        ],
        providers: [
            {
                provide: 'PUB_SUB',
                useValue: new graphql_subscriptions_1.PubSub(),
            },
            kasabe_service_1.KasabeService,
            kasabe_resolver_1.KasabeResolver,
        ]
    })
], KasabeModule);
exports.KasabeModule = KasabeModule;
//# sourceMappingURL=kasabe.module.js.map