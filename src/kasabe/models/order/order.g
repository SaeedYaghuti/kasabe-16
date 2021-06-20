type Mutation {

    orderTestMutation ( message: String!): Test!
    
    createOrder(order: CreateOrderInput!): Order! 
    updateOrder(order: UpdateOrderInput!): Order!  
    
}

type Query {

    orderTestQuery( message: String!): Test!

    getOrderById(order_id: Int!): Order!
    
}

enum OrderStatus {
    PENDING
    PACKAGED
    DELEVIRED
    PAID
    CANCELED
}


# Order
input CreateOrderInput {
    order_number: String!
    customer_id: Int!
    shipper_id: Int!
    order_date: String!
    required_date: String!
    ship_date: String!
    freight: Float!
    status: OrderStatus!
    # TODO: change to CreaateOrderDetailsInput
    order_details: [ CreateOrderDetailsInput! ]!
}
input UpdateOrderInput {
    order_id: Int!
    order_number: String!
    customer_id: Int!
    shipper_id: Int!
    # TODO:maybe it must be ferbiden to update some element
    order_date: String!
    required_date: String!
    ship_date: String!
    freight: Float!
    status: OrderStatus!
    order_details: [ UpdateOrderDetailsInput! ]!
}
type Order {
    order_id: Int!
    order_number: String!
    customer: Customer
    customer_id: Int!
    shipper: Shipper
    shipper_id: Int!
    order_date: String!
    required_date: String!
    ship_date: String!
    freight: Float!
    status: OrderStatus!
    order_details: [ OrderDetails! ]!
}


# OrderDetails
input CreateOrderDetailsInput {
    product_id: Int!
    # TODO: may be it should be Int
    quantity: Float!
    shipper_id: Int!
    required_date: String!
    ship_date: String!
    status: OrderStatus!
    # TODO: Delete
    order_number: String!
    customer_id: Int!
    order_date: String!
}
input UpdateOrderDetailsInput {
    order_details_id: Int!
    product_id: Int!
    quantity: Float!
    shipper_id: Int!
    required_date: String!
    ship_date: String!
    freight: Float
    status: OrderStatus!
}
type OrderDetails {
    order_details_id: Int!
    order: Order
    order_id: Int
    product: Product
    product_id: Int!
    msrp: Float!
    discount: Float!
    quantity: Float!
    price: Float!
    shipper: Shipper
    shipper_id: Int!
    required_date: String!
    ship_date: String!
    freight: Float
    status: OrderStatus!
}
