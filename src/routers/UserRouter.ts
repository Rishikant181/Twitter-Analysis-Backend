// PACKAGE LIBS
import { Router } from 'express';

/**
 * @summary This router handles all operations related to Twitter user
 */
const UserRouter = Router();

// ENDPOINTS

/** 
 * @returns The details of the Twitter user
 * @param userName The user name of the Twitter user whose details are to be fetched
 */
UserRouter.get('/:userName', (req, res) => {
    res.send(`I am ${req.params.userName}`);
});

export default UserRouter;