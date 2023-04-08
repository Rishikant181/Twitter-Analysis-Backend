// PACKAGES
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { DataValidationError } from 'rettiwt-api';

/**
 * NestJS filter class that handles all errors related to communicating with Twitter.
 */
@Catch(Error)
export class TwitterErrorFilter implements ExceptionFilter {
	catch(error: Error, host: ArgumentsHost): void {
		// Getting the HTTP communication stream
		const http = host.switchToHttp();

		// Getting the HTTP response
		const response: Response = http.getResponse<Response>();

		// If any validation error found
		if (error instanceof DataValidationError) {
			response.json(error);
		}
		// If the error is an HttpException
		else if (error instanceof HttpException) {
			response.status(error.getStatus()).json(error.getResponse());
		}
		// If can't identify error
		else {
			response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
