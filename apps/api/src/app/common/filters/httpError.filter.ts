import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException ? exception.message : 'Internal Server Error';

        const devErrorResponse: any = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorName: exception?.name,
            message: exception?.message
          };
      
          const prodErrorResponse: any = {
            statusCode,
            message
          };

        response.status(statusCode).json(process.env.NODE_ENV === 'development' ? devErrorResponse : prodErrorResponse);  
    }
    
}