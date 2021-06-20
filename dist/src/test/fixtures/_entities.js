"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_entity_1 = require("../../kasabe/models/tag/tag.entity");
const supplier_entity_1 = require("../../kasabe/models/supplier/supplier.entity");
const shipper_entity_1 = require("../../kasabe/models/shipper/shipper.entity");
const product_category_entity_1 = require("../../kasabe/models/product_category/product_category.entity");
const product_entity_1 = require("../../kasabe/models/product/product.entity");
const person_entity_1 = require("../../kasabe/models/person/person.entity");
const customer_entity_1 = require("../../kasabe/models/customer/customer.entity");
const address_entity_1 = require("../../kasabe/models/address/address.entity");
const supplier_sample_input_1 = require("./kasabe/supplier/supplier.sample.input");
const build_shipper_inputs_1 = require("./kasabe/shipper/build.shipper.inputs");
const create_product_category_inputs_1 = require("./kasabe/product_category/create.product_category.inputs");
const auth_entity_1 = require("../../auth/auth/auth.entity");
const merchant_entity_1 = require("../../kasabe/models/merchant/merchant.entity");
const merchant_category_entity_1 = require("../../kasabe/models/merchant_category/merchant_category.entity");
const post_entity_1 = require("../../kasabe/models/post/post.entity");
const heart_entity_1 = require("../../kasabe/models/heart/heart.entity");
const tag_entities_1 = require("./kasabe/tag/tag.entities");
const auth_entities_1 = require("./auth/auth.entities");
const merchant_category_entities_1 = require("./kasabe/merchant_category/merchant_category.entities");
const merchant_entities_1 = require("./kasabe/merchant/merchant.entities");
const post_entities_1 = require("./kasabe/post/post.entities");
const heart_entities_1 = require("./kasabe/heart/heart.entities");
const article_entity_1 = require("../../kasabe/models/article/article.entity");
const article_entities_1 = require("./kasabe/article/article.entities");
const order_entity_1 = require("../../kasabe/models/order/order.entity");
const comment_entity_1 = require("../../kasabe/models/comment/comment.entity");
const rate_entity_1 = require("../../kasabe/models/rate/rate.entity");
const comment_entities_1 = require("./kasabe/comment/comment.entities");
const rate_entities_1 = require("./kasabe/rate/rate.entities");
const build_auth_inputs_1 = require("./auth/build.auth.inputs");
const build_article_inputs_1 = require("./kasabe/article/build.article.inputs");
const build_comment_inputs_1 = require("./kasabe/comment/build.comment.inputs");
const build_heart_inputs_1 = require("./kasabe/heart/build.heart.inputs");
const build_merchant_inputs_1 = require("./kasabe/merchant/build.merchant.inputs");
const build_merchant_category_inputs_1 = require("./kasabe/merchant_category/build.merchant_category.inputs");
const build_post_inputs_1 = require("./kasabe/post/build.post.inputs");
const build_rate_inputs_1 = require("./kasabe/rate/build.rate.inputs");
const build_tag_inputs_1 = require("./kasabe/tag/build.tag.inputs");
const tag_repository_1 = require("../../kasabe/models/tag/tag.repository");
const auth_repository_1 = require("../../auth/auth/auth.repository");
const article_repository_1 = require("../../kasabe/models/article/article.repository");
const merchant_category_repository_1 = require("../../kasabe/models/merchant_category/merchant_category.repository");
const merchant_repository_1 = require("../../kasabe/models/merchant/merchant.repository");
const post_repository_1 = require("../../kasabe/models/post/post.repository");
const comment_repository_1 = require("../../kasabe/models/comment/comment.repository");
const rate_repository_1 = require("../../kasabe/models/rate/rate.repository");
const heart_repository_1 = require("../../kasabe/models/heart/heart.repository");
const relation_entity_1 = require("../../kasabe/models/relation/relation.entity");
const relation_repository_1 = require("../../kasabe/models/relation/relation.repository");
const seen_1 = require("../../kasabe/models/seen");
const seen_repository_1 = require("../../kasabe/models/seen/seen.repository");
const seen_entities_1 = require("./kasabe/seen/seen.entities");
const build_seen_inputs_1 = require("./kasabe/seen/build.seen.inputs");
const relation_entities_1 = require("./kasabe/relation/relation.entities");
const build_relation_inputs_1 = require("./kasabe/relation/build.relation.inputs");
exports.Seed = [
    {
        entity: auth_entity_1.Auth,
        customRepository: auth_repository_1.AuthRepository,
        inputs: { basic: auth_entities_1.AuthEntities, custom: build_auth_inputs_1.BuildAuthInputs, service: [] },
        entityMetaData: { entityName: "Auth", tableName: "auth", idTitle: "auth_id" }
    },
    {
        entity: tag_entity_1.Tag,
        customRepository: tag_repository_1.TagRepository,
        inputs: { basic: tag_entities_1.TagEntities, custom: build_tag_inputs_1.BuildTagInputs, service: [] },
        entityMetaData: { entityName: "Tag", tableName: "tag", idTitle: "tag_id" }
    },
    {
        entity: article_entity_1.Article,
        customRepository: article_repository_1.ArticleRepository,
        inputs: { basic: article_entities_1.ArticleEntities, custom: build_article_inputs_1.BuildArticleInputs, service: [] },
        entityMetaData: { entityName: "Article", tableName: "article", idTitle: "article_id" }
    },
    {
        entity: merchant_category_entity_1.MerchantCategory,
        customRepository: merchant_category_repository_1.MerchantCategoryRepository,
        inputs: { basic: merchant_category_entities_1.MerchantCategoryEntities, custom: build_merchant_category_inputs_1.BuildMerchantCategoryInputs, service: [] },
        entityMetaData: { entityName: "MerchantCategory", tableName: "merchant_category", idTitle: "id" }
    },
    {
        entity: merchant_entity_1.Merchant,
        customRepository: merchant_repository_1.MerchantRepository,
        inputs: { basic: merchant_entities_1.MerchantEntities, custom: build_merchant_inputs_1.BuildMerchantInputs, service: [] },
        entityMetaData: { entityName: "Merchant", tableName: "merchant", idTitle: "merchant_id" }
    },
    {
        entity: relation_entity_1.Relation,
        customRepository: relation_repository_1.RelationRepository,
        inputs: { basic: relation_entities_1.RelationEntities, custom: build_relation_inputs_1.BuildRelationInputs, service: [] },
        entityMetaData: { entityName: "Relation", tableName: "relation", idTitle: "relation_id" }
    },
    {
        entity: post_entity_1.Post,
        customRepository: post_repository_1.PostRepository,
        inputs: { basic: post_entities_1.PostEntities, custom: build_post_inputs_1.BuildPostInputs, service: [] },
        entityMetaData: { entityName: "Post", tableName: "post", idTitle: "post_id" }
    },
    {
        entity: comment_entity_1.Comment,
        customRepository: comment_repository_1.CommentRepository,
        inputs: { basic: comment_entities_1.CommentEntities, custom: build_comment_inputs_1.BuildCommentInputs, service: [] },
        entityMetaData: { entityName: "Comment", tableName: "comment", idTitle: "comment_id" }
    },
    {
        entity: heart_entity_1.Heart,
        customRepository: heart_repository_1.HeartRepository,
        inputs: { basic: heart_entities_1.HeartEntities, custom: build_heart_inputs_1.BuildHeartInputs, service: [] },
        entityMetaData: { entityName: "Heart", tableName: "heart", idTitle: "heart_id" }
    },
    {
        entity: rate_entity_1.Rate,
        customRepository: rate_repository_1.RateRepository,
        inputs: { basic: rate_entities_1.RateEntities, custom: build_rate_inputs_1.BuildRateInputs, service: [] },
        entityMetaData: { entityName: "Rate", tableName: "rate", idTitle: "rate_id" }
    },
    {
        entity: seen_1.Seen,
        customRepository: seen_repository_1.SeenRepository,
        inputs: { basic: seen_entities_1.SeenEntities, custom: build_seen_inputs_1.BuildSeenInputs, service: [] },
        entityMetaData: { entityName: "Seen", tableName: "seen", idTitle: "seen_id" }
    },
];
exports.EntitiesSeed = [
    { entity: person_entity_1.Person, samples: [], entityMetaData: { entityName: "Person", tableName: "person", idTitle: "person_id" } },
    { entity: address_entity_1.Address, samples: [], entityMetaData: { entityName: "Address", tableName: "address", idTitle: "address_id" } },
    { entity: supplier_entity_1.Supplier, samples: supplier_sample_input_1.SupplierSampleInputs, entityMetaData: { entityName: "Supplier", tableName: "supplier", idTitle: "supplier_id" } },
    { entity: shipper_entity_1.Shipper, samples: build_shipper_inputs_1.CreateShipperInputs, entityMetaData: { entityName: "Shipper", tableName: "shipper", idTitle: "shipper_id" } },
    { entity: customer_entity_1.Customer, samples: [], entityMetaData: { entityName: "Customer", tableName: "customer", idTitle: "customer_id" } },
    { entity: product_entity_1.Product, samples: [], entityMetaData: { entityName: "Product", tableName: "product", idTitle: "product_id" } },
    { entity: product_category_entity_1.ProductCategory, samples: create_product_category_inputs_1.CreateProductCategoryInputs, entityMetaData: { entityName: "ProductCategory", tableName: "product_category", idTitle: "id" } },
    { entity: order_entity_1.Order, samples: [], entityMetaData: { entityName: "Order", tableName: "orders", idTitle: "order_id" } },
];
//# sourceMappingURL=_entities.js.map