import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildCommentInput } from './dto/create_comment.input';
import { UpdateCommentInput } from './dto/update_comment.input';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Comment
    async build(comment: BuildCommentInput): Promise<Comment> {
        console.log('service build() is running');
        const gComment = await this.commentRepository.build(comment);
        console.log('service build() db resutlt comment:> ');
        console.log(gComment);
        return gComment;
    }
    async rebuild(comment: UpdateCommentInput): Promise<Comment> {
        console.log('service rebuild() is running');
        const gComment = await this.commentRepository.rebuild(comment);
        console.log('service rebuild() db resutlt comment:> ');
        console.log(gComment);
        return gComment;
    }
    async fetchById ( rId: number ): Promise<Comment> {
        console.log('service fetchById() is running');
        const fComment = await this.commentRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fComment:> ');
        console.log(fComment);
        return fComment;
    }
    //#endregion
 
}
