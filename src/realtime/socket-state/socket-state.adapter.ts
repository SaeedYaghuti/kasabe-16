import { INestApplicationContext, WebSocketAdapter, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketio from 'socket.io';

import { RedisPropagatorService } from '../redis-propagator/redis-propagator.service';

import { SocketStateService } from './socket-state.service';
import { AuthService } from '../../auth/auth.service';

import * as WebSocket from 'ws';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter, tap } from 'rxjs/operators';
import { LogColor } from 'src/util/log_color';
import { initAdapters } from '../../adapters.init';

interface TokenPayload {
  readonly authId: number;
}

export interface AuthenticatedSocket extends SocketIO.Socket {
  auth: TokenPayload;
  intercept: string;
}

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
  public constructor(
    private readonly app: INestApplicationContext,
    private readonly socketStateService: SocketStateService,
    // private readonly redisPropagatorService: RedisPropagatorService,
    // 🎯❌ change for test
    // private readonly authService: AuthService,
  ) {
    super(app);
  }

  private logger = new Logger('SocketStateAdapter');
  
  // Creates a socket instance based on passed arguments
  public create(port: number, options: socketio.ServerOptions = {}): socketio.Server {
    this.logger.log('[APP_FLOW: 1 ] : CREATE(); create() socket instance; add authentication to it ');
    // during the creation of the WebSocket server,
    const server = super.createIOServer(port, options);
    
    // we simply inject it into our singleton service.
    // TODO: Comment this line
    // this.redisPropagatorService.injectSocketServer(server);
    this.socketStateService.injectSocketServer(server);

    server.use(
      // This middleware will be executed beforehand, 
      // so we can safely check for the auth property on the socket object.
      async (socket: AuthenticatedSocket, next) => {
          const token = socket.handshake.query?.token || socket.handshake.headers?.authorization;
          this.logger.log('[APP_FLOW: 1 ] : token: ' + token);
          if (!token) {
            socket.auth = null;

            // not authenticated connection is still valid
            // thus no error
            // to carry on with the execution of other middleware
            return next();
          }

          try {
            // If there were a token we would normally check and validate it with an AuthService
            // extract auth-data from database according to token

            // The token validation is placed inside a try/catch block
            //  since a token validation method can throw an error.

            socket.auth = {
              authId: parseInt(token),
            };

            return next();
          } catch (e) {
            // If token validation method throw an error, 
            // we should catch it and call next with the error param
            //  to indicate to socket.io that an error has occurred.
            return next(e);
          }
    });

    return server;
  }


  // takes care of registering connections listeners in our socket server
  // Binds the client connection event
  public bindClientConnect(server: socketio.Server, callback: Function): void {
    this.logger.log('[APP_FLOW: 2 ] : bindClientConnect(); when socket connect we add it to arrya and add some event listener');

    // Here we have access to the server, where we can listen on the connect event
    server.on('connection', (socket: AuthenticatedSocket) => {

      // The middleware we defined in the create method will be executed beforehand, 
      // so we can safely check for the auth property on the socket object.
      if (socket.auth) {
        this.socketStateService.add(socket.auth.authId, socket);

        socket.on('disconnect', () => {
          this.socketStateService.remove(socket.auth.authId, socket);

          // to be perfectly sure we don’t have any memory leaks
          // we use the removeAllListeners method of the socket object
          // to remove the disconnect event listener.
          socket.removeAllListeners('disconnect');
        });
      }

      // Regardless of whether there has been the auth property,
      // we have to call the callback function provided as the second argument
      // to let the socket.io adapter keep the reference to the socket as well.
      callback( socket );
    });
  }

  // Binds the incoming message to the corresponding message handler
  // [all message that are emitted from Front_end first go through here]
  // this method will run for each new socket from front-end that connect or reconnect to server
  public bindMessageHandlers(
    socket: WebSocket,
    // handlers: all method that has @SubscribeMessage('chatToServer')
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    this.logger.log('[APP_FLOW: 3 ] : bindMessageHandlers(); bind handler with socket event ');
    handlers.forEach(({ message, callback }) => {
      // socket.on('chatToServer', function (data, ack) {
      //   // data: Is messagee that sent by front_end
      //   // ack: callback or acknoledge function defined by front_end
      //     console.log('DATA', data);
      //     // ack('woot');
      //     ack();
      // });
      // message: it is event-name registered in MessageHandler; for example => ChatToOne, ChatToServer, test, ...
      // console.log(LogColor.BgGreen, "socket-state.adapter.ts> handlers.message " + message);
      fromEvent(socket, message)
      .pipe(
        // data: each socket that emit event with name of message$ we get the data$ that sent by it
        // data: sent by front-end socket
        tap(data => {
          // console.log(LogColor.BgRed, "socket-state.adapter.ts> fromEvent.data " + JSON.stringify(data))
          this.logger.log(`[APP_FLOW: 4 - Start_Routine ] : A socket has sent data> : ${JSON.stringify(data)} to server by event name> ${JSON.stringify(message)}`);
          }),
        // process(callback(data)): will run the messageHandler"
        mergeMap(data => process(callback(data))),
        // result$: is return from handler
        tap(result => {
          // console.log(LogColor.BgYellow, "socket-state.adapter.ts> fromEvent.result " + JSON.stringify(result));
          this.logger.log(`[APP_FLOW: 11 ] - mergeMap result>  ${JSON.stringify(result)}`);
        }),
        filter(result => !!result && result.event),
      )
      .subscribe(({ event, data }) => {
        this.logger.log(`[APP_FLOW: 12 ] - subscribe(): eviting event to client event> ${JSON.stringify(event)}, data> ${JSON.stringify(data)}`);
        // emit to sender itself
        // socket.emit(event, data);
      });
    });

   }
  
}
