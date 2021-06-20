"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_repository_1 = require("./comment.repository");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(comment) {
        console.log('service build() is running');
        const gComment = await this.commentRepository.build(comment);
        console.log('service build() db resutlt comment:> ');
        console.log(gComment);
        return gComment;
    }
    async rebuild(comment) {
        console.log('service rebuild() is running');
        const gComment = await this.commentRepository.rebuild(comment);
        console.log('service rebuild() db resutlt comment:> ');
        console.log(gComment);
        return gComment;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fComment = await this.commentRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fComment:> ');
        console.log(fComment);
        return fComment;
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_repository_1.CommentRepository)),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map