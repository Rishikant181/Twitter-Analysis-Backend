// PACKAGE
import { Request, Response, NextFunction } from 'express';
import { AuthenticationErrors } from 'rettiwt-api';

// TYPES
import { HTTPError, HTTPResponse } from '../../types/HTTP';

/**
 * @param err The error received
 * @param req The express Request object
 * @param res The express Response object
 * @param next The next function callback
 */
const accountErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // If incorrect login credentials
    if (err.message == AuthenticationErrors.InvalidEmail || err.message == AuthenticationErrors.InvalidPassword || err.message == AuthenticationErrors.InvalidUsername) {
        res.send(new HTTPResponse(false, undefined, new HTTPError(401, err.message)));
    }
    // If can't classify error, send 500
    else {
        res.sendStatus(500);
    }
};

export default accountErrorHandler;