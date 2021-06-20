import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { tap, mergeMap, filter, map } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Server } from 'socket.io';

import { RedisService } from '../redis/redis.service';
import { SocketStateService } from '../socket-state/socket-state.service';

import { RedisSocketEventEmitDTO } from './dto/socket-event-emit.dto';
import { RedisSocketEventSendDTO } from './dto/socket-event-send.dto';
import { LogColor } from '../../util/log_color';

import {
  REDIS_SOCKET_EVENT_EMIT_ALL,
  REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED,
  REDIS_SOCKET_EVENT_EMIT_USER,
  REDIS_SOCKET_EVENT_EMIT_GROUP,
  REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS,
  REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS
} from './redis-propagator.constants';
import { EmittoGroupDto } from './dto/emit-to-group.dto';
import { AuthenticatedSocket } from '../socket-state/socket-state.adapter';
import { ChatService } from 'src/chat/chat.service';
import { EmitClientStatusEvent } from './dto/emit-client-staus-event.dto';
import { WatchClientStatusDto } from './dto/request-client-status.dto';
import { WatchClientStatusEvent } from './dto/request-client-status-event.dto';
import { EmittoAuthDto } from './dto/emit-to-user.dto';

@Injectable()
// service for dispatching events across all instances of the application
// we will be listening to any incoming Redis events from other instances and
// dispatch events to them as well
export class RedisPropagatorService {
  private socketServer: Server;
  private logger = new Logger('RedisPropagatorService');

  public constructor(
    private readonly socketStateService: SocketStateService,
    private readonly redisService: RedisService,
  ) {
    // Creating event listeners in RedisPropagatorService
    // we would heart to listen to the events coming from other instances.
    // this.logger.log([APP_FLOW: 9:1 ]; Binding Channel and Method
    // this.redisService
    //   .fromEvent(REDIS_SOCKET_EVENT_EMIT_USER)
    //   .pipe(tap(this.consumeSendEvent))
    //   .subscribe();
    
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_USER)
      .pipe(tap(this.consumeSendEventtoAuth))
      .subscribe();
    
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_GROUP)
      .pipe(tap(this.consumeSendEventtoGroup))
      .subscribe();
    
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS)
      .pipe(tap(this.consumeEmitClientStatus))
      .subscribe();
    
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS)
      .pipe(tap(this.consumeWatchClientStatus))
      .subscribe();

    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_ALL)
      .pipe(tap(this.consumeEmitToAllEvent))
      .subscribe();

    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED)
      .pipe(tap(this.consumeEmitToAuthenticatedEvent))
      .subscribe();
  }


  // Changing the socketStateAdapter
  // We have also created an injectSocketServer method that
  // lets us inject a WebSocket server instance into our service.
  // It would be better to do this through a dependency injection,
  // but it’s not really possible when writing a custom adapter.
  // Nevertheless, with this method in place, we have to adjust the code of the adapter:
  public injectSocketServer(server: Server): RedisPropagatorService {
    this.socketServer = server;

    return this;
  }

  
  //#region TO_USER
  // send event to  auth
  public publishEmittoAuth(eventInfo: EmittoAuthDto): boolean {
    this.logger.log(`[APP_FLOW: 9 ] - publishEmittoAuth() argument eventInfo> ${JSON.stringify(eventInfo)}`);

    if (!eventInfo.authId) {
      return false;
    }

    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_USER, eventInfo);
    
    return true;
  }
  private consumeSendEventtoAuth = (eventInfo: EmittoAuthDto): void => {
    this.logger.log(`[APP_FLOW: 14 (Auth) ] - consumeSendEventtoAuth() recived data> ${JSON.stringify(eventInfo)}`);
    const { authId, event, data, excludedSocketId } = eventInfo; 
    
    return this.socketStateService
      // every auth may have a few sockets
      .getAuthSockets(authId)
      // we sent event to other socket that belong to authId auth
      .filter((socket) => socket.id !== excludedSocketId)
      .forEach((socket) => socket.emit(event, data));
  };
  //#endregion
  
  //#region To_GROUP
  public publishEmittoGroup(eventInfo: EmittoGroupDto): boolean {
    this.logger.log(`[APP_FLOW: 9 ] - publishEmittoGroup() argument eventInfo> ${JSON.stringify(eventInfo)}`);

    // if (!eventInfo.senderAuthId) {
    //   return false;
    // }

    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_GROUP, eventInfo);
    
    return true;
  }
  // send event to  Group
  private consumeSendEventtoGroup = (eventInfo: EmittoGroupDto): void => {
    this.logger.log(`[APP_FLOW: 14 (Group) ] - consumeSendEventtoGroup() recived data> ${JSON.stringify(eventInfo)}`);
    const { type, event, data, reciverAuthsId, groupId, senderAuthId, senderSocketId } = eventInfo; 

    return reciverAuthsId
    .flatMap( authId => this.socketStateService.getAuthSockets(authId))
    // we sent event to other socket that belong to authId auth
    .filter( socket => socket.id !== senderSocketId)
    .forEach( socket => socket.emit(event, data));
    // from(reciverAuthsId)
    // .pipe(
    //   mergeMap(authId => this.socketStateService.getAuthSockets(authId)),
    //   filter((socket: AuthenticatedSocket) => socket.id !== senderSocketId),
    //   map((socket: AuthenticatedSocket) => socket.emit(event, data))
    // )
    // .subscribe();
      // we sent event to other socket that belong to authId auth
      
  };

  //#endregion

  //#region ClientStatus
  // Front_End is emiting status of client heart: isOnline, isTyping, ...
  public publishEmitClientStatus(eventInfo: EmitClientStatusEvent): boolean {
    this.logger.log(`[APP_FLOW: 9 ] - publishEmitClientStatus() eventInfo> ${JSON.stringify(eventInfo)}`);

    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS, eventInfo);
    
    return true;
  }
  // send client status heart: isTyping, isOnline, ... to all subscriber
  private consumeEmitClientStatus = async (eventInfo: EmitClientStatusEvent): Promise<void> => {
    this.logger.log(`[APP_FLOW: 14 (Status) ] - consumeSendClientStatustoSubscriber() data> ${JSON.stringify(eventInfo)}`);
    
    //1) we got Celebrity new status
    const { type, event, data, client_status, senderAuthId, senderSocketId } = eventInfo; 
    
    
    //2) find some clients that watching this celebrity
    const flowerIds: string[] = await this.redisService.getFollowers(senderAuthId);

    // console.log('flowersIds:', flowerIds);

    flowerIds
    .flatMap( flowerId => this.socketStateService.getAuthSockets(parseInt(flowerId)))
    // we sent event to other socket that belong to authId auth
    .filter( socket => socket.id !== senderSocketId)
    // .forEach( socket => socket.emit(event, data));
    .forEach( socket => {
      // console.log('event: ', event);
      // console.log('data: ', data);
      // console.log('socket.id: ', socket.id);
      socket.emit(event, data);
    });
  };
  //#endregion

  //#region WatchClientStatus
  // Front_End has requested to be notified about some following
  public publishWatchClientStatus(eventInfo: WatchClientStatusDto): boolean {
    this.logger.log(`[APP_FLOW: 9 ] - publishWatchClientStatus() eventInfo> ${JSON.stringify(eventInfo)}`);

    this.redisService.publish(REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS, eventInfo);
    
    return true;
  }
  // Front_End has requested to be notified about some following
  private consumeWatchClientStatus = (eventInfo: WatchClientStatusEvent): void => {
    this.logger.log(`[APP_FLOW: 14 (Watch) ] - consumeSendClientStatustoSubscriber() data> ${JSON.stringify(eventInfo)}`);
    
    //1) front_end requested to listen to some celebrity
    const { type, event, data, followed_client_ids, emitted_at, senderAuthId, senderSocketId } = eventInfo; 
      
    //2) write this data in redis
    this.redisService.setFollowings(senderAuthId, followed_client_ids);
    
  };
  
  //#endregion

  //#region OLD
  // emit the event to all currently open connections, authenticated or not.
  private consumeEmitToAllEvent = ( eventInfo: RedisSocketEventEmitDTO ): void => {
    this.socketServer.emit(eventInfo.event, eventInfo.data);
  };         

  private consumeEmitToAuthenticatedEvent = (
    eventInfo: RedisSocketEventEmitDTO,
  ): void => {
    const { event, data } = eventInfo;

    return this.socketStateService
      // getting all the authenticated sockets
      .getAll()
      .forEach((socket) => socket.emit(event, data));
  };

  // this method will be called each time our socket server dispatches an event to the [specific] frontend client.
  // we use the propagateEvent method
  // to send the event across all of our instances.
  // The event is then sent to the frontend client.
  // This is why we keep track of the socket the event originated on:
  // to ensure we don’t send the same event on the same socket twice.
  public propagateEvent(eventInfo: RedisSocketEventSendDTO): boolean {
    this.logger.log(`[APP_FLOW: 9 ] - propagateEvent() argument eventInfo> ${JSON.stringify(eventInfo)}`);
    // console.log(LogColor.BgCyan, "@propagateEvent> " + JSON.stringify(eventInfo));
    // we don’t want to publish the event unless the authId is provided.
    if (!eventInfo.authId) {
      return false;
    }

    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_USER, eventInfo);
    
    return true;
  }

  // send event to other sockets related to this auth
  private consumeSendEvent = (eventInfo: EmittoAuthDto): void => {
    this.logger.log(`[APP_FLOW: 14 (Event) ] - consumeSendEvent() recived data> ${JSON.stringify(eventInfo)}`);
    const { authId, excludedSocketId, event, data } = eventInfo; 
    
    return this.socketStateService
      // every auth may have a few sockets
      .getAuthSockets(authId)
      // we sent event to other socket that belong to authId auth
      .filter((socket) => socket.id !== excludedSocketId)
      .forEach((socket) => socket.emit(event, data));
  };

  public emitToAuthenticated(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(
      REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED,
      eventInfo,
    );

    return true;
  }

  public emitToAll(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_ALL, eventInfo);

    return true;
  }
  //#endregion
  
}
