"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_service_1 = require("../redis/redis.service");
const redis_constants_1 = require("../redis/redis.constants");
const socket_state_service_1 = require("./socket-state.service");
const redis_propagator_service_1 = require("../redis-propagator/redis-propagator.service");
const io = __importStar(require("socket.io-client"));
jest.setTimeout(90000);
describe('redis-propogator.service.spec.ts', () => {
    let app;
    let redisService;
    let socketStateService;
    let redisPropagatorService;
    let redisSubscriberClient;
    let redisPublisherClient;
    let redisDB;
    let server;
    let client1;
    let client2;
    let client3;
    let client4;
    beforeEach(async () => {
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
    beforeEach(async (done) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        await redisDB.flushall();
        await redisSubscriberClient.removeAllListeners();
        await redisPublisherClient.removeAllListeners();
        (_a = server) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        (_b = server) === null || _b === void 0 ? void 0 : _b.close();
        (_c = client1) === null || _c === void 0 ? void 0 : _c.removeAllListeners();
        (_d = client1) === null || _d === void 0 ? void 0 : _d.disconnect();
        (_e = client1) === null || _e === void 0 ? void 0 : _e.close();
        (_f = client2) === null || _f === void 0 ? void 0 : _f.removeAllListeners();
        (_g = client2) === null || _g === void 0 ? void 0 : _g.disconnect();
        (_h = client2) === null || _h === void 0 ? void 0 : _h.close();
        (_j = client3) === null || _j === void 0 ? void 0 : _j.removeAllListeners();
        (_k = client3) === null || _k === void 0 ? void 0 : _k.disconnect();
        (_l = client3) === null || _l === void 0 ? void 0 : _l.close();
        (_m = client4) === null || _m === void 0 ? void 0 : _m.removeAllListeners();
        (_o = client4) === null || _o === void 0 ? void 0 : _o.disconnect();
        (_p = client4) === null || _p === void 0 ? void 0 : _p.close();
        done();
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
    describe('[b] make server and client ', () => {
        it('[1] transfer data between server and client', async (done) => {
            const index = '<<b1>>';
            const PORT = 3000;
            server = require('socket.io')(PORT);
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 1,
                },
            });
            server.on('connection', clientSocket => {
                clientSocket.emit('Hello', "Hello client!");
                clientSocket.on('customerId', data => {
                    expect(data).toEqual({ customerId: 10 });
                    server.close();
                    done();
                });
            });
            client1.on('Hello', data => {
                expect(data).toEqual("Hello client!");
                const info = {
                    customerId: 10,
                };
                client1.emit('customerId', info);
            });
        }, 90000);
        it('[2] extract token from client-socket', async (done) => {
            const index = '<<b1>>';
            const PORT = 3020;
            server = require('socket.io')(PORT);
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 1,
                },
            });
            server.on('connection', clientSocket => {
                var _a;
                expect((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token).toEqual("1");
                server.close();
                done();
            });
        }, 90000);
    });
    describe('[c] add() ', () => {
        it('[1] add client-socket to socket-store', async (done) => {
            const index = '<<c1>>';
            const PORT = 3010;
            server = require('socket.io')(PORT);
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 10,
                },
            });
            server.on('connection', clientSocket => {
                var _a, _b;
                const auth_id = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(auth_id, clientSocket);
                expect(result).toEqual(true);
                expect((_b = clientSocket.handshake.query) === null || _b === void 0 ? void 0 : _b.token).toEqual("10");
                const fSockets = socketStateService.getAuthSockets(auth_id);
                expect(fSockets.length).toEqual(1);
                expect(fSockets[0]).toEqual(clientSocket);
                server.close();
                client1.disconnect();
                client1.removeAllListeners();
                client1.close();
                done();
            });
        }, 90000);
        it('[2] add with string key', async (done) => {
            const i = '<<c2>>';
            const PORT = 3020;
            server = require('socket.io')(PORT);
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 20,
                },
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a, _b;
                connectionCount++;
                const auth_id = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(auth_id, clientSocket);
                expect(result).toEqual(true);
                expect((_b = clientSocket.handshake.query) === null || _b === void 0 ? void 0 : _b.token).toEqual("20");
                const fSockets = socketStateService.getAuthSockets(auth_id);
                expect(fSockets.length).toEqual(1);
                expect(fSockets[0]).toEqual(clientSocket);
                server.close();
                done();
            });
        }, 90000);
        it('[3] add two instance for a auth-id', async (done) => {
            const i = '<<c3>>';
            const PORT = 3030;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            const fSockets = socketStateService.getAuthSockets(1);
            expect(fSockets.length).toEqual(0);
            server = require('socket.io')(PORT);
            const auth_id = 30;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: auth_id,
                },
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: auth_id,
                },
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(() => {
                expect(connectionCount).toEqual(2);
                expect(clientArray.length).toEqual(2);
                const store = socketStateService.getSocketStore();
                const fSockets = socketStateService.getAuthSockets(auth_id);
                expect(fSockets.length).toEqual(2);
                expect(fSockets).toEqual(clientArray);
                server.close();
                client1.close();
                client2.close();
                done();
            }, (5000));
        }, 90000);
        it('[4] add two auth-id', async (done) => {
            const i = '<<c4>>';
            const PORT = 3040;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id41 = 41;
            const id42 = 42;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id41,
                },
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id42,
                },
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(() => {
                expect(connectionCount).toEqual(2);
                expect(clientArray.length).toEqual(2);
                const store = socketStateService.getSocketStore();
                const fSockets22 = socketStateService.getAuthSockets(id41);
                expect(fSockets22.length).toEqual(1);
                const fSockets23 = socketStateService.getAuthSockets(id42);
                expect(fSockets23.length).toEqual(1);
                server.close();
                client1.close();
                client2.close();
                done();
            }, (5000));
        }, 90000);
        it('[5] getSocketsSize()', async (done) => {
            const i = '<<c5>>';
            const PORT = 3050;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id51 = 51;
            const id52 = 52;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id51,
                },
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id52,
                },
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(() => {
                expect(connectionCount).toEqual(2);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(2);
                server.close();
                client1.close();
                client2.close();
                done();
            }, (5000));
        }, 90000);
    });
    describe('[d] sendToSiblingSockets() ', () => {
        it('[1] send message to sibling client2', async (done) => {
            const i = '<<d1>>';
            const PORT = 3110;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id10 = 10;
            const id11 = 11;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done();
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(2);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(1);
                const authSockets = socketStateService.getAuthSockets(id10);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray);
                const eventInfo = {
                    authId: id10,
                    socketId: clientArray[0].id,
                    data: 'hello',
                    event: 'message',
                };
                socketStateService.sendToSiblingSockets(eventInfo);
            }, 5000);
        }, 90000);
    });
    describe('[e] sendToAuth() ', () => {
        it('[1] sendToAuth: send message to sibling client2', async (done) => {
            const i = '<<e1>>';
            const PORT = 3210;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id10 = 10;
            const id11 = 11;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
                done();
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done();
            });
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id11,
                },
            });
            client3.on('message', message => {
                expect(true).toEqual(false);
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(3);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(2);
                const authSockets = socketStateService.getAuthSockets(id10);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray.slice(0, 2));
                const eventInfo = {
                    authId: id10,
                    excludedSocketId: clientArray[0].id,
                    data: 'hello',
                    event: 'message',
                };
                socketStateService.sendToAuth(eventInfo);
            }, 5000);
        }, 90000);
        it('[2] sendToAuth: send message to all socket belongs to id20', async (done) => {
            const i = '<<e2>>';
            const PORT = 3220;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id20 = 20;
            const id21 = 21;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id20,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
            });
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id20,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done();
            });
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id21,
                },
            });
            client3.on('message', message => {
                console.log(`${i} client3.on('message') ==> should not print`);
                expect(true).toEqual(false);
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(3);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(2);
                const authSockets = socketStateService.getAuthSockets(id20);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray.slice(0, 2));
                const eventInfo = {
                    authId: id20,
                    excludedSocketId: null,
                    data: 'hello',
                    event: 'message',
                };
                socketStateService.sendToAuth(eventInfo);
            }, 5000);
        }, 90000);
    });
    describe('[f] sendToGroup() ', () => {
        it('[1] send message to auth-id 1, 2, 3', async (done) => {
            const i = '<<f1>>';
            const PORT = 3310;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
                done1 = true;
                if (done4 && done2 && done3)
                    done();
            });
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done2 = true;
                if (done1 && done4 && done3)
                    done();
            });
            let done3 = false;
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {
                done3 = true;
                if (done1 && done2 && done4)
                    done();
            });
            let done4 = false;
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {
                done4 = true;
                if (done1 && done2 && done3)
                    done();
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(4);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3);
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray.slice(0, 2));
                const eventInfo = {
                    excludedSocketId: null,
                    data: 'hello',
                    event: 'message',
                    groupId: 1,
                };
                socketStateService.sendToGroup(eventInfo);
            }, 5000);
        }, 90000);
    });
    describe('[g] emitToAllAuth() ', () => {
        it('[1] send message to all', async (done) => {
            const i = '<<g1>>';
            const PORT = 3410;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            socketStateService.injectSocketServer(server);
            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
                done1 = true;
                if (done4 && done2 && done3)
                    done();
            });
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done2 = true;
                if (done1 && done4 && done3)
                    done();
            });
            let done3 = false;
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {
                done3 = true;
                if (done1 && done2 && done4)
                    done();
            });
            let done4 = false;
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {
                done4 = true;
                if (done1 && done2 && done3)
                    done();
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(4);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3);
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray.slice(0, 2));
                const eventInfo = {
                    data: 'hello',
                    event: 'message',
                };
                socketStateService.emitToAllAuth(eventInfo);
            }, 5000);
        }, 90000);
    });
    describe('[h] emitToAllAuthenticatedAuth() ', () => {
        it('[1] send message to all', async (done) => {
            const i = '<<g1>>';
            const PORT = 3410;
            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            server = require('socket.io')(PORT);
            socketStateService.injectSocketServer(server);
            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {
                expect(message).toEqual('hello');
                done1 = true;
                if (done4 && done2 && done3)
                    done();
            });
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {
                expect(message).toEqual('hello');
                done2 = true;
                if (done1 && done4 && done3)
                    done();
            });
            let done3 = false;
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {
                done3 = true;
                if (done1 && done2 && done4)
                    done();
            });
            let done4 = false;
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {
                done4 = true;
                if (done1 && done2 && done3)
                    done();
            });
            const clientArray = [];
            let connectionCount = 0;
            server.on('connection', clientSocket => {
                var _a;
                connectionCount++;
                const token = parseInt((_a = clientSocket.handshake.query) === null || _a === void 0 ? void 0 : _a.token);
                const result = socketStateService.add(token, clientSocket);
                expect(result).toEqual(true);
                clientArray.push(clientSocket);
            });
            setTimeout(async () => {
                expect(connectionCount).toEqual(4);
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3);
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2);
                expect(authSockets).toEqual(clientArray.slice(0, 2));
                const eventInfo = {
                    data: 'hello',
                    event: 'message',
                };
                socketStateService.emitToAllAuthenticatedAuth(eventInfo);
            }, 5000);
        }, 90000);
    });
});
//# sourceMappingURL=socket-state.service.spe.js.map