type Mutation {

    productTestMutation ( message: String!): Test!
    
    createProduct ( product: CreateProductInput! ): Product!
    updateProduct ( product: UpdateProductInput! ): Product!
    
}

type Query {
    productTestQuery( message: String!): Test!

    getProductById ( product_id: Int! ): Product!
    getProductCategoryById ( category_id: Int! ): ProductCategory!
    
}


# Product
input CreateProductInput {
    sku: String!
    supplier_sku: String
    product_category_id: Int!
    product_name: String!
    msrp: Float
    price: Float!
    price_currency: String
    currency_symbole: String
    unit_weight: Float
    unit_weight_title: String
    is_discount: Boolean
    discount: Float
    ranking: Int
    reorder_level: Int
    is_active: Boolean
    tag_ids: [ Int ]
}
input UpdateProductInput {
    product_id: Int!
    sku: String!
    supplier_sku: String
    product_category_id: Int!
    product_name: String!
    msrp: Float
    price: Float!
    price_currency: String
    currency_symbole: String
    unit_weight: Float
    unit_weight_title: String
    is_discount: Boolean
    discount: Float
    ranking: Int
    reorder_level: Int
    is_active: Boolean
    tags: [ UpdateTagInput ]
}
type Product {
    product_id: Int!
    sku: String!
    supplier_sku: String
    category: ProductCategory
    product_category_id: Int!
    product_name: String!
    msrp: Float
    price: Float!
    price_currency: String
    currency_symbole: String
    unit_weight: Float
    unit_weight_title: String
    is_discount: Boolean
    discount: Float
    ranking: Int
    reorder_level: Int
    is_active: Boolean
    tags: [ Tag ]
    order_details: [ OrderDetails ]
}