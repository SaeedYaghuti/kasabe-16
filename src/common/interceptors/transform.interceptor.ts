import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CustomResponse<T> {
  data: T
}

@Injectable()
// all request first come here
// all response at the end move through here
// income data Type: T
// outCome data Type: CustomResponse<T>
export class TransformInterceptor<T> implements NestInterceptor<T, CustomResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    // transform the response object
    // // map response into data property
    // console.log('next.handle()', next.handle()); // contains our response in form of Observable
    // console.log('context.getClass()', context.getClass()); // [Function: ProductsController]
    // console.log('context.getHandler()', context.getHandler()); // [Function: create]
    
    return next.handle().pipe(
      map(data => ({ data })),
    );
  }
}
