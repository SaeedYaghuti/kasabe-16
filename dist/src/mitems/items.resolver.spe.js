"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const item_resolver_1 = require("./item.resolver");
describe('ItemResolver', () => {
    let resolver;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [item_resolver_1.ItemResolver],
        }).compile();
        resolver = module.get(item_resolver_1.ItemResolver);
    });
    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
//# sourceMappingURL=items.resolver.spe.js.map