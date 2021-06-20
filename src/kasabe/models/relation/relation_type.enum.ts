import { registerEnumType } from "type-graphql";

export enum RelationType {
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    MUTE = "MUTE",
}

registerEnumType(RelationType, {
  name: "RelationType",
  description: "show relation type"
});
  