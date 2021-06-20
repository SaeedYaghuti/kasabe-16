import { BuildSeenInput } from './dto/create_seen.input';
import { UpdateSeenInput } from './dto/update_seen.input';
import { Seen } from './seen.entity';
import { SeenRepository } from './seen.repository';
export declare class SeenService {
    private seenRepository;
    constructor(seenRepository: SeenRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(seen: BuildSeenInput): Promise<Seen>;
    rebuild(seen: UpdateSeenInput): Promise<Seen>;
    fetchById(rId: number): Promise<Seen>;
}
