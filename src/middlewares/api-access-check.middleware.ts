// PACKAGES
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// DTOs
import { ApiKey } from '../auth/dto/api-key.dto';

/**
 * This middleware checks if the use who made the HTTP request has access to advanced RettiwtAPI functions.
 * This is done by inspecting the headers for the access tokens.
 * The access tokens are then strigified accordingly and passed into the headers as 'api_key'
 */
@Injectable()
export class ApiAccessCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Getting the access tokens from the headers
        const apiKey: ApiKey = new ApiKey({
            auth_token: req.headers['auth_token'] as string,
            ct0: req.headers['ct0'] as string,
            kdt: req.headers['kdt'] as string,
            twid: req.headers['twid'] as string
        });
        
        // If access tokens are provided
        if (apiKey.auth_token && apiKey.ct0 && apiKey.kdt && apiKey.twid) {
            // Passing the stringified api keys in the header
            req.headers['api_key'] = apiKey.toString();
        }

        next();
    }
}