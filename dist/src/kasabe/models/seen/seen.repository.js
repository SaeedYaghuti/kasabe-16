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
const seen_entity_1 = require("./seen.entity");
let SeenRepository = class SeenRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('SeenRepository');
    }
    async build(rSeen) {
        console.log('SeenRepository rSeen: ', rSeen);
        const nSeen = seen_entity_1.Seen.of(rSeen);
        const gSeen = await nSeen.save();
        return this.fetchById(gSeen.seen_id);
    }
    async disseen(rSeen) {
        console.log('SeenRepository rData: ', rSeen);
        const dResult = await seen_entity_1.Seen.delete(rSeen.seen_id);
        console.log('dResult: ', dResult);
    }
    async countPostSeen(rPostId) {
        console.log('SeenRepository rSeen: ', rPostId);
        const count = await seen_entity_1.Seen.count({ where: { post_id: rPostId } });
        return count;
    }
    async didISeen(rPostId, rAuthId) {
        console.log('SeenRepository rSeen: ', rPostId);
        const count = await seen_entity_1.Seen.count({ where: { post_id: rPostId, auth_id: rAuthId } });
        return count === 1;
    }
    async rebuild(rSeen) {
        console.log('SeenRepository rData: ', rSeen);
        const nSeen = new seen_entity_1.Seen();
        try {
            await nSeen.save();
            const fSeen = await seen_entity_1.Seen.findOne(rSeen.seen_id);
            console.log('fSeen: ', fSeen);
            return fSeen;
        }
        catch (error) {
            this.logger.error(`!> Failed to update seen: ${JSON.stringify(rSeen)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update seen',
                origin: '@seen.repository.ts',
                seen: rSeen,
            });
        }
    }
    async fetchById(rId) {
        console.log('SeenRepository rId: ', rId);
        const fSeen = await seen_entity_1.Seen.findOne({
            where: { seen_id: rId },
        });
        console.log('<m.r.ts| fetchById| fSeen>', fSeen);
        return fSeen;
    }
};
SeenRepository = __decorate([
    typeorm_1.EntityRepository(seen_entity_1.Seen)
], SeenRepository);
exports.SeenRepository = SeenRepository;
//# sourceMappingURL=seen.repository.js.map