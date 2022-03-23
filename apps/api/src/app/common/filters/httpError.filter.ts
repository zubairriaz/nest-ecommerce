import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception.constructor);

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      const temp = exception.getResponse();
      if (typeof temp == 'string') {
        message = temp;
      } else {
        message = (temp as { message: string }).message;
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    const devErrorResponse: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: message,
    };

    const prodErrorResponse: any = {
      statusCode,
      message,
    };

    response
      .status(statusCode)
      .json(
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse
      );
  }
}
