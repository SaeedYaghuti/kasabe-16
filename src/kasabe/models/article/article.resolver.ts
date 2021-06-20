import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { BuildArticleInput } from './dto/create_article.input';
import { UpdateArticleInput } from './dto/update_article.input';
import { Article } from './article.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Article')
export class ArticleResolver {
    // Constructor
    constructor(
        private articleService: ArticleService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async articleTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('articleTestQuery is running...');
        return await this.articleService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async articleTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.articleService.testQuery(message);
    }
    
    //#endregion

    // Article
    @Mutation(() => Article)
    async build( @Args('article') article: BuildArticleInput ): Promise<Article> {
        console.log('mutation build() is running...');
        return await this.articleService.build(article);
    }
    @Mutation(() => Article)
    async rebuild( @Args('article') article: UpdateArticleInput ): Promise<Article> {
        console.log('mutation rebuild() is running...');
        return await this.articleService.rebuild(article);
    }
    @Query(() => Article)
    async fetchById (@Args('article_id') rId: number): Promise<Article> {
        return await this.articleService.fetchById(rId);
    }

}
