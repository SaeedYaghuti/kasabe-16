type Mutation {

    shipperTestMutation ( message: String!): Test!
    
    createShipper(shipper: CreateShipperInput!): Shipper! 
    updateShipper(shipper: UpdateShipperInput!): Shipper!

}

type Query {
    shipperTestQuery( message: String!): Test!
    getShipperById(shipper_id: Int!): Shipper!
}


input CreateShipperInput {
    shipper_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
}
input UpdateShipperInput {
    shipper_id: Int!
    shipper_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
}
type Shipper {
    shipper_id: Int!
    person: Person
    person_id: Int!
    shipper_name: String!
    contact_name: String!
    contact_title: String!
    url: String
    logo: String
    note: String
    our_id: String
    order: [ Order ]
}