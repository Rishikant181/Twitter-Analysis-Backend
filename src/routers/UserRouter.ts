// PACKAGE LIBS
import { Router } from 'express';

// DATA
import TwitterContext from '../data/twitter/TwitterContext';

/**
 * @summary This router handles all operations related to Twitter user
 */
const UserRouter = Router();

// ENDPOINTS

/** 
 * @returns The details of the Twitter user
 * @param userName The user name of the Twitter user whose details are to be fetched
 */
UserRouter.get('/:userName', async (req, res) => {
    res.send(await new TwitterContext().users.details(req.params.userName));
});

export default UserRouter;