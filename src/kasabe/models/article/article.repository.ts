import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildArticleInput } from './dto/create_article.input';
import { Article } from './article.entity';
import { UpdateArticleInput } from './dto/update_article.input';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private logger = new Logger('ArticleRepository');

  // Article
  async build( rArticle: BuildArticleInput ): Promise<Article> {
    console.log('ArticleRepository rData: ', rArticle);

    const article_type = rArticle.article_type;

    const nArticle = new Article();
    nArticle.article_type = article_type;
    
    try {
      const gArticle = await nArticle.save();
      console.log('gArticle: ', gArticle);
      return gArticle;
    } catch (error) {
      this.logger.error(
        `!> Failed to save article: ${JSON.stringify(rArticle)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to save article',
        origin: '@article.repository.ts',
        article: rArticle,
      });
    }
  }
  
  async rebuild( rArticle: UpdateArticleInput ): Promise<Article> {
    console.log('ArticleRepository rData: ', rArticle);

    const nArticle = new Article();
    nArticle.article_id = rArticle.article_id;
    nArticle.article_type = rArticle.article_type;
    
    try {
      await nArticle.save();
      const fArticle = await Article.findOne(rArticle.article_id);
      console.log('fArticle: ', fArticle);
      return fArticle;
    } catch (error) {
      this.logger.error(
        `!> Failed to update article: ${JSON.stringify(rArticle)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update article',
        origin: '@article.repository.ts',
        article: rArticle,
      });
    }
  }
  
  async fetchById( rId: number ): Promise<Article> {
    console.log('ArticleRepository rId: ', rId);

    const fArticle = await Article.findOne({ 
      relations: ["hearts", "comments"],
      where: { article_id: rId },
    });
    return fArticle;
  }
  
  async fetch(): Promise<Article[]> {

    const fArticle = await Article.find({ 
      relations: ["hearts", "posts", "comments", "rates"],
    });
    return fArticle;
    
  }


}

// export class ArticleRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
