import { registerEnumType } from "type-graphql";

export enum PersonRole {
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER",
    SHIPPER = "SHIPPER",
    STAFF = "STAFF"
}

registerEnumType(PersonRole, {
  name: "PersonRole",
  description: "show person role"
});
  