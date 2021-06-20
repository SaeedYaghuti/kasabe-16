"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const tag_entity_1 = require("./tag.entity");
let TagRepository = class TagRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('TagRepository');
    }
    async build(rTag) {
        const nTag = new tag_entity_1.Tag();
        nTag.tag_title = rTag.tag_title;
        try {
            const gTag = await nTag.save();
            return gTag;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update tag',
                origin: '@tag.repository.ts',
                tag: rTag,
                error: error.stack,
            });
        }
    }
    async rebuild(rTag) {
        const nTag = new tag_entity_1.Tag();
        nTag.tag_id = rTag.tag_id;
        nTag.tag_title = rTag.tag_title;
        const uTag = await tag_entity_1.Tag.save(nTag);
        return uTag;
    }
    async fetchById(rId) {
        const tagWithProducts = await tag_entity_1.Tag.createQueryBuilder("tag")
            .leftJoinAndSelect("tag.products", "product")
            .where("tag.tag_id = :id", { id: rId })
            .getOne();
        return tagWithProducts;
    }
};
TagRepository = __decorate([
    typeorm_1.EntityRepository(tag_entity_1.Tag)
], TagRepository);
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.repository.js.map