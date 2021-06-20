import { SocketEventEmitDTO } from './socket-event-emit.dto';
export declare class SocketEventSendDTO extends SocketEventEmitDTO {
    readonly authId: number;
    readonly socketId: string;
}
