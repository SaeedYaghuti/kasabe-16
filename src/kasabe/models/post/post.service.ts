import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildPostInput } from './dto/create_post.input';
import { UpdatePostInput } from './dto/update_post.input';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        // Post
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Post
    async build(post: BuildPostInput): Promise<Post> {
        console.log('service build() is running');
        const gPost = await this.postRepository.build(post);
        console.log('service build() db resutlt post:> ');
        console.log(gPost);
        return gPost;
    }
    async rebuild(post: UpdatePostInput): Promise<Post> {
        console.log('service rebuild() is running');
        const gPost = await this.postRepository.rebuild(post);
        console.log('service rebuild() db resutlt post:> ');
        console.log(gPost);
        return gPost;
    }
    async fetchById ( rId: number ): Promise<Post> {
        console.log('service fetchById() is running');
        const fPost = await this.postRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fPost:> ');
        console.log(fPost);
        return fPost;
    }
    //#endregion
 
}
