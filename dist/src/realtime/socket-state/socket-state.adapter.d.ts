import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketio from 'socket.io';
import { SocketStateService } from './socket-state.service';
import * as WebSocket from 'ws';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable } from 'rxjs';
interface TokenPayload {
    readonly authId: number;
}
export interface AuthenticatedSocket extends SocketIO.Socket {
    auth: TokenPayload;
    intercept: string;
}
export declare class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
    private readonly app;
    private readonly socketStateService;
    constructor(app: INestApplicationContext, socketStateService: SocketStateService);
    private logger;
    create(port: number, options?: socketio.ServerOptions): socketio.Server;
    bindClientConnect(server: socketio.Server, callback: Function): void;
    bindMessageHandlers(socket: WebSocket, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>): void;
}
export {};
