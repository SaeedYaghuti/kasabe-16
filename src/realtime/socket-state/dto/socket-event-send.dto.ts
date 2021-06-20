import { SocketEventEmitDTO } from './socket-event-emit.dto';

export class SocketEventSendDTO extends SocketEventEmitDTO {
  public readonly authId: number;
  public readonly socketId: string;
}
