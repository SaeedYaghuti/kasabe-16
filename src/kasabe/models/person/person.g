type Mutation {

    personTestMutation ( message: String!): Test!
    
    createPerson(person: CreatePersonInput!): Person! 
    updatePerson(person: UpdatePersonInput!): Person! 
    
}

type Query {

    personTestQuery( message: String!): Test!

    getPersonById(person_id: Int!): Person!
    
}

enum PersonRole {
    CUSTOMER
    SUPPLIER
    SHIPPER
    STAFF
}


# Person
input CreatePersonInput {
    person_role: PersonRole!
    person_name: String!
}
input UpdatePersonInput {
    person_id: Int!
    person_role: PersonRole!
    person_name: String!
}
type Person {
    person_id: Int!
    person_role: PersonRole!
    person_name: String!
    addresses: [ Address ]
}