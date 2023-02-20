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

export default TweetRouter;