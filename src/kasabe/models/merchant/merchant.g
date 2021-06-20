type Mutation {

    merchantTestMutation ( message: String!): Test!
    
    createMerchant(merchant: BuildMerchantInput!): Merchant! 
    updateMerchant(merchant: UpdateMerchantInput!): Merchant!

}

type Query {
    merchantTestQuery( message: String!): Test!
    getMerchantById(merchant_id: Int!): Merchant!
}


input BuildMerchantInput {
    merchant_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
}
input UpdateMerchantInput {
    merchant_id: Int!
    merchant_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
}
type Merchant {
    merchant_id: Int!
    person: Person
    person_id: Int!
    merchant_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
    order: [ Order ]
}