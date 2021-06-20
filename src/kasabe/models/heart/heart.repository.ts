import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildHeartInput } from './dto/create_heart.input';
import { Heart } from './heart.entity';
import { UpdateHeartInput } from './dto/update_heart.input';
import { DisheartInput } from './dto/disheart.input copy';

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {
  private logger = new Logger('HeartRepository');

  async build( rHeart: BuildHeartInput ): Promise<Heart> {
    console.log('HeartRepository rHeart: ', rHeart);

    const nHeart = Heart.of(rHeart);

    const gHeart = await nHeart.save();

    return this.fetchById(gHeart.heart_id);

  }
  
  async disheart( rHeart: DisheartInput ): Promise<void> {
    console.log('HeartRepository rData: ', rHeart);

    const dResult = await Heart.delete(rHeart.heart_id);
    console.log('dResult: ', dResult);
    
  }

  async countPostHeart( rPostId: number ): Promise<number> {
    console.log('HeartRepository rHeart: ', rPostId);

    const count = await Heart.count({ where: { post_id: rPostId}});

    return count;

  }

  async didIHeart( rPostId: number, rAuthId ): Promise<boolean> {
    console.log('HeartRepository rHeart: ', rPostId);

    const count = await Heart.count({ where: { post_id: rPostId, auth_id: rAuthId}});

    return count === 1;

  }

  //! is not practical
  async rebuild( rHeart: UpdateHeartInput ): Promise<Heart> {
    console.log('HeartRepository rData: ', rHeart);

    const nHeart = new Heart();
    
    try {
      await nHeart.save();
      const fHeart = await Heart.findOne(rHeart.heart_id);
      console.log('fHeart: ', fHeart);
      return fHeart;
    } catch (error) {
      this.logger.error(
        `!> Failed to update heart: ${JSON.stringify(rHeart)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update heart',
        origin: '@heart.repository.ts',
        heart: rHeart,
      });
    }
  }
  
  //! should return boolean
  async fetchById( rId: number ): Promise<Heart> {
    console.log('HeartRepository rId: ', rId);

    const fHeart = await Heart.findOne({ 
      ////relations: ["merchant"],
      where: { heart_id: rId },
    });

    console.log('<m.r.ts| fetchById| fHeart>', fHeart);
    return fHeart;
  }


}

// export class HeartRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
