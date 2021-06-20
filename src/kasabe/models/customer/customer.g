type Mutation {

    customerTestMutation ( message: String!): Test!
    
    createCustomer(customer: CreateCustomerInput!): Customer! 
    updateCustomer(customer: UpdateCustomerInput!): Customer!   
    
}

type Query {

    customerTestQuery( message: String!): Test!

    getCustomerById(customer_id: Int!): Customer!
    
}


# Customer
input CreateCustomerInput {
    customer_name: String!
    password: String!
    address_id: Int
}
input UpdateCustomerInput {
    customer_id: Int!
    customer_name: String!
    # TODO: must be hidden
    password: String
}
type Customer {
    customer_id: Int!
    person_id: Int!
    person: Person
    customer_name: String!
    # TODO: must be hidden
    password: String
    order: [ Order ]
}
