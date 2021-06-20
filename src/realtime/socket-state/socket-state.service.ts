import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { tap } from 'rxjs/operators';
import { SocketEventSendDTO } from './dto/socket-event-send.dto';
import { SocketEventEmitDTO } from './dto/socket-event-emit.dto';
import { EmitEventToGroupDto } from './dto/emit_event_to_group.dto';
import { EmitEventToAuthDto } from './dto/emit_event_to_user.dto';

@Injectable()
export class SocketStateService {
  private socketServer: Server;
  //#region  Definition
  // there are some socket that failed to authentication witch there is not in this Map
  private socketStore = new Map<number, Socket[]>();

  // Changing the socketStateAdapter
  // We have also created an injectSocketServer method that
  // lets us inject a WebSocket server instance into our service.
  // It would be better to do this through a dependency injection,
  // but it’s not really possible when writing a custom adapter.
  // Nevertheless, with this method in place, we have to adjust the code of the adapter:
  // public injectSocketServer(server: Server): RedisPropagatorService {
  public injectSocketServer(server: Server): void {
    this.socketServer = server;
  }
  //#endregion

  //#region  Socket
  public remove(authId: number, socket: Socket): boolean {
    const existingSockets = this.socketStore.get(authId)

    if (!existingSockets) {
      return true
    }

    const sockets = existingSockets.filter(s => s.id !== socket.id)

    if (!sockets.length) {
      this.socketStore.delete(authId)
    } else {
      this.socketStore.set(authId, sockets)
    }

    return true
  }
  
  public removeAll(): boolean {

    // this.socketStore = new Map<number, Socket[]>();
    this.socketStore.clear();

    return true;
    
  }

  public add(authId: number, socket: Socket): boolean {
    // console.log('add() authID: ', authId);

    const existingSockets = this.socketStore.get(authId) || []

    const sockets = [...existingSockets, socket]

    this.socketStore.set(authId, sockets)

    return true
  }

  public getAuthSockets(authId: number): Socket[] {
    return this.socketStore.get(authId) || []
  }
  
  public getGroupMembers(groupId: number): number[] {
    // 🎯 TODO: take authId of member from DB
    const membersAuthId = [1, 2, 3];
    return membersAuthId;
  }
  

  // getting all the authenticated sockets
  public getAll(): Socket[] {
    
    const all = []

    // this.socketStore.forEach(sockets => all.push(sockets));

    for( let sockets of this.socketStore.values() ) {
      all.push( ...sockets );
    }

    return all;
  }
  
  public getSocketStore() {

    return this.socketStore.keys();
    // return this.socketStore.get(11);
  }
  
  public getSocketsSize(): number {
    return this.socketStore.size;
  }
  //#endregion
  
  // #region Messaging
  //## define the methods used for listening for events...

  // listen to the Redis event that tells us to send an event to a specified auth.
  //[send event to other socket or devices belongs to this auth]
  // public consumeSendEvent = (eventInfo: SocketEventSendDTO): void => {
  public sendToSiblingSockets = (eventInfo: SocketEventSendDTO): void => {
    // socketId: current socket that sending message
    const { authId, socketId, event, data } = eventInfo;

    // every auth may have a few sockets
    return  this.getAuthSockets(authId)
      // we sent event to other socket that belong to authId auth
      .filter((socket) => socket.id !== socketId)
      .forEach((socket) => socket.emit(event, data));
  };
  
  // send to all socket related to auth
  public sendToAuth = (eventInfo: EmitEventToAuthDto): void => {
    // socketId: current socket that sending message
    const { authId, excludedSocketId, event, data } = eventInfo;

    // every auth may have a few sockets
    return  this.getAuthSockets(authId)
      .filter((socket) => socket.id !== excludedSocketId)
      .forEach((socket) => socket.emit(event, data));
  };
  
  // send to all socket related to auth
  public sendToGroup = (eventInfo: EmitEventToGroupDto): void => {
    // socketId: current socket that sending message
    // const { groupId, event, data, excludedSocketId } = eventInfo;

    // ToDo: only people that are member of group and have authority can send message
    return  this.getGroupMembers(eventInfo.groupId) // [1, 2, 3]
      .forEach((authId) => {
        const authEventInfo: EmitEventToAuthDto = { authId: authId, ...eventInfo};
        this.sendToAuth(authEventInfo);
      });
  };

  // emit the event to all currently open connections, authenticated or not.
  // public consumeEmitToAllEvent = ( eventInfo: SocketEventEmitDTO ): void => {
  public emitToAllAuth = ( eventInfo: SocketEventEmitDTO ): void => {
    this.socketServer.emit(eventInfo.event, eventInfo.data);
  };

  // public consumeEmitToAuthenticatedEvent = (
  public emitToAllAuthenticatedAuth = ( eventInfo: SocketEventEmitDTO ): void => {
    const { event, data } = eventInfo;

    // getting all the authenticated sockets
    return this.getAll()
      .forEach((socket) => socket.emit(event, data));
  };

  // this method will be called each time our socket server dispatches an event to the [specific] frontend client.
  // we use the propagateEvent method
    // to send the event across all of our instances.
    // The event is then sent to the frontend client.
    // This is why we keep track of the socket the event originated on:
    // to ensure we don’t send the same event on the same socket twice.
  public propagateEvent(eventInfo: SocketEventSendDTO): boolean {
    // we don’t want to publish the event unless the authId is provided.
    if (!eventInfo.authId) {
      return false;
    }

    // this.redisService.publish(REDIS_SOCKET_EVENT_SEND_NAME, eventInfo);
    
    return true;
  }
  //#endregion

}
