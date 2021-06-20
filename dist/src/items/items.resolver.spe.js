"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const items_resolver_1 = require("./items.resolver");
describe('ItemsResolver', () => {
    let resolver;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [items_resolver_1.ItemsResolver],
        }).compile();
        resolver = module.get(items_resolver_1.ItemsResolver);
    });
    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
//# sourceMappingURL=items.resolver.spe.js.map