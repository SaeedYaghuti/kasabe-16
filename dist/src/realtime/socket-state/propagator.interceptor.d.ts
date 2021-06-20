import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { RedisPropagatorService } from '../redis-propagator/redis-propagator.service';
export declare class PropagatorInterceptor<T> implements NestInterceptor<T, WsResponse<T>> {
    private readonly redisPropagatorService;
    constructor(redisPropagatorService: RedisPropagatorService);
    private logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<WsResponse<T>>;
}
