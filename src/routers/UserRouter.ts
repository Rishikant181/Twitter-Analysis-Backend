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
 * @param id The id/username of the Twitter user whose details are to be fetched
 */
UserRouter.get('/:id', async (req, res) => {
    res.send(await new TwitterContext().users.details(req.params.id));
});

export default UserRouter;