import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
interface CustomResponse<T> {
    data: T;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, CustomResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<CustomResponse<T>>;
}
export {};
