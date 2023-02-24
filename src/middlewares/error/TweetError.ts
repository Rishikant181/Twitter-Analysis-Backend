// PACKAGE
import { Request, Response, NextFunction } from 'express';
import { DataErrors, AuthenticationErrors } from 'rettiwt-api';

// TYPES
import { HTTPError, HTTPResponse } from '../../types/HTTP';

const tweetErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // If tweet not found
    if (err.message == DataErrors.TweetNotFound) {
        res.send(new HTTPResponse(false, undefined, new HTTPError(404, err.message)));
    }
    // If no tweets found
    else if (err.message == DataErrors.NoTweetsFound || err.message == DataErrors.NoLikersFound || err.message == DataErrors.NoRetweetersFound) {
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

export default tweetErrorHandler;