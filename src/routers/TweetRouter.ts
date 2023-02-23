// PACKAGE LIBS
import { Router } from 'express';

// DATA
import TwitterContext from '../data/twitter/TwitterContext';

/**
 * @summary This router handles all operations related to Twitter tweets
 */
const TweetRouter = Router();

// ENDPOINTS

/** 
 * @returns The details of the tweet
 * @param id The id of the tweet whose details are to be fetched
 */
TweetRouter.get('/:id', async (req, res) => {
    res.send(await new TwitterContext().tweets.details(req.params.id));
});

/** 
 * @returns The likes of the tweet
 * @param id The id of the tweet whose likes are to be fetched
 * @query count The number of likes to fetch, must be >= 40 when no cursor is provided
 * @query cursor The cursor to the batch of likes to fetch
 */
TweetRouter.get('/:id/likes', async (req, res) => {
    // Getting query params
    const id: string = String(req.params.id);
    const count: number = req.query.number ? Number(req.query.number) : 40;
    const cursor: string = req.query.cursor ? String(req.query.cursor) : '';

    res.send(await new TwitterContext(req.headers.cookie).tweets.likes(id, count, cursor));
});

/** 
 * @returns The retweets of the tweet
 * @param id The id of the tweet whose retweets are to be fetched
 * @query count The number of retweets to fetch, must be >= 40 when no cursor is provided
 * @query cursor The cursor to the batch of retweets to fetch
 */
TweetRouter.get('/:id/retweets', async (req, res) => {
    // Getting query params
    const id: string = String(req.params.id);
    const count: number = req.query.number ? Number(req.query.number) : 40;
    const cursor: string = req.query.cursor ? String(req.query.cursor) : '';

    res.send(await new TwitterContext(req.headers.cookie).tweets.retweets(id, count, cursor));
});

export default TweetRouter;