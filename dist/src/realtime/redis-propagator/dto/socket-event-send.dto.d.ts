import { RedisSocketEventEmitDTO } from './socket-event-emit.dto';
export declare class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
    readonly authId: string;
    readonly socketId: string;
}
