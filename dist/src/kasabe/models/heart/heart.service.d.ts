import { BuildHeartInput } from './dto/create_heart.input';
import { UpdateHeartInput } from './dto/update_heart.input';
import { Heart } from './heart.entity';
import { HeartRepository } from './heart.repository';
export declare class HeartService {
    private heartRepository;
    constructor(heartRepository: HeartRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(heart: BuildHeartInput): Promise<Heart>;
    rebuild(heart: UpdateHeartInput): Promise<Heart>;
    fetchById(rId: number): Promise<Heart>;
}
