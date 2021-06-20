import { registerEnumType } from "type-graphql";

export enum AccessRole {
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER",
    SHIPPER = "SHIPPER",
    STAFF = "STAFF"
}

registerEnumType(AccessRole, {
  name: "AccessRole",
  description: "show auth role"
});
  