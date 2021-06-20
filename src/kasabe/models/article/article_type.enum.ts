import { registerEnumType } from "type-graphql";

export enum ArticleType {
    MERCHANT_PROFILE = "MERCHANT_PROFILE",
    POST = "POST",
    COMMENT = "COMMENT",
    RATE = "RATE"
}

registerEnumType(ArticleType, {
  name: "ArticleType",
  description: "show article type"
});
  