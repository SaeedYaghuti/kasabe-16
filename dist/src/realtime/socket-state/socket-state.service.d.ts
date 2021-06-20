import { Socket, Server } from 'socket.io';
import { SocketEventSendDTO } from './dto/socket-event-send.dto';
import { SocketEventEmitDTO } from './dto/socket-event-emit.dto';
import { EmitEventToGroupDto } from './dto/emit_event_to_group.dto';
import { EmitEventToAuthDto } from './dto/emit_event_to_user.dto';
export declare class SocketStateService {
    private socketServer;
    private socketStore;
    injectSocketServer(server: Server): void;
    remove(authId: number, socket: Socket): boolean;
    removeAll(): boolean;
    add(authId: number, socket: Socket): boolean;
    getAuthSockets(authId: number): Socket[];
    getGroupMembers(groupId: number): number[];
    getAll(): Socket[];
    getSocketStore(): IterableIterator<number>;
    getSocketsSize(): number;
    sendToSiblingSockets: (eventInfo: SocketEventSendDTO) => void;
    sendToAuth: (eventInfo: EmitEventToAuthDto) => void;
    sendToGroup: (eventInfo: EmitEventToGroupDto) => void;
    emitToAllAuth: (eventInfo: SocketEventEmitDTO) => void;
    emitToAllAuthenticatedAuth: (eventInfo: SocketEventEmitDTO) => void;
    propagateEvent(eventInfo: SocketEventSendDTO): boolean;
}
