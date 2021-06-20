import { registerEnumType } from "type-graphql";

export enum OrderStatus {
  PENDING = "PENDING",
  PACKAGED = "PACKAGED",
  DELEVIRED = "DELEVIRED",
  PAID = "PAID",
  CANCELED = "CANCELED"
}

// export enum OrderStatus {
//   PENDING,
//   PACKAGED,
//   DELEVIRED,
//   PAID,
//   CANCELED
// }

registerEnumType(OrderStatus, {
  name: "OrderStatus",
  description: "show order status"
})
  