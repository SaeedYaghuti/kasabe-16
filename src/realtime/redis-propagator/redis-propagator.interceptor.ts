import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// import { AuthenticatedSocket } from '@app/shared/socket-state/socket-state.adapter';
import { AuthenticatedSocket } from '../socket-state/socket-state.adapter';

import { RedisPropagatorService } from './redis-propagator.service';

@Injectable()
// we are going to create an interceptor
// that will have access to each socket event response.
// This way, we won’t have to manually call propagateEvent in every one of our gateways.

//Interceptors is not called at connection time. Only on emiting!
export class RedisPropagatorInterceptor<T> implements NestInterceptor<T, WsResponse<T>> {
  // Constructor
  public constructor(private readonly redisPropagatorService: RedisPropagatorService) {}

  //Interceptors is not called at connection time.
  // Only called on emiting!
  // Each WebSocket event sent by our server will go through here
  public intercept(context: ExecutionContext, next: CallHandler): Observable<WsResponse<T>> {
    const socket: AuthenticatedSocket = context.switchToWs().getClient();

    // [next.handle(): emit event to client]
    // [.pipe(tap)]: react to response that come back from client
    return next.handle().pipe(
      // By using RxJS’ tap method,
      // we can react to the response without altering it.
      tap((data) => {
        // we use the propagateEvent method
        // to send the event across all of our instances.
        // The event is then sent to the frontend client.
        // This is why we keep track of the socket the event originated on:
        // to ensure we don’t send the same event on the same socket twice.
        this.redisPropagatorService.propagateEvent({
          ...data,
          socketId: socket.id,
          authId: socket.auth?.authId,
        });
      }),
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
