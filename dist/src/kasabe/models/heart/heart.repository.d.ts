import { Repository } from 'typeorm';
import { BuildHeartInput } from './dto/create_heart.input';
import { Heart } from './heart.entity';
import { UpdateHeartInput } from './dto/update_heart.input';
import { DisheartInput } from './dto/disheart.input copy';
export declare class HeartRepository extends Repository<Heart> {
    private logger;
    build(rHeart: BuildHeartInput): Promise<Heart>;
    disheart(rHeart: DisheartInput): Promise<void>;
    countPostHeart(rPostId: number): Promise<number>;
    didIHeart(rPostId: number, rAuthId: any): Promise<boolean>;
    rebuild(rHeart: UpdateHeartInput): Promise<Heart>;
    fetchById(rId: number): Promise<Heart>;
}
