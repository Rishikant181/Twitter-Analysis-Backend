// PACKAGE
import { Request, Response, NextFunction } from 'express';
import { DataErrors, AuthenticationErrors } from 'rettiwt-api';

// TYPES
import { HTTPError } from '../../types/HTTP';

const userErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message == DataErrors.UserNotFound) {
        res.send(new HTTPError(404, err.message));
    }
    else {
        console.log(err);
    }
}

export default userErrorHandler;