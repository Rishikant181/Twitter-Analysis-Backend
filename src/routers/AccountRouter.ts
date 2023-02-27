// PACKAGE LIBS
import { Router, Request, Response, NextFunction } from 'express';

// DATA
import TwitterContext from '../data/Context';

/**
 * @summary This router handles all operations related to Twitter account
 */
const AccountRouter = Router();

// ENDPOINTS

AccountRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
    // Parsing the request body
    const data: {
        email: string,
        userName: string,
        password: string
    } = req.body;

    // Getting the credentials from request body
    const email: string = data.email ? String(data.email) : '';
    const userName: string = data.userName ? String(data.userName) : '';
    const password: string = data.password ? String(data.password): '';

    // Logging in to twitter
    new TwitterContext().account.login(email, userName, password).then(data => {
        res.send(data);
    });
});

export default AccountRouter;