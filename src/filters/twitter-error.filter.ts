// PACKAGES
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

// ENUMS
import { DataErrors } from '../enums/twitter-errors';

/**
 * NestJS filter class that handles all errors related to communicating with Twitter.
 */
@Catch(Error)
export class TwitterErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        // Getting the HTTP communication stream
        const http = host.switchToHttp();

        // Getting the HTTP request
        const request: Request = http.getRequest<Request>();

        // Getting the HTTP response
        const response: Response = http.getResponse<Response>();
    }
}