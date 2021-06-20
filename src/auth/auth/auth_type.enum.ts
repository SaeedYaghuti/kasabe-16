import { registerEnumType } from "type-graphql";

export enum AuthType {
  // Ecommerce
  CUSTOMER = "CUSTOMER",
  SUPPLIER = "SUPPLIER",
  SHIPPER = "SHIPPER",

  // Staff
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  ACCOUNTER = "ACCOUNTER",
  CASHIER = "CASHIER",
  SALESMAN = "SALESMAN",

  // Kasabe
  SUBSCRIBED = "SUBSCRIBED", // we have auth-id for him
  MERCHANT = "MERCHANT",
}

registerEnumType(AuthType, {
  name: "AuthType",
  description: "show auth type"
});
  