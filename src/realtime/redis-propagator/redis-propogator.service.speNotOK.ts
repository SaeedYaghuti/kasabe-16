import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import Redis from 'ioredis';
import { tap, mergeMap, filter, map } from 'rxjs/operators';
import { RedisService } from '../redis/redis.service';
import { REDIS_DB, REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from '../redis/redis.constants';
import { SocketStateService } from '../socket-state/socket-state.service';
import { RedisPropagatorService } from './redis-propagator.service';
import { EmittoAuthDto } from './dto/emit-to-auth.dto';
import { EnumEmitTypes } from './types/emit_types.enum';
export type RedisClient = Redis.Redis;


describe('redis-propogator.service.spec.ts', () => {
  let app: INestApplication;
  
  let redisService: RedisService;
  let redisPropagatorService: RedisPropagatorService;
  let socketStateService: SocketStateService;
  let redisSubscriberClient: RedisClient;
  let redisPublisherClient: RedisClient;
  let redisDB: RedisClient;

  beforeAll(async () => {
   
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ],
      providers: [
        RedisService,
        SocketStateService,
        RedisPropagatorService,
        // ...redisProviders,
        {
            provide: REDIS_SUBSCRIBER_CLIENT,
            useFactory: (): RedisClient => {
                return new Redis(
                    // {
                    //   host: 'socket-redis',
                    //   port: 6379,
                    // }
                );
            },
        },
        {
            provide: REDIS_PUBLISHER_CLIENT,
            useFactory: (): RedisClient => {
                return new Redis(
                // {
                //   host: 'socket-redis',
                //   port: 6379,
                // }
                );
            },
        },
        {
            provide: REDIS_DB,
            useFactory: (): RedisClient => {
                return new Redis(
                // {
                //   host: 'socket-redis',
                //   port: 6379,
                // }
                );
            },
        
        },
        // {
        //   provide: RoomRepository,
        //   useClass: RoomRepositoryFake,
        // },
        // {
        //   provide: RoomClientRepository,
        //   useClass: RoomClientRepositoryFake,
        // },
        // {
        //   provide: MessageRepository,
        //   useClass: MessageRepositoryFake,
        // }
      ]

    })
    .compile();

    app = module.createNestApplication();
    await app.init();

    redisService = app.get<RedisService>(RedisService);
    redisPropagatorService = app.get<RedisPropagatorService>(RedisPropagatorService);
    socketStateService = app.get<SocketStateService>(SocketStateService);
    redisSubscriberClient = app.get<RedisClient>(REDIS_SUBSCRIBER_CLIENT);
    redisPublisherClient = app.get<RedisClient>(REDIS_PUBLISHER_CLIENT);
    redisDB = app.get<RedisClient>(REDIS_DB);

    await redisDB.flushall();
    await redisSubscriberClient.removeAllListeners();
    await redisPublisherClient.removeAllListeners();
    
  });

  beforeEach(async () => {
      await redisDB.flushall();
      await redisSubscriberClient.removeAllListeners();
      await redisPublisherClient.removeAllListeners();
  })

  
    describe('[a] variables', () => {
    
    it('[1] redisService should be defined', async done => {
      
      expect(redisService).toBeDefined();

      done();

    }, 20000);
    
    it('[2] redisSubscriberClient should be defined', async done => {
      
      expect(redisSubscriberClient).toBeDefined();

      done();

    }, 20000);
    
    it('[3] redisPublisherClient should be defined', async done => {
      
      expect(redisPublisherClient).toBeDefined();

      done();

    }, 20000);
    
    it('[4] redisDB should be defined', async done => {
      
      expect(redisDB).toBeDefined();

      done();

    }, 20000);
    
    it('[5] socketStateService should be defined', async done => {
      
      expect(socketStateService).toBeDefined();

      done();

    }, 20000);
    
    it('[6] redisPropagatorService should be defined', async done => {
      
      expect(redisPropagatorService).toBeDefined();

      done();

    }, 20000);

  });


    describe('[b] () ', () => {

      it('[1] consumeSendEventtoAuth() should be called', async (done) => {
            
        const index = '<<b1>>';

        // 🕵️‍♀️
        const redisPropogate_consumeSendEventtoAuth_Spy = jest.spyOn<any, any>(redisPropagatorService, 'consumeSendEventtoAuth');
        // .mock(never);

        const eventInfo: EmittoAuthDto = {
          type: EnumEmitTypes.USER,
          event: 'msgToClient',
          data: 'hello',
          authId: 2,
          excludedSocketId: null,
        }

        redisPropagatorService.publishEmittoAuth(eventInfo);

        setTimeout(() => {
          // 🚩❓🤬👺👿😈
          expect(redisPropogate_consumeSendEventtoAuth_Spy).toBeCalledTimes(0); // ❓
          expect(redisPropogate_consumeSendEventtoAuth_Spy).toBeCalledWith(eventInfo);
          done();

        }, 20000);

        
      
      }, 20000);
    
    });
  
});
