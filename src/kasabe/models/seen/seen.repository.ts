import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildSeenInput } from './dto/create_seen.input';
import { Seen } from './seen.entity';
import { UpdateSeenInput } from './dto/update_seen.input';
import { DisseenInput } from './dto/disseen.input';

@EntityRepository(Seen)
export class SeenRepository extends Repository<Seen> {
  private logger = new Logger('SeenRepository');

  async build( rSeen: BuildSeenInput ): Promise<Seen> {
    console.log('SeenRepository rSeen: ', rSeen);

    const nSeen = Seen.of(rSeen);

    const gSeen = await nSeen.save();

    return this.fetchById(gSeen.seen_id);

  }
  
  async disseen( rSeen: DisseenInput ): Promise<void> {
    console.log('SeenRepository rData: ', rSeen);

    const dResult = await Seen.delete(rSeen.seen_id);
    console.log('dResult: ', dResult);
    
  }

  async countPostSeen( rPostId: number ): Promise<number> {
    console.log('SeenRepository rSeen: ', rPostId);

    const count = await Seen.count({ where: { post_id: rPostId}});

    return count;

  }

  async didISeen( rPostId: number, rAuthId ): Promise<boolean> {
    console.log('SeenRepository rSeen: ', rPostId);

    const count = await Seen.count({ where: { post_id: rPostId, auth_id: rAuthId}});

    return count === 1;

  }

  //! is not practical
  async rebuild( rSeen: UpdateSeenInput ): Promise<Seen> {
    console.log('SeenRepository rData: ', rSeen);

    const nSeen = new Seen();
    
    try {
      await nSeen.save();
      const fSeen = await Seen.findOne(rSeen.seen_id);
      console.log('fSeen: ', fSeen);
      return fSeen;
    } catch (error) {
      this.logger.error(
        `!> Failed to update seen: ${JSON.stringify(rSeen)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update seen',
        origin: '@seen.repository.ts',
        seen: rSeen,
      });
    }
  }
  
  //! should return boolean
  async fetchById( rId: number ): Promise<Seen> {
    console.log('SeenRepository rId: ', rId);

    const fSeen = await Seen.findOne({ 
      ////relations: ["merchant"],
      where: { seen_id: rId },
    });

    console.log('<m.r.ts| fetchById| fSeen>', fSeen);
    return fSeen;
  }


}

// export class SeenRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
