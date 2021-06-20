
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum OrderStatus {
    PENDING = "PENDING",
    PACKAGED = "PACKAGED",
    DELEVIRED = "DELEVIRED",
    PAID = "PAID",
    CANCELED = "CANCELED"
}

export enum PersonRole {
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER",
    SHIPPER = "SHIPPER",
    STAFF = "STAFF"
}

export interface CreateAddressInput {
    person_id: number;
    address_title: string;
    contact_line1: string;
    contact_line2?: string;
    location?: string;
    postal_code?: string;
    city: string;
    state: string;
    country: string;
    email?: string;
    phone: string;
    fax?: string;
}

export interface CreateClientInput {
    client_fname: string;
    client_lname: string;
    client_mname?: string;
    phone: string;
    email: string;
    password: string;
}

export interface CreateCustomerInput {
    customer_name: string;
    password: string;
    address_id?: number;
}

export interface CreateOrderDetailsInput {
    product_id: number;
    quantity: number;
    shipper_id: number;
    required_date: string;
    ship_date: string;
    status: OrderStatus;
    order_number: string;
    customer_id: number;
    order_date: string;
}

export interface CreateOrderInput {
    order_number: string;
    customer_id: number;
    shipper_id: number;
    order_date: string;
    required_date: string;
    ship_date: string;
    freight: number;
    status: OrderStatus;
    order_details: CreateOrderDetailsInput[];
}

export interface CreatePersonInput {
    person_role: PersonRole;
    person_name: string;
}

export interface CreateProductCategoryInput {
    category_name: string;
    category_description: string;
    parentId?: number;
    flag_product_id?: number;
    picture_url?: string;
    isActive?: boolean;
}

export interface CreateProductInput {
    sku: string;
    supplier_sku?: string;
    product_category_id: number;
    product_name: string;
    msrp?: number;
    price: number;
    price_currency?: string;
    currency_symbole?: string;
    unit_weight?: number;
    unit_weight_title?: string;
    is_discount?: boolean;
    discount?: number;
    ranking?: number;
    reorder_level?: number;
    is_active?: boolean;
    tag_ids?: number[];
}

export interface CreateShipperInput {
    shipper_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
}

export interface CreateSupplierInput {
    supplier_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
}

export interface CreateTagInput {
    tag_title: string;
    tag_description: string;
}

export interface UpdateAddressInput {
    address_id: number;
    address_title: string;
    address_line1: string;
    address_line2?: string;
    location?: string;
    postal_code?: string;
    city: string;
    state: string;
    country: string;
    email?: string;
    phone: string;
    fax?: string;
}

export interface UpdateClientInput {
    client_id: number;
    client_socket_id?: string;
    client_socket_authname?: string;
    client_fname?: string;
    client_lname?: string;
    client_mname?: string;
    phone?: string;
    email?: string;
    password?: string;
    last_seen?: string;
    last_typed?: string;
    is_active?: string;
    is_reported?: string;
    is_blocked?: string;
    updated_at?: string;
}

export interface UpdateCustomerInput {
    customer_id: number;
    customer_name: string;
    password?: string;
}

export interface UpdateOrderDetailsInput {
    order_details_id: number;
    product_id: number;
    quantity: number;
    shipper_id: number;
    required_date: string;
    ship_date: string;
    freight?: number;
    status: OrderStatus;
}

export interface UpdateOrderInput {
    order_id: number;
    order_number: string;
    customer_id: number;
    shipper_id: number;
    order_date: string;
    required_date: string;
    ship_date: string;
    freight: number;
    status: OrderStatus;
    order_details: UpdateOrderDetailsInput[];
}

export interface UpdatePersonInput {
    person_id: number;
    person_role: PersonRole;
    person_name: string;
}

export interface UpdateProductCategoryInput {
    id: number;
    category_name: string;
    category_description: string;
    parentId: number;
    flag_product_id?: number;
    picture_url?: string;
    isActive?: boolean;
}

export interface UpdateProductInput {
    product_id: number;
    sku: string;
    supplier_sku?: string;
    product_category_id: number;
    product_name: string;
    msrp?: number;
    price: number;
    price_currency?: string;
    currency_symbole?: string;
    unit_weight?: number;
    unit_weight_title?: string;
    is_discount?: boolean;
    discount?: number;
    ranking?: number;
    reorder_level?: number;
    is_active?: boolean;
    tags?: UpdateTagInput[];
}

export interface UpdateShipperInput {
    shipper_id: number;
    shipper_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
}

export interface UpdateSupplierInput {
    supplier_id: number;
    supplier_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
}

export interface UpdateTagInput {
    tag_id: number;
    tag_title: string;
    tag_description: string;
}

export interface Address {
    address_id: number;
    person?: Person;
    person_id: number;
    address_title: string;
    address_line1: string;
    address_line2?: string;
    location?: string;
    postal_code?: string;
    city: string;
    state: string;
    country: string;
    email?: string;
    phone: string;
    fax?: string;
}

export interface Client {
    client_id: number;
    client_socket_id?: string;
    client_socket_authname?: string;
    client_fname: string;
    client_lname: string;
    client_mname?: string;
    phone: string;
    email: string;
    last_seen: string;
    last_typed: string;
    is_active: string;
    is_reported: string;
    is_blocked: string;
    created_at: string;
    updated_at: string;
}

export interface Customer {
    customer_id: number;
    person_id: number;
    person?: Person;
    customer_name: string;
    password?: string;
    order?: Order[];
}

export interface IMutation {
    ping(): Ping | Promise<Ping>;
    clientCreate(client: CreateClientInput): Client | Promise<Client>;
    testMutation(message: string): Test | Promise<Test>;
    ecommerceTestMutation(message: string): Test | Promise<Test>;
    addressTestMutation(message: string): Test | Promise<Test>;
    build(address: CreateAddressInput): Address | Promise<Address>;
    rebuild(address: UpdateAddressInput): Address | Promise<Address>;
    customerTestMutation(message: string): Test | Promise<Test>;
    build(customer: CreateCustomerInput): Customer | Promise<Customer>;
    rebuild(customer: UpdateCustomerInput): Customer | Promise<Customer>;
    orderTestMutation(message: string): Test | Promise<Test>;
    build(order: CreateOrderInput): Order | Promise<Order>;
    rebuild(order: UpdateOrderInput): Order | Promise<Order>;
    personTestMutation(message: string): Test | Promise<Test>;
    build(person: CreatePersonInput): Person | Promise<Person>;
    rebuild(person: UpdatePersonInput): Person | Promise<Person>;
    productTestMutation(message: string): Test | Promise<Test>;
    build(product: CreateProductInput): Product | Promise<Product>;
    rebuild(product: UpdateProductInput): Product | Promise<Product>;
    productCategoryTestMutation(message: string): Test | Promise<Test>;
    build(category: CreateProductCategoryInput): ProductCategory | Promise<ProductCategory>;
    rebuild(category: UpdateProductCategoryInput): ProductCategory | Promise<ProductCategory>;
    shipperTestMutation(message: string): Test | Promise<Test>;
    build(shipper: CreateShipperInput): Shipper | Promise<Shipper>;
    rebuild(shipper: UpdateShipperInput): Shipper | Promise<Shipper>;
    supplierTestMutation(message: string): Test | Promise<Test>;
    build(supplier: CreateSupplierInput): Supplier | Promise<Supplier>;
    rebuild(supplier: UpdateSupplierInput): Supplier | Promise<Supplier>;
    tagTestMutation(message: string): Test | Promise<Test>;
    build(tag: CreateTagInput): Tag | Promise<Tag>;
    rebuild(tag: UpdateTagInput): Tag | Promise<Tag>;
}

export interface Order {
    order_id: number;
    order_number: string;
    customer?: Customer;
    customer_id: number;
    shipper?: Shipper;
    shipper_id: number;
    order_date: string;
    required_date: string;
    ship_date: string;
    freight: number;
    status: OrderStatus;
    order_details: OrderDetails[];
}

export interface OrderDetails {
    order_details_id: number;
    order?: Order;
    order_id?: number;
    product?: Product;
    product_id: number;
    msrp: number;
    discount: number;
    quantity: number;
    price: number;
    shipper?: Shipper;
    shipper_id: number;
    required_date: string;
    ship_date: string;
    freight?: number;
    status: OrderStatus;
}

export interface Person {
    person_id: number;
    person_role: PersonRole;
    person_name: string;
    addresses?: Address[];
}

export interface Ping {
    id?: string;
}

export interface Pong {
    pingId?: string;
}

export interface Product {
    product_id: number;
    sku: string;
    supplier_sku?: string;
    category?: ProductCategory;
    product_category_id: number;
    product_name: string;
    msrp?: number;
    price: number;
    price_currency?: string;
    currency_symbole?: string;
    unit_weight?: number;
    unit_weight_title?: string;
    is_discount?: boolean;
    discount?: number;
    ranking?: number;
    reorder_level?: number;
    is_active?: boolean;
    tags?: Tag[];
    order_details?: OrderDetails[];
}

export interface ProductCategory {
    id: number;
    category_name: string;
    category_description: string;
    children?: ProductCategory[];
    parent?: ProductCategory;
    parentId: number;
    flag_product?: Product;
    flag_product_id?: number;
    picture_url?: string;
    isActive?: boolean;
    products?: Product[];
}

export interface IQuery {
    getClientById(client_id: number): Client | Promise<Client>;
    testQuery(message: string): Test | Promise<Test>;
    ecommerceTestQuery(message: string): Test | Promise<Test>;
    addressTestQuery(message: string): Test | Promise<Test>;
    fetchById(address_id: number): Address | Promise<Address>;
    customerTestQuery(message: string): Test | Promise<Test>;
    fetchById(customer_id: number): Customer | Promise<Customer>;
    orderTestQuery(message: string): Test | Promise<Test>;
    fetchById(order_id: number): Order | Promise<Order>;
    personTestQuery(message: string): Test | Promise<Test>;
    fetchById(person_id: number): Person | Promise<Person>;
    productTestQuery(message: string): Test | Promise<Test>;
    fetchById(product_id: number): Product | Promise<Product>;
    fetchById(category_id: number): ProductCategory | Promise<ProductCategory>;
    productCategoryTestQuery(message: string): Test | Promise<Test>;
    shipperTestQuery(message: string): Test | Promise<Test>;
    fetchById(shipper_id: number): Shipper | Promise<Shipper>;
    supplierTestQuery(message: string): Test | Promise<Test>;
    fetchById(supplier_id: number): Supplier | Promise<Supplier>;
    tagTestQuery(message: string): Test | Promise<Test>;
    fetchById(tag_id: number): Tag | Promise<Tag>;
}

export interface Shipper {
    shipper_id: number;
    person?: Person;
    person_id: number;
    shipper_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
    order?: Order[];
}

export interface ISubscription {
    tagCreated(): Tag | Promise<Tag>;
    clientCreated(): Client | Promise<Client>;
    pong(): Pong | Promise<Pong>;
}

export interface Supplier {
    supplier_id: number;
    person?: Person;
    person_id: number;
    supplier_name: string;
    contact_name: string;
    contact_title: string;
    url?: string;
    logo?: string;
    note?: string;
    our_id?: string;
}

export interface Tag {
    tag_id: number;
    tag_title: string;
    tag_description: string;
    products?: Product[];
}

export interface Test {
    message: string;
}
