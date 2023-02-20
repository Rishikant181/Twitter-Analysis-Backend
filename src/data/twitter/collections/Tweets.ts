// PACKAGE LIBS
import { Rettiwt, Tweet } from 'rettiwt-api';

/**
 * @summary Handles all data operations related to Twitter tweets
 */
export default class Tweets {
    // MEMBER METHODS

    /**
     * @param id The id of the tweet
     * @returns The details of the tweet with the given id
     */
    public async details(id: string): Promise<Tweet> {
        // Fetching and returning the details of the tweet with the given id
        return await Rettiwt().tweets.getTweetById(id);
    }
}