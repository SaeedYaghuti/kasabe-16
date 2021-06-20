"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const redis_service_1 = require("./redis.service");
const redis_constants_1 = require("./redis.constants");
const ioredis_1 = __importDefault(require("ioredis"));
const operators_1 = require("rxjs/operators");
describe('redis.service.spec.ts', () => {
    let app;
    let redisService;
    let redisSubscriberClient;
    let redisPublisherClient;
    let redisDB;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [],
            providers: [
                redis_service_1.RedisService,
                {
                    provide: redis_constants_1.REDIS_SUBSCRIBER_CLIENT,
                    useFactory: () => {
                        return new ioredis_1.default();
                    },
                },
                {
                    provide: redis_constants_1.REDIS_PUBLISHER_CLIENT,
                    useFactory: () => {
                        return new ioredis_1.default();
                    },
                },
                {
                    provide: redis_constants_1.REDIS_DB,
                    useFactory: () => {
                        return new ioredis_1.default();
                    },
                },
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        redisService = app.get(redis_service_1.RedisService);
        redisSubscriberClient = app.get(redis_constants_1.REDIS_SUBSCRIBER_CLIENT);
        redisPublisherClient = app.get(redis_constants_1.REDIS_PUBLISHER_CLIENT);
        redisDB = app.get(redis_constants_1.REDIS_DB);
        await redisDB.flushall();
        await redisSubscriberClient.flushall();
        await redisPublisherClient.flushall();
    });
    beforeEach(async () => {
        await redisDB.flushall();
        await redisSubscriberClient.removeAllListeners();
        await redisPublisherClient.removeAllListeners();
    });
    describe('[a] variables', () => {
        it('[1] redisService should be defined', async (done) => {
            expect(redisService).toBeDefined();
            done();
        }, 20000);
        it('[2] redisSubscriberClient should be defined', async (done) => {
            expect(redisSubscriberClient).toBeDefined();
            done();
        }, 20000);
        it('[3] redisPublisherClient should be defined', async (done) => {
            expect(redisPublisherClient).toBeDefined();
            done();
        }, 20000);
        it('[4] redisDB should be defined', async (done) => {
            expect(redisDB).toBeDefined();
            done();
        }, 20000);
    });
    describe('[b] redisDB sadd() and smembers() ', () => {
        it('[1] should add flower_id 2 for client_id 1', async () => {
            const index = '<<b1>>';
            const client_id = 1;
            const flower_id = 2;
            const followersId = [2, 3, 4];
            const setResult = await redisDB.sadd(client_id + ":followers", flower_id, (error, reply) => {
                expect(error).toEqual(null);
                expect(reply).toEqual(1);
            });
            expect(setResult).toEqual(1);
            const getResult = await redisDB.smembers("1:followers", (error, reply) => {
                expect(error).toEqual(null);
                expect(reply).toEqual([flower_id.toString()]);
            });
            expect(getResult).toEqual([flower_id.toString()]);
        }, 20000);
    });
    describe('[c] redisService setFollowings() and getFollowers() ', () => {
        it('[1] set followers for client_id 1', async () => {
            const i = '<<c1>>';
            const client_id = 1;
            const followed_ids = [2, 3, 4];
            const setResult = await redisService.setFollowings(client_id, followed_ids);
            expect(setResult).toEqual([1, 1, 1]);
        }, 20000);
        it('[2] getFollowers of client_id 1', async () => {
            const i = '<<c2>>';
            const client_id = 1;
            const flower_id = 2;
            const followed_ids = [2, 3, 4];
            const setResult = await redisService.setFollowings(client_id, followed_ids);
            expect(setResult).toEqual([1, 1, 1]);
            const getResult = await redisService.getFollowers(2);
            expect(getResult).toEqual(['1']);
            const getResult3 = await redisService.getFollowers(3);
            expect(getResult3).toEqual(['1']);
            const getResult4 = await redisService.getFollowers(4);
            expect(getResult4).toEqual(['1']);
        }, 20000);
        it('[3] set and get followers of Selena', async () => {
            const i = '<<c3>>';
            const selena_id = 1;
            const asity_id = 2;
            const mahsa_id = 3;
            const hasti_id = 4;
            const asitiResult = await redisService.setFollowings(asity_id, [selena_id, mahsa_id, hasti_id]);
            expect(asitiResult).toEqual([1, 1, 1]);
            const mahsaResult = await redisService.setFollowings(mahsa_id, [selena_id, hasti_id]);
            expect(mahsaResult).toEqual([1, 1]);
            const hastiResult = await redisService.setFollowings(hasti_id, [selena_id, mahsa_id]);
            expect(hastiResult).toEqual([1, 1]);
            const selenaFollowers = await redisService.getFollowers(selena_id);
            expect(selenaFollowers).toEqual([`${asity_id}`, `${mahsa_id}`, `${hasti_id}`]);
            const hastiFollowers = await redisService.getFollowers(hasti_id);
            expect(hastiFollowers).toEqual([`${asity_id}`, `${mahsa_id}`]);
        }, 20000);
        it('[4] get followers of unavailable should return empty []', async () => {
            const i = '<<c4>>';
            const selena_id = 1;
            const asity_id = 2;
            const mahsa_id = 3;
            const hasti_id = 4;
            const hastiFollowers = await redisService.getFollowers(selena_id);
            expect(hastiFollowers).toEqual([]);
        }, 20000);
    });
    describe('[d] redisPublisherClient and  redisSubscriberClient', () => {
        it('[1] MOVIE channel one publisher', async () => {
            const NEWS = 'news';
            const MOVIE = 'movie';
            redisSubscriberClient.subscribe(MOVIE);
            redisPublisherClient.publish(MOVIE, 'The inception 2017');
            redisSubscriberClient.on('message', (channel, message) => {
                expect(channel).toEqual(MOVIE);
                expect(message).toEqual('The inception 2017');
            });
        }, 20000);
        it('[2] NEWS channel two publisher', async () => {
            const NEWS = 'news';
            const MOVIE = 'movie';
            redisSubscriberClient.subscribe(MOVIE);
            redisSubscriberClient.subscribe(NEWS);
            redisPublisherClient.publish(MOVIE, 'The inception 2017');
            redisPublisherClient.publish(NEWS, 'the news 20:30');
            redisSubscriberClient.on('message', (channel, message) => {
                if (channel === MOVIE) {
                    expect(channel).toEqual(MOVIE);
                    expect(message).toEqual('The inception 2017');
                }
                if (channel === NEWS) {
                    expect(channel).toEqual(NEWS);
                    expect(message).toEqual('the news 20:30');
                }
            });
        }, 20000);
    });
    describe('[e] fromEvent() and publish()', () => {
        it('[1] MOVIE event', async (done) => {
            const i = '<<e1>>';
            const MOVIE = 'movie';
            const consumeMovieEvent = (movieName) => {
                expect(movieName).toEqual("The inception 2017");
                done();
            };
            redisService
                .fromEvent(MOVIE)
                .pipe(operators_1.tap(consumeMovieEvent))
                .subscribe();
            redisService.publish(MOVIE, 'The inception 2017');
        }, 20000);
        it('[2] MOVIE and NEWS event', async (done) => {
            const i = '<<e2>>';
            const NEWS = 'news';
            const MOVIE = 'movie';
            const consumeMovieEvent = (movie) => {
                expect(movie).toEqual("The inception 2017");
                done();
            };
            const consumeNewsEvent = (news) => {
                expect(news).toEqual("Trump got COVID-19");
                done();
            };
            redisService
                .fromEvent(MOVIE)
                .pipe(operators_1.tap(consumeMovieEvent))
                .subscribe();
            redisService
                .fromEvent(NEWS)
                .pipe(operators_1.tap(consumeNewsEvent))
                .subscribe();
            redisService.publish(MOVIE, 'The inception 2017');
            redisService.publish(NEWS, "Trump got COVID-19");
        }, 20000);
    });
});
//# sourceMappingURL=redis.service.spe.js.map