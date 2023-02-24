// PACKAGE
import { Request, Response, NextFunction } from 'express';
import { DataErrors, AuthenticationErrors } from 'rettiwt-api';

// TYPES
import { HTTPError, HTTPResponse } from '../../types/HTTP';

/**
 * @param err The error received
 * @param req The express Request object
 * @param res The express Response object
 * @param next The next function callback
 */
const userErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // If user not found
    if (err.message == DataErrors.UserNotFound) {
        res.send(new HTTPResponse(false, undefined, new HTTPError(404, err.message)));
    }
    // If no likes/follows found
    else if (err.message == DataErrors.NoLikedTweetsFound || err.message == DataErrors.NoFollowsFound) {
        res.send(new HTTPResponse(false, undefined, new HTTPError(204, err.message)));
    }
    // If authentication required
    else if (err.message == AuthenticationErrors.NotAuthenticated) {
        res.send(new HTTPResponse(false, undefined, new HTTPError(401, err.message)));
    }
    // If can't classify error, send 500
    else {
        res.sendStatus(500);
    }
};

export default userErrorHandler;