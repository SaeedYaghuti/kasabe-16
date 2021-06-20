"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_validator_1 = require("class-transformer-validator");
const common_1 = require("@nestjs/common");
exports.classValidator = async (rawData, Dto) => {
    class_transformer_validator_1.transformAndValidate(Dto, rawData)
        .then((result) => {
        console.log(`data converted to MessageCreateDto Successfully: ${result}`);
        return result;
    })
        .catch(err => {
        console.error(err);
        throw new common_1.BadGatewayException();
    });
};
//# sourceMappingURL=class_validator.js.map