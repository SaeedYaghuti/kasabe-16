import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import Redis from 'ioredis';
// import { tap, mergeMap, filter, map } from 'rxjs/operators';
import { RedisService } from '../redis/redis.service';
import { REDIS_DB, REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from '../redis/redis.constants';
import { SocketStateService } from './socket-state.service';
import { RedisPropagatorService } from '../redis-propagator/redis-propagator.service';
// import { EmittoAuthDto } from '../redis-propagator/dto/emit-to-auth.dto';
// import { EnumEmitTypes } from '../redis-propagator/types/emit_types.enum';
import * as io from 'socket.io-client';
// import { EventEmitter } from 'events';
// import * as http from 'http';
// import ioBack from 'socket.io';
// import { async } from 'rxjs/internal/scheduler/async';
import { SocketEventSendDTO } from './dto/socket-event-send.dto';
// import { EmitEventToAuthDto } from './dto/emit_event_to_auth.dto';
import { EmitEventToAuthDto } from './dto/emit_event_to_user.dto';
import { EmitEventToGroupDto } from './dto/emit_event_to_group.dto';
import { SocketEventEmitDTO } from './dto/socket-event-emit.dto';

export type RedisClient = Redis.Redis;

jest.setTimeout(90000);


describe('redis-propogator.service.spec.ts', () => {
  let app: INestApplication;
  
  let redisService: RedisService;
  let socketStateService: SocketStateService;
  let redisPropagatorService: RedisPropagatorService;
  let redisSubscriberClient: RedisClient;
  let redisPublisherClient: RedisClient;
  let redisDB: RedisClient;

  let server;
  let client1: SocketIOClient.Socket;
  let client2: SocketIOClient.Socket;
  let client3: SocketIOClient.Socket;
  let client4: SocketIOClient.Socket;


  beforeEach(async () => {
   
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
    
    // server = require('socket.io')(3000); 
    
  });

//   afterEach(async done => {
//       server?.close();

//       client1?.close();
//       client2?.close();
//       client3?.close();
//       done();
//   })

  beforeEach(async (done) => {

      await redisDB.flushall();
      await redisSubscriberClient.removeAllListeners();
      await redisPublisherClient.removeAllListeners();

      server?.removeAllListeners();
      server?.close();
      
      client1?.removeAllListeners();
      client1?.disconnect();
      client1?.close();

      client2?.removeAllListeners();
      client2?.disconnect();
      client2?.close();

      client3?.removeAllListeners();
      client3?.disconnect();
      client3?.close();
      
      client4?.removeAllListeners();
      client4?.disconnect();
      client4?.close();

      done();

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


    describe('[b] make server and client ', () => {

        it('[1] transfer data between server and client', async (done) => {
                
            const index = '<<b1>>';
            const PORT = 3000;

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);


            // 🚧 2️⃣  🧱 📱                               🚧 
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 1,
                },
            });

            // 💻
            server.on('connection', clientSocket => {

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);

                clientSocket.emit('Hello', "Hello client!");

                // 📱
                clientSocket.on('customerId', data => {

                    // console.log('[3] server.on(customerId) data: ', data);
                    expect(data).toEqual({ customerId: 10 });

                    server.close();

                    done();

                })

            })

            // 📱
            client1.on('Hello', data => {

                // console.log('[2] client1.on(Hello) data:', data);
                expect(data).toEqual("Hello client!");

                // done();


                const info = {
                    customerId: 10,
                }

                client1.emit('customerId', info);

            });
        
        }, 90000);
        
        it('[2] extract token from client-socket', async (done) => {
                
            const index = '<<b1>>';
            const PORT = 3020;

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);
            

            // 🚧 2️⃣  🧱 📱                               🚧 
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 1,
                },
            });

            // 💻
            server.on('connection', clientSocket => {

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                expect(clientSocket.handshake.query?.token).toEqual("1");

                server.close();

                done();
                

            })

            
        
        }, 90000);
    
    });
    
    describe('[c] add() ', () => {
        it('[1] add client-socket to socket-store', async (done) => {
                
            const index = '<<c1>>';

            const PORT = 3010;


            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);
            

            // 🚧 2️⃣  🧱 📱                               🚧 
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 10,
                },
            });

            // 💻
            server.on('connection', clientSocket => {

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                // add()
                const auth_id = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( auth_id, clientSocket);

                expect(result).toEqual(true);

                expect(clientSocket.handshake.query?.token).toEqual("10");

                const fSockets = socketStateService.getAuthSockets(auth_id);

                expect(fSockets.length).toEqual(1);

                expect(fSockets[0]).toEqual(clientSocket);

                server.close();
                client1.disconnect();
                client1.removeAllListeners();
                client1.close();

                done();
                
            })
        
        }, 90000);
    
        it('[2] add with string key', async (done) => {
                
            const i = '<<c2>>';

            const PORT = 3020;


            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);
            

            // 🚧 2️⃣  🧱 📱                               🚧 
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: 20,
                },
            });

            const clientArray = [];

            let connectionCount = 0;

            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;


                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);


                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                // add()
                const auth_id = parseInt( clientSocket.handshake.query?.token );

                // console.log('typeof auth_id', typeof auth_id);
                // console.log('auth_id', auth_id);
                
                const result = socketStateService.add( auth_id, clientSocket);

                expect(result).toEqual(true);

                expect(clientSocket.handshake.query?.token).toEqual("20");

                const fSockets = socketStateService.getAuthSockets(auth_id);

                expect(fSockets.length).toEqual(1);

                expect(fSockets[0]).toEqual(clientSocket);

                server.close();
                // client1.close();
                // client1.removeAllListeners();

                done();
                
            })
        
        }, 90000);
    
        it('[3] add two instance for a auth-id', async (done) => {
                
            const i = '<<c3>>';

            const PORT = 3030;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            
            const fSockets = socketStateService.getAuthSockets(1);
            expect(fSockets.length).toEqual(0);

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const auth_id = 30;
            

            // 🚧 2️⃣  🧱 📱                               🚧 
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


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                // add()
                const token = parseInt( clientSocket.handshake.query?.token );
                
                // 🚩 parseInt(token)
                const result = socketStateService.add( token, clientSocket);

                expect(result).toEqual(true);

                clientArray.push(clientSocket);

            });

            setTimeout(() => {

                expect(connectionCount).toEqual(2);

                expect(clientArray.length).toEqual(2);

                const store = socketStateService.getSocketStore();
                // console.log('#### all stor: ', store);

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
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id41 = 41;
            const id42 = 42;
            

            // 🚧 2️⃣  🧱 📱                               🚧 
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


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                // add()
                const token = parseInt( clientSocket.handshake.query?.token );
                
                // 🚩 parseInt(token)
                const result = socketStateService.add( token, clientSocket);

                expect(result).toEqual(true);

                clientArray.push(clientSocket);

            });

            setTimeout(() => {

                expect(connectionCount).toEqual(2);

                expect(clientArray.length).toEqual(2);

                const store = socketStateService.getSocketStore();
                // console.log('#### all stor: ', store);

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
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id51 = 51;
            const id52 = 52;
            

            // 🚧 2️⃣  🧱 📱                               🚧 
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


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // console.log('[1] server.on(connection) clientSocket.id: ', clientSocket.id);
                // console.log('[1] clientSocket.handshake.query?.token: ', clientSocket.handshake.query?.token);
                
                // add()
                // 🚩 parseInt(token)
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

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
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id10 = 10;
            const id11 = 11;
            

            // 🚧 2️⃣  🧱 📱                               🚧 
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> should not print `);

                expect(message).toEqual('hello');
                
                // done();

            })
            
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') `);

                expect(message).toEqual('hello');

                // server.close();

                // client1.disconnect();
                // client1.removeAllListeners();
                // client1.close();
                
                // client2.disconnect();
                // client2.removeAllListeners();
                // client2.close();
                
                done();

            })

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(2);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(1); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id10);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray); 

                const eventInfo: SocketEventSendDTO = {
                    authId: id10,
                    socketId: clientArray[0].id,
                    data: 'hello',
                    event: 'message',
                }
                socketStateService.sendToSiblingSockets(eventInfo);

                // done();

            }, 5000);
        
        }, 90000);
     
    });
    
    describe('[e] sendToAuth() ', () => {

        it('[1] sendToAuth: send message to sibling client2', async (done) => {
                
            const i = '<<e1>>';

            const PORT = 3210;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id10 = 10;
            const id11 = 11;
            

            // 🚧 2️⃣  🧱 📱                                🚧 
            // 🐵
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> only client1 or client2 `);

                expect(message).toEqual('hello');
                
                done();

            })
            
            // 🦊
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id10,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') ==> only client1 or client2 `);

                expect(message).toEqual('hello');
                
                done();

            });
            
            // 🐔
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id11,
                },
            });
            client3.on('message', message => {

                // console.log(`${i} client3.on('message') ==> should not print`);

                expect(true).toEqual(false); // shouldn't run
                
                // done();

            });

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(3);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(2); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id10);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray.slice(0,2)); 

                const eventInfo: EmitEventToAuthDto = {
                    authId: id10,
                    excludedSocketId: clientArray[0].id,
                    data: 'hello',
                    event: 'message',
                }
                socketStateService.sendToAuth(eventInfo);

                // done();

            }, 5000);
        
        }, 90000);
     
        it('[2] sendToAuth: send message to all socket belongs to id20', async (done) => {
                
            const i = '<<e2>>';

            const PORT = 3220;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id20 = 20;
            const id21 = 21;
            

            // 🚧 2️⃣  🧱 📱                                🚧 
            // 🐵
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id20,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> both client1 or client2 `);

                expect(message).toEqual('hello');
                
                // done();

            })
            
            // 🦊
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id20,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') ==> both client1 or client2 `);

                expect(message).toEqual('hello');
                
                done();

            });
            
            // 🐔
            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id21,
                },
            });
            client3.on('message', message => {

                console.log(`${i} client3.on('message') ==> should not print`);

                expect(true).toEqual(false);
                
                // done();

            });

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(3);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(2); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id20);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray.slice(0,2)); 

                const eventInfo: EmitEventToAuthDto = {
                    authId: id20,
                    excludedSocketId: null,
                    data: 'hello',
                    event: 'message',
                }
                socketStateService.sendToAuth(eventInfo);

                // done();

            }, 5000);
        
        }, 90000);
     
    });
    
    describe('[f] sendToGroup() ', () => {

        it('[1] send message to auth-id 1, 2, 3', async (done) => {
                
            const i = '<<f1>>';

            const PORT = 3310;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            

            // 🚧 2️⃣  🧱 📱                                🚧 
            // 🐵
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> all client should print `);

                expect(message).toEqual('hello');
                
                done1 = true;

                if (done4 && done2 && done3) done();

            })
            
            // 🦊
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') ==> all client should print `);

                expect(message).toEqual('hello');

                done2 = true;
                
                if (done1 && done4 && done3) done();

            });
            
            // 🐔
            let done3 = false;

            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {

                // console.log(`${i} client3.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done3 = true;
                
                if (done1 && done2 && done4) done();

            });
            
            // 🐴
            let done4 = false;
            
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {

                // console.log(`${i} client4.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done4 = true;

                if (done1 && done2 && done3) done();

            });

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(4);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray.slice(0,2)); 

                const eventInfo: EmitEventToGroupDto = {
                    excludedSocketId: null,
                    data: 'hello',
                    event: 'message',
                    groupId: 1,
                }
                socketStateService.sendToGroup(eventInfo);

                // done();

            }, 5000);
        
        }, 90000);
     
    });
    
    describe('[g] emitToAllAuth() ', () => {

        it('[1] send message to all', async (done) => {
                
            const i = '<<g1>>';

            const PORT = 3410;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            // 🚩 set server in socketServerState
            socketStateService.injectSocketServer(server);

            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            

            // 🚧 2️⃣  🧱 📱                                🚧 
            // 🐵
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> all client should print `);

                expect(message).toEqual('hello');
                
                done1 = true;

                if (done4 && done2 && done3) done();

            })
            
            // 🦊
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') ==> all client should print `);

                expect(message).toEqual('hello');

                done2 = true;
                
                if (done1 && done4 && done3) done();

            });
            
            // 🐔
            let done3 = false;

            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {

                // console.log(`${i} client3.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done3 = true;
                
                if (done1 && done2 && done4) done();

            });
            
            // 🐴
            let done4 = false;
            
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {

                // console.log(`${i} client4.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done4 = true;

                if (done1 && done2 && done3) done();

            });

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(4);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray.slice(0,2)); 

                const eventInfo: SocketEventEmitDTO = {
                    data: 'hello',
                    event: 'message',
                }
                socketStateService.emitToAllAuth(eventInfo);

                // done();

            }, 5000);
        
        }, 90000);
     
    });
    
    describe('[h] emitToAllAuthenticatedAuth() ', () => {

        it('[1] send message to all', async (done) => {
                
            const i = '<<g1>>';

            const PORT = 3410;

            const remove = socketStateService.removeAll();
            expect(remove).toEqual(true);
            

            // 🚧 1️⃣  🧱 💻                              🚧 
            server = require('socket.io')(PORT);

            // 🚩 set server in socketServerState
            socketStateService.injectSocketServer(server);

            const id1 = 1;
            const id2 = 2;
            const id3 = 3;
            

            // 🚧 2️⃣  🧱 📱                                🚧 
            // 🐵
            let done1 = false;
            client1 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client1.on('message', message => {

                // console.log(`${i} client1.on('message') ==> all client should print `);

                expect(message).toEqual('hello');
                
                done1 = true;

                if (done4 && done2 && done3) done();

            })
            
            // 🦊
            let done2 = false;
            client2 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id1,
                },
            });
            client2.on('message', message => {

                // console.log(`${i} client2.on('message') ==> all client should print `);

                expect(message).toEqual('hello');

                done2 = true;
                
                if (done1 && done4 && done3) done();

            });
            
            // 🐔
            let done3 = false;

            client3 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id2,
                },
            });
            client3.on('message', message => {

                // console.log(`${i} client3.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done3 = true;
                
                if (done1 && done2 && done4) done();

            });
            
            // 🐴
            let done4 = false;
            
            client4 = io.connect(`http://localhost:${PORT}`, {
                query: {
                    token: id3,
                },
            });
            client4.on('message', message => {

                // console.log(`${i} client4.on('message') ==> all client should print `);

                // expect(true).toEqual(false);

                done4 = true;

                if (done1 && done2 && done3) done();

            });

            const clientArray = [];

            let connectionCount = 0;


            // 💻
            server.on('connection', clientSocket => {

                connectionCount++;

                // console.log(`${i} Time: ${connectionCount} - clientSocket.id:  ${clientSocket.id} - token:  ${clientSocket.handshake.query?.token}`);

                // 🚧  add socket to store 🚧
                const token = parseInt( clientSocket.handshake.query?.token );
                
                const result = socketStateService.add( token, clientSocket );

                expect(result).toEqual(true);

                clientArray.push(clientSocket);


            });

            setTimeout(async () => {

                expect(connectionCount).toEqual(4);
                
                const socketSize = socketStateService.getSocketsSize();
                expect(socketSize).toEqual(3); // 🚩 each authId make one row
                
                const authSockets = socketStateService.getAuthSockets(id1);
                expect(authSockets.length).toEqual(2); 
                expect(authSockets).toEqual(clientArray.slice(0,2)); 

                const eventInfo: SocketEventEmitDTO = {
                    data: 'hello',
                    event: 'message',
                }
                socketStateService.emitToAllAuthenticatedAuth(eventInfo);


            }, 5000);
        
        }, 90000);
     
    });
    
    
  
});
