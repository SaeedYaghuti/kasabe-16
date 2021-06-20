"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var RelationType;
(function (RelationType) {
    RelationType["ACTIVE"] = "ACTIVE";
    RelationType["BLOCK"] = "BLOCK";
    RelationType["MUTE"] = "MUTE";
})(RelationType = exports.RelationType || (exports.RelationType = {}));
type_graphql_1.registerEnumType(RelationType, {
    name: "RelationType",
    description: "show relation type"
});
//# sourceMappingURL=relation_type.enum.js.map