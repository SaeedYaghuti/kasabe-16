import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

// import { AuthenticatedSocket } from '@app/shared/socket-state/socket-state.adapter';
import { AuthenticatedSocket } from './socket-state.adapter';
import { SocketStateService } from './socket-state.service';
import { RedisPropagatorService } from '../redis-propagator/redis-propagator.service';
import { LogColor } from '../../util/log_color';
import { EnumEmitTypes } from '../redis-propagator/types/emit_types.enum';
import { EmitDataType } from '../redis-propagator/types/emit-data.type';

@Injectable()
// we are going to create an interceptor
// that will have access to each socket event response.
// [each gateway return go through here]
// This way, we won’t have to manually call propagateEvent in every one of our gateways.

//Interceptors is not called at connection time. Only on emiting!
export class PropagatorInterceptor<T> implements NestInterceptor<T, WsResponse<T>> {
  // Constructor
  public constructor(
    // private readonly socketStateService: SocketStateService,
    private readonly redisPropagatorService: RedisPropagatorService,
  ) {}

  private logger = new Logger('PropagatorInterceptor');

  //Interceptors is not called at connection time.
  // Only called on emiting!
  // Each WebSocket event sent by our server will go through here
  public intercept(context: ExecutionContext, next: CallHandler): Observable<WsResponse<T>> {
    const socket: AuthenticatedSocket = context.switchToWs().getClient();
    this.logger.log(`[APP_FLOW: 5 ] - intercept(): registering action when retruned data from handler`)

    // [next.handle(): emit event to client]
    // [.pipe(tap)]: recive sending responce to front_end
    return next.handle().pipe(
      // tap react to the response without altering it.
      tap(data => {
        // console.log(LogColor.BgMagenta, '[PropagatorInterceptor: data] =>');
        this.logger.log(`[APP_FLOW: 8 ] - next.handle().pipe(): data> ${JSON.stringify(data)} retruned from handler`);
        // we use the propagateEvent method
        // to send the event across all of our instances.
        // The event is then sent to the frontend client.
        // This is why we keep track of the socket the event originated on:
        // to ensure we don’t send the same event on the same socket twice.
        switch (data?.type) {
          case EnumEmitTypes.FEEDBACK:
            // answer to sender itself
            this.redisPropagatorService.publishEmittoAuth({
              ...data,
              socketId: socket.id,
              authId: socket.auth?.authId,
            });
            break;
          case EnumEmitTypes.USER:
            this.redisPropagatorService.publishEmittoAuth({
              ...data,
            });
            break;
          case EnumEmitTypes.GROUP:
            this.redisPropagatorService.publishEmittoGroup({
              ...data,
            });
            break;
          case EnumEmitTypes.CLIENTSTATUS:
            this.redisPropagatorService.publishEmitClientStatus({
              ...data,
            });
            break;
          case EnumEmitTypes.WATCHSTATUS:
            this.redisPropagatorService.publishWatchClientStatus({
              ...data,
            });
            break;
          default:
            break;
        }

        
      }),

      // NEXT: DATA WILL SEND TO [: 11 ]
    );

    // Each dispatched event, before being returned to the frontend client,
    // is propagated across all of our instances in which we send the event to all the sockets belonging to the auth.

    // Inside the propagateEvent method, we reject the events without authId.
    // [we are sending to specific client]
    // This is because such events have no interest in being propagated across instances
    // — the connection is unique.

    // Remember, the event is sent to the frontend client whether the propagateEvent method is used or not.
    // So if there is no auth object, the event sent by the gateway will still reach the frontend client.
    // We are simply making sure that it is sent to all other sockets the auth might have open.
  }
}
