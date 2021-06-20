import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthenticatedSocket } from '../realtime/socket-state/socket-state.adapter';
import { SocketStateService } from '../realtime/socket-state/socket-state.service';
import { EmittoAuthDto } from '../realtime/redis-propagator/dto/emit-to-auth.dto';
import { EmitFeedbackType } from '../realtime/redis-propagator/types/emit-feedback.type';
import { EmittoGroupDto } from '../realtime/redis-propagator/dto/emit-to-group.dto';
import { EmitClientStatusEvent } from '../realtime/redis-propagator/dto/emit-client-staus-event.dto';
import { WatchClientStatusEvent } from '../realtime/redis-propagator/dto/request-client-status-event.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private chatService;
    private socketStateService;
    constructor(chatService: ChatService, socketStateService: SocketStateService);
    private logger;
    afterInit(server: Server): void;
    handleConnection(socket: AuthenticatedSocket, ...args: any[]): Promise<void>;
    handleDisconnect(socket: AuthenticatedSocket): Promise<void>;
    handleMessage(socket: AuthenticatedSocket, [data, cb]: any[]): EmitFeedbackType;
    chatToServerHandler(socket: AuthenticatedSocket, [rMessage, cb]: any[]): EmitFeedbackType;
    chattoOneHandler(socket: AuthenticatedSocket, [rData, cb]: any[]): Promise<EmittoAuthDto>;
    chatToGroupHandler(socket: AuthenticatedSocket, [rData, cb]: any[]): Promise<EmittoGroupDto>;
    onEmitClientStatus(socket: AuthenticatedSocket, [rData, cb]: any[]): Promise<EmitClientStatusEvent | void>;
    onWatchClientStatus(socket: AuthenticatedSocket, [rData, cb]: any[]): Promise<WatchClientStatusEvent | void>;
    onIsOnline(socket: AuthenticatedSocket, [rData, cb]: any[]): Promise<false | void>;
    onChat(socket: AuthenticatedSocket, [message, cb]: [any, any]): Promise<void>;
    findAll1(socket: AuthenticatedSocket, [data, cb]: any[]): Observable<any>;
}
