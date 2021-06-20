import { UseInterceptors, BadGatewayException } from '@nestjs/common';
import { SubscribeMessage, 
        WebSocketGateway, 
        WebSocketServer, 
        WsResponse, 
        OnGatewayInit,
        OnGatewayConnection, 
        OnGatewayDisconnect,
        ConnectedSocket,
        MessageBody
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket, Server, Client} from 'socket.io';

// import { RedisPropagatorInterceptor } from '../realtime/redis-propagator/redis-propagator.interceptor';
import { ChatService } from './chat.service';
import { AuthenticatedSocket } from '../realtime/socket-state/socket-state.adapter';
import { PropagatorInterceptor } from '../realtime/socket-state/propagator.interceptor';
import { SocketStateService } from '../realtime/socket-state/socket-state.service';
import { transformAndValidate } from "class-transformer-validator";
import { MessageCreateClientDto } from './models/message/dto/message_create_client.dto';
// import { validatorOptionsClient, validatorOptionsRoom } from '../common/util/validator_options';
import { validatorOptionsClient, validatorOptionsRoom } from '../common/util/validator_options';
import { EnumEmitTypes } from '../realtime/redis-propagator/types/emit_types.enum';
import { EmittoAuthDto } from '../realtime/redis-propagator/dto/emit-to-auth.dto';
import { EmitFeedbackType } from '../realtime/redis-propagator/types/emit-feedback.type';
import { EmittoGroupDto } from '../realtime/redis-propagator/dto/emit-to-group.dto';
import { EmitClientStatusDto } from '../realtime/redis-propagator/dto/emit-client-status.dto';
import { EmitClientStatusEvent } from '../realtime/redis-propagator/dto/emit-client-staus-event.dto';
import { WatchClientStatusEvent } from '../realtime/redis-propagator/dto/request-client-status-event.dto';
import { WatchClientStatusDto } from '../realtime/redis-propagator/dto/request-client-status.dto';
import { ClientUpdateDto } from './models/client/dto/client_update.dto';


// we register the interceptor
// that emits the events across all instances. 
@UseInterceptors(PropagatorInterceptor)
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(
    private chatService: ChatService,
    private socketStateService: SocketStateService,

    // private redisPropagatorService: RedisPropagatorService,

    // not allowed
    // private authService: AuthService,

    // @Inject('PUB_SUB') 
    // private pubSub: PubSubEngine,
  ) {}

  //#region General
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    // this.logger.log('after init');
  }

  async handleConnection(socket: AuthenticatedSocket, ...args: any[]){
      // Notify ALL connected clients of current auths
      // this.server.emit(
      //   'msgToClient', 
      //   {
      //     sender: { authid: 'Messanger', socketid: '007'},
      //     reciver: { authid: socket?.auth?.authId, socketid: socket.id},
      //     message: 'Number of online auths: ' + this.auths,
      //     createdAt: new Date(),
      //   }
      // );
  }

  async handleDisconnect(socket: AuthenticatedSocket, ){
      // Notify all connected clients of current auths
      // this.server.emit(
      //   'msgToClient', 
      //   {
      //     sender: { authid: 'Messanger', socketid: '007'},
      //     reciver: { authid: socket?.auth?.authId, socketid: socket.id},
      //     message: 'Number of online auths: ' + this.auths,
      //     createdAt: new Date(),
      //   }
      // );
  }
  //#endregion
  @SubscribeMessage('msgToServer')
  handleMessage(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [data, cb]: any[],
  ): EmitFeedbackType {
    cb('success', null);
    return { 
      type: EnumEmitTypes.FEEDBACK, 
      event: 'msgToClient', 
      data:{ message: "feedback of msgToServer", req: data }
    };
  }
  
  // @SubscribeMessage('initDB')
  // async initDBHandler(
  //   @ConnectedSocket() socket: AuthenticatedSocket,
  //   @MessageBody() [rMessage, cb]: any[],
  // ): Promise<EmitFeedbackType> {
  //   this.logger.log(`[APP_FLOW: 6,7 ] - initDBHandler(); data> ${JSON.stringify(rMessage)}`);

  //   try {
  //     const initResult = await this.chatService.initDB({
  //       clients: false,
  //       rooms: false,
  //       room_clients: true,
  //     });

  //     cb(initResult);

  //   } catch (error) {
  //     this.logger.error('error while init DB: error>', error);
  //     cb(null, error);
  //   }
    
  //   return { 
  //     type: EnumEmitTypes.FEEDBACK, 
  //     event: 'msgToClient', 
  //     data:{ 
  //       message: "we are initialize DB; some of result will send by cb()", 
  //       req: rMessage,
  //      },
  //   };
  // }
  
  @SubscribeMessage('chatToServer')
  chatToServerHandler(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rMessage, cb]: any[],
  ): EmitFeedbackType {
    this.logger.log(`[APP_FLOW: 6,7 ] - chatToServerHandler(); data> ${JSON.stringify(rMessage)}`);

    // 🎯 TODO: check validity of data
    // this.chatService.messageCreate({
    //   sender_client_id: socket.auth.authId,
    //   ...rMessage
    // })
    this.chatService.messageCreate( rMessage, socket.auth.authId )
    .then(message => {
      // console.log('chat.gateway.ts message:', message);
      cb(message);
    })
    .catch(err => {
      // console.log('<<1>> error:', err);
      cb(null, err.message);
    });

    return { 
      type: EnumEmitTypes.FEEDBACK, 
      event: 'msgToClient', 
      data:{ 
        message: "your message delevered to server", 
        req: rMessage,
       },
    };
  }

  @SubscribeMessage('chatToOne')
  async chattoOneHandler(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rData, cb]: any[],  
  ): Promise<EmittoAuthDto>{
    this.logger.log(`[APP_FLOW: 6,7 ] - chattoOneHandler(); data> ${JSON.stringify(rData)}`);
    
    // console.log('chatToOne is running...');
    //alidate recived message
    let vData;
    try {
      vData = await transformAndValidate(
        MessageCreateClientDto,
        rData,
        {
          validator: validatorOptionsClient,
          // transformer: transformOptionsMsgToClient,
        });
      // console.log('message is validated');
    } catch (error) {
      
      // console.log('rData: ', rData);
      // console.log('message is NOT validated');
      // console.log(error);
      
      const eventData = {
        sender: { authid: "Admin", socketid: "007"},
        reciver: { authid: socket.auth.authId, socketid: socket.id},
        message: "There was problem in message you sent!",
        createdAt: new Date(),
      }

      cb(null, error);

      // when err happend we send
      return { 
        type: EnumEmitTypes.FEEDBACK, 
        event: 'msgToClient', 
        data:{ 
          message: eventData, 
          req: rData,
        },
        authId: socket.auth.authId,
        excludedSocketId: null,
      };
    }

    //TODO: May we should remove DB logic to consume() methodes
    let eventData;
    // this.chatService.messageCreate({
    //   sender_client_id: socket.auth.authId,
    //   ...vData
    // })
    this.chatService.messageCreate( vData, socket.auth.authId )
    .then(gMessage => {
      cb(gMessage);
      // Everything is OK; Sending Message to reciver
      eventData = {
        sender: { authid: socket.auth.authId, socketid: socket.id},
        reciver: { authid: gMessage.reciver_client_id, socketid: '_'},
        message: gMessage,
        createdAt: gMessage.created_at,
      }
    })
    .catch(err => {
      cb(null, err);
    });

    return { 
      type: EnumEmitTypes.USER, 
      event: 'msgToClient', 
      data:{ 
        message: "your message delevered to server", 
        eventData,
        req: vData,
      },
      authId: vData.reciver_client_id,
      excludedSocketId: null,
    };
  }

  @SubscribeMessage('chatToGroup')
  async chatToGroupHandler(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rData, cb]: any[],  
  ): Promise<EmittoGroupDto>{
    this.logger.log(`[APP_FLOW: 6,7 ] - chatToGroup; data> ${JSON.stringify(rData)}`);

    // validate recived message
    let vData; // validated data
    let eventData;
    try {
      // TODO: forbid extra element
      vData = await transformAndValidate(
        MessageCreateClientDto,
        rData,
        {
          validator: validatorOptionsRoom,
          // transformer: transformOptionsMsgToRoom,
        }
      );
      eventData = {
        sender: { authid: socket.auth.authId, socketid: socket.id},
        reciver: { authid: vData.reciver_room_id, socketid: '_'},
        message: vData,
        // TODO: sender created_at and db created_at may be different
        createdAt: vData.created_at,
      }
      // console.log('[1] message is validated');
    } catch (error) {
      // console.log('message is NOT validated');
      cb(null, error);
      // to prevent execution of next lines
      return;
    }
    
    // TODO: move DB logic to consume() methodes
    // step 2) save message to DB
    // this.chatService.messageCreate({
    //   sender_client_id: socket.auth.authId,
    //   ...vData
    // })

    this.chatService.messageCreate( vData, socket.auth.authId )
    .then(gMessage => {
      // cb(gMessage);
      // Everything is OK; Sending Message to reciver
      
    })
    .catch(err => {
      cb(null, err);
    });

    // step 1) get reciver authIds from DB
    try {
      const reciverIds: number[] = [];
      const clients = await this.chatService.clientsGetByRoomId(vData.reciver_room_id);

      // get Ids
      clients.forEach(client => {
        reciverIds.push(client.client_id);
      });

      cb(reciverIds);

      return { 
        type: EnumEmitTypes.GROUP,
        event: 'msgToClient',
        data: eventData,
  
        groupId: vData.reciver_room_id,
        reciverAuthsId: reciverIds,
        senderAuthId: socket.auth.authId,
        senderSocketId: socket.id,
      };
    } catch (error) {
      this.logger.error('<logger-Ax3O> Error while clientsGetByRoomId() DB Error: ', error);
      cb(null, error);
    }

    

  }
  
  // client send it's status to server: He isOnline, isTyping, ...
  @SubscribeMessage('emitClientStatus')
  async onEmitClientStatus(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rData, cb]: any[],  
  ): Promise<EmitClientStatusEvent | void>{
    this.logger.log(`[APP_FLOW: 6,7 ] - emitClientStatus; data> ${JSON.stringify(rData)}`);
    
    
    let vData: EmitClientStatusDto;
    let result: EmitClientStatusDto | EmitClientStatusDto[];
    
    try {

      result = await transformAndValidate(EmitClientStatusDto, rData);
      
      if ( Array.isArray(result) ) {
        vData = result[0];
      } else {
        vData = result;
      }

    } catch (error) {
      return cb(null, error);

      // ❓
      // throw new BadGatewayException();
    }

    // time should in the 2 past second
    // if ( new Date().getTime() > vData.emitted_at + 2000  ||  vData.emitted_at > new Date().getTime() ) {
    //   cb('Invalid Timstamp, vData: ' + vData);
    //   return console.log(vData + ' is Invalid number or Too past');
    // }

    cb(`Your status: ${vData.status}...`);

    return { 
      type: EnumEmitTypes.CLIENTSTATUS,
      event: 'msgToClient',
      data: vData, // Timestapmp that client start typing
      client_status: vData.status, // isOnline, isTyping, ...
      senderAuthId: socket.auth.authId,
      senderSocketId: socket.id,
    };
  }
  
  // client send it's status to server: He isOnline, isTyping, ...
  @SubscribeMessage('watchClientStatus')
  async onWatchClientStatus(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rData, cb]: any[],  
  ): Promise<WatchClientStatusEvent | void>{
    this.logger.log(`[APP_FLOW: 6,7 ] - onWatchClientStatus; data> ${JSON.stringify(rData)}`);
    
    let vData: WatchClientStatusDto;
    let result: WatchClientStatusDto | WatchClientStatusDto[];
    try {
      result = await transformAndValidate(WatchClientStatusDto, rData);
      if ( Array.isArray(result) ) {
        vData = result[0];
      } else {
        vData = result;
      }
    } catch (error) {
      return cb(null, error);

      // ❓
      // throw new BadGatewayException();
    }

    // time should in the 2 past second
    if ( new Date().getTime() > vData.emitted_at + 2000  ||  vData.emitted_at > new Date().getTime() ) {
      // console.log(vData + ' is Invalid number or Too past');
      return cb(null, 'Invalid Timstamp or too past: vData.emitted_at: ' + vData.emitted_at);
    }

    cb(`You will be notified about your folowers client`);

    return { 
      type: EnumEmitTypes.WATCHSTATUS,
      event: 'msgToClient',
      data: vData, 
      emitted_at: vData.emitted_at,
      followed_client_ids: vData.followed_client_ids,
      senderAuthId: socket.auth.authId,
      senderSocketId: socket.id,
    };
  }
 
  @SubscribeMessage('isOnline')
  async onIsOnline(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [rData, cb]: any[],  
  ){
    // rData should convert to number (as ms)
    try {
      rData = parseInt(rData);
    } catch (error) {
      cb('Invalid Timstamp, rData: ' + rData);
      return console.log(rData + ' is Invalid number');
    }

    // validation of input: time must be a number and not too late
    if ( typeof rData != "number" || ( new Date().getTime() > rData + 60000 ) ) {
      cb('Invalid Timstamp, rData: ' + rData);
      return console.log(rData + ' is Invalid number or Too late');
    }

    // update client to DB
    let nClient: ClientUpdateDto = {
      client_id: socket.auth.authId,
      last_seen: new Date(rData)
    };

    let uClient;
    try {
      uClient = await this.chatService.clientUpdate(nClient);
    } catch (error) {
      this.logger.error('!> Error while updating uClient at DB Error: ', error);
      cb(error);
      return false;
    }

    // this.logger.log('\"isOnline\" is working; uClient: ', uClient);

    cb();
  }

  @SubscribeMessage('chat')
  async onChat(socket: AuthenticatedSocket, [ message, cb ]){
      // console.log('we receve a chat', message, socket.id);
      cb();
      socket.broadcast.emit('chat', message);
  }

  @SubscribeMessage('test')
  public findAll1(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() [data, cb]: any[], 
  ): Observable<any> {
    // this.logger.log(`[APP_FLOW: 6 ] - findAll1(); event: "test" is trigered by ${JSON.stringify(socket.auth.authId)} intercepter added ${JSON.stringify(socket.intercept)} and data is ${data}`);
    // this.logger.log('\"test.\" is recived from client')
    cb();
    return from([44]).pipe(
      map((item) => {
        // this.logger.log(`[APP_FLOW: 7 ] - findAll1() returning { event: 'msgToClient', data:{ message: ${item}, test: "Are you getting me?"} };`);
        return { event: 'msgToClient', data:{ message: item } };
      }),
    );
  }
}
