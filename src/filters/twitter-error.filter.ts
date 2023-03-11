// PACKAGES
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// ENUMS
import { DataErrors, AuthenticationErrors } from '../enums/twitter-error.enums';

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

        // If the requested data cannot be found
        /**
         * This is done by getting the values of the DataErrors enum and then checking if the error message exists.
         * If it does, then the error received is a DataError.
         */
        if (Object.values(DataErrors).includes(error.message as DataErrors)) {
            response
            .status(HttpStatus.NOT_FOUND)
            .json({
                statusCode: HttpStatus.NOT_FOUND,
                message: error.message
            });
        }
        // If failed to fetch data because user is not authenticated
        else if (error.message == AuthenticationErrors.NotAuthenticated) {
            response
            .status(HttpStatus.FORBIDDEN)
            .json({
                statusCode: HttpStatus.FORBIDDEN,
                message: error.message
            });
        }
        // If the error is an HttpException
        else if (error instanceof HttpException){
            response
            .status(error.getStatus())
            .json(error.getResponse());
        }
        // If can't identify error
        else {
            response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}