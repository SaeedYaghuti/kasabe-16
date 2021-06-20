import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { BuildTagInput } from './dto/create_tag.input';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private logger = new Logger('TagRepository');

  // Tag
  async build( rTag: BuildTagInput ): Promise<Tag> {
    // console.log('TagRepository rData: ', rTag);

    const nTag = new Tag();
    nTag.tag_title = rTag.tag_title;
    
    try {
      const gTag = await nTag.save();
      // console.log('gTag: ', gTag);
      return gTag;
    } catch (error) {
      throw new InternalServerErrorException({
        message: '!> Failed to update tag',
        origin: '@tag.repository.ts',
        tag: rTag,
        error: error.stack,
      });
    }
  }
  
  
  // Tag
  async rebuild( rTag: UpdateTagInput ): Promise<Tag> {
    // console.log('TagRepository rData: ', rTag);

    const nTag = new Tag();
    nTag.tag_id = rTag.tag_id;
    nTag.tag_title = rTag.tag_title;

    const uTag = await Tag.save(nTag);
    
    return uTag;
    
    // try {
    //   const uTag = await Tag.save(nTag);
    //   console.log('uTag: ', uTag);
    //   return this.fetchById(rTag.tag_id);
    // } catch (error) {
    //   throw new BadRequestException({
    //     message: '!> Failed to save tag',
    //     origin: '@tag.repository.ts',
    //     tag: rTag,
    //     error: error.stack,
    //   });
    // }
  }
  // Get
  async fetchById( rId: number ): Promise<Tag> {
    // console.log('TagRepository rId: ', rId);

    // fetch related products
    const tagWithProducts = await Tag.createQueryBuilder("tag")
    .leftJoinAndSelect("tag.products", "product")
    .where("tag.tag_id = :id", {id: rId})
    .getOne();

    // console.log('fProducts: ', tagWithProducts);
    return tagWithProducts;

    // try {
    // //   const fTag = await Tag.findOne(rId);
    // //   console.log('fTag: ', fTag);

    //   // fetch related products
    //   const tagWithProducts = await this.createQueryBuilder("tag")
    //   .leftJoinAndSelect("tag.products", "product")
    //   .where("tag.tag_id = :id", {id: rId})
    //   .getOne();

    //   // console.log('fProducts: ', tagWithProducts);
    //   return tagWithProducts;
    // } catch (error) {
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch tag',
    //     origin: '@tag.repository.ts',
    //     tag_id: rId,
    //     error: error.stack,
    //   });
    // }
  }


}


// export class TagRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
