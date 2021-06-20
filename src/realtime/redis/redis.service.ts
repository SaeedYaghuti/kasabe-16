import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { RedisSocketEventSendDTO } from '../redis-propagator/dto/socket-event-send.dto';

import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
  REDIS_DB,
} from './redis.constants';
import { RedisClient } from './redis.providers';
import { table } from 'console';
import { LogColor } from '../../util/log_color';
import { EmittoFrontendDto } from '../redis-propagator/dto/emit-to-frontend.dto';

export interface RedisSubscribeMessage {
  readonly message: string;
  readonly channel: string;
}

@Injectable()
export class RedisService {
  public constructor(
    @Inject(REDIS_SUBSCRIBER_CLIENT)
    private readonly redisSubscriberClient: RedisClient,
    @Inject(REDIS_PUBLISHER_CLIENT)
    private readonly redisPublisherClient: RedisClient,
    @Inject(REDIS_DB)
    private readonly redisDB: RedisClient,
  ) {}

  private logger = new Logger('RedisService');

  //#region  Redis as Broker

  // public fromEvent<T extends RedisSocketEventSendDTO>(eventName: string): Observable<T> {
  public fromEvent<T extends EmittoFrontendDto>(eventName: string): Observable<T> {
    this.redisSubscriberClient.subscribe(eventName);

    // return Observable.create((observer: Observer<RedisSubscribeMessage>) =>
    return new Observable((observer: Observer<RedisSubscribeMessage>) =>
    // all message published on chanel that redisSubscriberClient has subscribed to  go throu here 
    // you can find list of channem that redisSubscriberClient has subscribed to 
    // at RedisPropagatorService.ts
    // some of them: REDIS_SOCKET_EVENT_SEND_NAME, REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED_NAME, REDIS_SOCKET_EVENT_EMIT_ALL_NAME
      this.redisSubscriberClient.on('message', (channel, message) => observer.next({ channel, message })),
    ).pipe(
      tap(({ channel, message }) => {
        this.logger.log(`[APP_FLOW: 13 (repeat)] - Redis.on('message') wanted eventName: ${eventName}; recived> ${JSON.stringify(channel)}`);
      }),
      filter(({ channel }) => channel === eventName),
      map(({ message }) => JSON.parse(message)),
    );
  }

  public async publish(channel: string, value: unknown): Promise<number> {
    this.logger.log(`[APP_FLOW:  10 ] - publish() arguments: channel> ${JSON.stringify(channel)}, value ${JSON.stringify(value)}`);

    return new Promise<number>((resolve, reject) => {
      // console.log(LogColor.FgBlue, 'redis.service.ts> publish()> value=> ', value);
      return this.redisPublisherClient.publish(channel, JSON.stringify(value), (error, reply) => {
        this.logger.log(`[APP_FLOW: 16 ] -  Redis publish callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
        if (error) {
          // console.log(LogColor.FgBlue, 'redis.service.ts> publish()> error=> ', error);
          return reject(error);
        }
        // console.log(LogColor.FgBlue, 'redis.service.ts> publish()> reply=> ', reply);
        return resolve(reply);
      });
    });
  }
  //#endregion

  //#region  Redis as DB

  // client is watching followed ids
  public async setFollowings(client_id: number, followed_ids: number[]): Promise<number[]> {
    this.logger.log(`[APP_FLOW:  16 ] - setSubscriberstoClient() arguments: follower_id> ${JSON.stringify(client_id)}, following_ids> ${JSON.stringify(followed_ids)}`);

      return Promise.all( 
        followed_ids.map(followed_id => {
          return new Promise<number>((resolve, reject) => {

            return this.redisDB.sadd(followed_id + ":followers" , client_id, (error, reply) => {
              this.logger.log(`[APP_FLOW: 17 ] -  RedisDB.sadd() callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
              if (error) {
                return reject(error);
              }
              return resolve(reply);
            });

          })
          .catch(err => {console.log(`<Esl> err redisDB.sadd(followed_id: ${followed_id}) while`, err); return -1});

        })
      )
  }
  
  public async getFollowers(client_id: number): Promise<string[]> {
    this.logger.log(`[APP_FLOW:  15 ] - getClientFlowers() arguments: client_id> ${JSON.stringify(client_id)}`);

    return new Promise<string[]>((resolve, reject) => {
      return this.redisDB.smembers(client_id + ":followers" , (error, reply) => {
        this.logger.log(`[APP_FLOW: 17 ] -  RedisDB.smembers() callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
        if (error) {
          return reject(error);
        }
        return resolve(reply);
      });
    });
  }

  // public async removeSubscriberFromClient(client_id: number, subscribers: number[])  { }
  //#endregion
}
