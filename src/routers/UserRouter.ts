// PACKAGE LIBS
import { Router } from 'express';
import { ValidationErrors, DataErrors, AuthenticationErrors } from 'rettiwt-api';

// DATA
import TwitterContext from '../data/Context';

// TYPES
import { HTTPError } from '../types/HTTP';

/**
 * @summary This router handles all operations related to Twitter user
 */
const UserRouter = Router();

// ENDPOINTS

/** 
 * @returns The details of the Twitter user
 * @param id The id/username of the Twitter user whose details are to be fetched
 */
UserRouter.get('/:id', (req, res) => {
    // Getting query params
    const id: string = req.params.id;

    // Fetching data
    new TwitterContext().users.details(req.params.id).then(data => {
        res.send(data);
    })
    .catch((err: Error) => {
        if (err.message == DataErrors.UserNotFound) {
            res.status(404);
            res.send(new HTTPError(err.message, [{ name: 'id', value: id }]));
        }
    });
});

/** 
 * @returns The followers of the Twitter user
 * @param id The id of the Twitter user whose followers are to be fetched
 * @query count The number of followers to fetch, must be >= 40 when no cursor is provided
 * @query cursor The cursor to the batch of followers to fetch
 */
UserRouter.get('/:id/followers', async (req, res) => {
    // Getting query params
    const id: string = String(req.params.id);
    const count: number = req.query.number ? Number(req.query.number) : 40;
    const cursor: string = req.query.cursor ? String(req.query.cursor) : '';

    res.send(await new TwitterContext(req.headers.cookie).users.followers(id, count, cursor));
});

/** 
 * @returns The following of the Twitter user
 * @param id The id of the Twitter user whose following is to be fetched
 * @query count The number of following to fetch, must be >= 40 when no cursor is provided
 * @query cursor The cursor to the batch of following to fetch
 */
UserRouter.get('/:id/following', async (req, res) => {
    // Getting query params
    const id: string = String(req.params.id);
    const count: number = req.query.number ? Number(req.query.number) : 40;
    const cursor: string = req.query.cursor ? String(req.query.cursor) : '';

    res.send(await new TwitterContext(req.headers.cookie).users.following(id, count, cursor));
});

/** 
 * @returns The likes of the Twitter user
 * @param id The id of the Twitter user whose likes are to be fetched
 * @query count The number of likes to fetch, must be >= 40 when no cursor is provided
 * @query cursor The cursor to the batch of likes to fetch
 */
UserRouter.get('/:id/likes', async (req, res) => {
    // Getting query params
    const id: string = String(req.params.id);
    const count: number = req.query.number ? Number(req.query.number) : 40;
    const cursor: string = req.query.cursor ? String(req.query.cursor) : '';

    res.send(await new TwitterContext(req.headers.cookie).users.likes(id, count, cursor));
});

export default UserRouter;