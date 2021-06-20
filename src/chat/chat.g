type Mutation {
    ping: Ping
    clientCreate ( client: CreateClientInput! ): Client!

    testMutation ( message: String!): Test!
    

}

type Query {
    # noop: Boolean

    getClientById ( client_id: Int! ): Client!

    testQuery( message: String!): Test!
}

type Subscription {
  tagCreated: Tag
  clientCreated: Client

  pong: Pong
}

type Ping {
  id: ID
}

type Pong {
  pingId: ID
}


type Test {
    message: String!
}


# Client
input CreateClientInput {
    client_fname: String!
    client_lname: String!
    client_mname: String
    phone: String!
    email: String!
    password: String!
}
input UpdateClientInput {
    client_id: Int!
    client_socket_id: String
    client_socket_authname: String
    client_fname: String
    client_lname: String
    client_mname: String
    phone: String
    email: String
    password: String
    last_seen: String
    last_typed: String
    is_active: String
    is_reported: String
    is_blocked: String
    updated_at: String
}
type Client {
    client_id: Int!
    client_socket_id: String
    client_socket_authname: String
    client_fname: String!
    client_lname: String!
    client_mname: String
    phone: String!
    email: String!
    last_seen: String!
    last_typed: String!
    is_active: String!
    is_reported: String!
    is_blocked: String!
    created_at: String!
    updated_at: String!
}
