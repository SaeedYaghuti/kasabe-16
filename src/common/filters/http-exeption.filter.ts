import { ExceptionFilter, HttpException, ArgumentsHost, Catch } from '@nestjs/common';
import { Response, Request } from 'express';
import { Message } from '../../chat/models/message/message.entity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const statusCode = exception.getStatus();
        const response = ctx.getResponse<Response>();
        // const message = exception.message.message;
        const message = exception.message;

        return response.status(statusCode).json({
            status: statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}
