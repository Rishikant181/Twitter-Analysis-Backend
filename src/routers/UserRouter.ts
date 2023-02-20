// PACKAGE LIBS
import { Router } from 'express';

// SERVICES
import UserService from '../services/data/UserService';

/**
 * @summary This router handles all operations related to Twitter user
 */
const UserRouter = Router();

// Initializing service instances
const users: UserService = new UserService();

// ENDPOINTS

/** 
 * @returns The details of the Twitter user
 * @param userName The user name of the Twitter user whose details are to be fetched
 */
UserRouter.get('/:userName', async (req, res) => {
    res.send(await users.details(req.params.userName));
});

export default UserRouter;