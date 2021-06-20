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
const heart_entity_1 = require("./heart.entity");
let HeartRepository = class HeartRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('HeartRepository');
    }
    async build(rHeart) {
        console.log('HeartRepository rHeart: ', rHeart);
        const nHeart = heart_entity_1.Heart.of(rHeart);
        const gHeart = await nHeart.save();
        return this.fetchById(gHeart.heart_id);
    }
    async disheart(rHeart) {
        console.log('HeartRepository rData: ', rHeart);
        const dResult = await heart_entity_1.Heart.delete(rHeart.heart_id);
        console.log('dResult: ', dResult);
    }
    async countPostHeart(rPostId) {
        console.log('HeartRepository rHeart: ', rPostId);
        const count = await heart_entity_1.Heart.count({ where: { post_id: rPostId } });
        return count;
    }
    async didIHeart(rPostId, rAuthId) {
        console.log('HeartRepository rHeart: ', rPostId);
        const count = await heart_entity_1.Heart.count({ where: { post_id: rPostId, auth_id: rAuthId } });
        return count === 1;
    }
    async rebuild(rHeart) {
        console.log('HeartRepository rData: ', rHeart);
        const nHeart = new heart_entity_1.Heart();
        try {
            await nHeart.save();
            const fHeart = await heart_entity_1.Heart.findOne(rHeart.heart_id);
            console.log('fHeart: ', fHeart);
            return fHeart;
        }
        catch (error) {
            this.logger.error(`!> Failed to update heart: ${JSON.stringify(rHeart)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update heart',
                origin: '@heart.repository.ts',
                heart: rHeart,
            });
        }
    }
    async fetchById(rId) {
        console.log('HeartRepository rId: ', rId);
        const fHeart = await heart_entity_1.Heart.findOne({
            where: { heart_id: rId },
        });
        console.log('<m.r.ts| fetchById| fHeart>', fHeart);
        return fHeart;
    }
};
HeartRepository = __decorate([
    typeorm_1.EntityRepository(heart_entity_1.Heart)
], HeartRepository);
exports.HeartRepository = HeartRepository;
//# sourceMappingURL=heart.repository.js.map