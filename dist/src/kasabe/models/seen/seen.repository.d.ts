import { Repository } from 'typeorm';
import { BuildSeenInput } from './dto/create_seen.input';
import { Seen } from './seen.entity';
import { UpdateSeenInput } from './dto/update_seen.input';
import { DisseenInput } from './dto/disseen.input';
export declare class SeenRepository extends Repository<Seen> {
    private logger;
    build(rSeen: BuildSeenInput): Promise<Seen>;
    disseen(rSeen: DisseenInput): Promise<void>;
    countPostSeen(rPostId: number): Promise<number>;
    didISeen(rPostId: number, rAuthId: any): Promise<boolean>;
    rebuild(rSeen: UpdateSeenInput): Promise<Seen>;
    fetchById(rId: number): Promise<Seen>;
}
