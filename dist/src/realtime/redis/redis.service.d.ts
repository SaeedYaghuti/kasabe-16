import { Observable } from 'rxjs';
import { RedisClient } from './redis.providers';
import { EmittoFrontendDto } from '../redis-propagator/dto/emit-to-frontend.dto';
export interface RedisSubscribeMessage {
    readonly message: string;
    readonly channel: string;
}
export declare class RedisService {
    private readonly redisSubscriberClient;
    private readonly redisPublisherClient;
    private readonly redisDB;
    constructor(redisSubscriberClient: RedisClient, redisPublisherClient: RedisClient, redisDB: RedisClient);
    private logger;
    fromEvent<T extends EmittoFrontendDto>(eventName: string): Observable<T>;
    publish(channel: string, value: unknown): Promise<number>;
    setFollowings(client_id: number, followed_ids: number[]): Promise<number[]>;
    getFollowers(client_id: number): Promise<string[]>;
}
