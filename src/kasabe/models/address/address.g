type Mutation {

    addressTestMutation ( message: String!): Test!
    
    createAddress(address: CreateAddressInput!): Address! 
    updateAddress(address: UpdateAddressInput!): Address! 
    
}

type Query {

    addressTestQuery( message: String!): Test!

    getAddressById(address_id: Int!): Address!
    
}


# Address
input CreateAddressInput {
    person_id: Int!
    address_title: String!
    contact_line1: String!
    contact_line2: String
    location: String
    postal_code: String
    city: String!
    state: String!
    country: String!
    email: String
    phone: String!
    fax: String
}
input UpdateAddressInput {
    address_id: Int!
    address_title: String!
    address_line1: String!
    address_line2: String
    location: String
    postal_code: String
    city: String!
    state: String!
    country: String!
    email: String
    phone: String!
    fax: String
}
type Address {
    address_id: Int!
    person: Person
    person_id: Int!
    address_title: String!
    address_line1: String!
    address_line2: String
    location: String
    postal_code: String
    city: String!
    state: String!
    country: String!
    email: String
    phone: String!
    fax: String
}
