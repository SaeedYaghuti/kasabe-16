"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_service_1 = require("../redis/redis.service");
const redis_constants_1 = require("../redis/redis.constants");
const socket_state_service_1 = require("../socket-state/socket-state.service");
const redis_propagator_service_1 = require("./redis-propagator.service");
const emit_types_enum_1 = require("./types/emit_types.enum");
describe('redis-propogator.service.spec.ts', () => {
    let app;
    let redisService;
    let redisPropagatorService;
    let socketStateService;
    let redisSubscriberClient;
    let redisPublisherClient;
    let redisDB;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [],
            providers: [
                redis_service_1.RedisService,
                socket_state_service_1.SocketStateService,
                redis_propagator_service_1.RedisPropagatorService,
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
        redisPropagatorService = app.get(redis_propagator_service_1.RedisPropagatorService);
        socketStateService = app.get(socket_state_service_1.SocketStateService);
        redisSubscriberClient = app.get(redis_constants_1.REDIS_SUBSCRIBER_CLIENT);
        redisPublisherClient = app.get(redis_constants_1.REDIS_PUBLISHER_CLIENT);
        redisDB = app.get(redis_constants_1.REDIS_DB);
        await redisDB.flushall();
        await redisSubscriberClient.removeAllListeners();
        await redisPublisherClient.removeAllListeners();
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
        it('[5] socketStateService should be defined', async (done) => {
            expect(socketStateService).toBeDefined();
            done();
        }, 20000);
        it('[6] redisPropagatorService should be defined', async (done) => {
            expect(redisPropagatorService).toBeDefined();
            done();
        }, 20000);
    });
    describe('[b] () ', () => {
        it('[1] consumeSendEventtoAuth() should be called', async (done) => {
            const index = '<<b1>>';
            const redisPropogate_consumeSendEventtoAuth_Spy = jest.spyOn(redisPropagatorService, 'consumeSendEventtoAuth');
            const eventInfo = {
                type: emit_types_enum_1.EnumEmitTypes.USER,
                event: 'msgToClient',
                data: 'hello',
                authId: 2,
                excludedSocketId: null,
            };
            redisPropagatorService.publishEmittoAuth(eventInfo);
            setTimeout(() => {
                expect(redisPropogate_consumeSendEventtoAuth_Spy).toBeCalledTimes(0);
                expect(redisPropogate_consumeSendEventtoAuth_Spy).toBeCalledWith(eventInfo);
                done();
            }, 20000);
        }, 20000);
    });
});
//# sourceMappingURL=redis-propogator.service.speNotOK.js.map