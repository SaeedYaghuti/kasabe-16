import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
export declare type RedisClient = Redis.Redis;
export declare const redisProviders: Provider[];
