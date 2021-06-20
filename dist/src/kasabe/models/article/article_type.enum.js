"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var ArticleType;
(function (ArticleType) {
    ArticleType["MERCHANT_PROFILE"] = "MERCHANT_PROFILE";
    ArticleType["POST"] = "POST";
    ArticleType["COMMENT"] = "COMMENT";
    ArticleType["RATE"] = "RATE";
})(ArticleType = exports.ArticleType || (exports.ArticleType = {}));
type_graphql_1.registerEnumType(ArticleType, {
    name: "ArticleType",
    description: "show article type"
});
//# sourceMappingURL=article_type.enum.js.map