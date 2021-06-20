import { RedisSocketEventEmitDTO } from './socket-event-emit.dto';

export class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
  public readonly authId: string;
  public readonly socketId: string;
}
