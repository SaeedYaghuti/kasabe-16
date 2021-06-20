type Mutation {

    productCategoryTestMutation ( message: String!): Test!
    
    createProductCategory ( category: CreateProductCategoryInput! ): ProductCategory!
    updateProductCategory ( category: UpdateProductCategoryInput! ): ProductCategory!
    
}

type Query {
    productCategoryTestQuery( message: String!): Test!
    getProductCategoryById ( category_id: Int! ): ProductCategory!
}


input CreateProductCategoryInput {
    category_name: String!
    category_description: String!
    parentId: Int
    flag_product_id: Int
    picture_url: String
    isActive: Boolean
}
input UpdateProductCategoryInput {
    id: Int!
    category_name: String!
    category_description: String!
    parentId: Int!
    flag_product_id: Int
    picture_url: String
    isActive: Boolean
}
type ProductCategory {
    id: Int!
    category_name: String!
    category_description: String!
    children: [ ProductCategory ]
    parent: ProductCategory
    parentId: Int!
    flag_product: Product
    flag_product_id: Int
    picture_url: String
    isActive: Boolean
    products: [ Product ]
}