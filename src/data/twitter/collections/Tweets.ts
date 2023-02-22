// PACKAGE LIBS
import { Rettiwt, User, Tweet, TweetFilter, CursoredData } from 'rettiwt-api';

/**
 * @summary Handles all data operations related to Twitter tweets
 */
export default class Tweets {
    // MEMBER DATA
    private cookie: string;                                                 // To store the cookie to use for authenticating rettiwt

    // MEMBER METHODS
    /**
     * @param cookie The cookie to be used for authenticating
     */
    constructor(cookie: string = '') {
        this.cookie = cookie;
    }

    /**
     * @param id The id of the tweet
     * @returns The details of the tweet with the given id
     */
    public async details(id: string): Promise<Tweet> {
        // Fetching and returning the details of the tweet with the given id
        return await Rettiwt().tweets.getTweetById(id);
    }

    /**
     * @param query The search query for getting the tweets
     * @param count The number of tweets to fetch
     * @param cursor The cursor to next batch
     * @returns The list of tweets matching the given query
     */
    public async search(query: TweetFilter, count: number, cursor: string = ''): Promise<CursoredData<Tweet>> {
        let tweets: CursoredData<Tweet> = {
            list: [],
            next: { value: cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = 100;                                    // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((count - total) <= batchSize) ? (count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt().tweets.getTweets(query, batchSize, tweets.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            tweets.list = tweets.list.concat(data.list);
            tweets.next = data.next;

            // Incrementing total data fetched
            total = tweets.list.length;
        } while (total < count);

        return tweets;
    }

    /**
     * @param id The id of the tweet
     * @param count The number of likes to fetch
     * @param cursor The cursor to next batch
     * @returns The list of likes of the tweet with the given id
     */
    public async likes(id: string, count: number, cursor: string = ''): Promise<CursoredData<User>> {
        let likes: CursoredData<User> = {
            list: [],
            next: { value: cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = 100;                                    // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((count - total) <= batchSize) ? (count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt(this.cookie).tweets.getTweetLikers(id, batchSize, likes.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            likes.list = likes.list.concat(data.list);
            likes.next = data.next;

            // Incrementing total data fetched
            total = likes.list.length;
        } while (total < count);

        return likes;
    }

    /**
     * @param id The id of the tweet
     * @param count The number of retweets to fetch
     * @param cursor The cursor to next batch
     * @returns The list of retweets of the tweet with the given id
     */
    public async retweets(id: string, count: number, cursor: string = ''): Promise<CursoredData<User>> {
        let retweets: CursoredData<User> = {
            list: [],
            next: { value: cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = 100;                                    // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((count - total) <= batchSize) ? (count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt(this.cookie).tweets.getTweetRetweeters(id, batchSize, retweets.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            retweets.list = retweets.list.concat(data.list);
            retweets.next = data.next;

            // Incrementing total data fetched
            total = retweets.list.length;
        } while (total < count);

        return retweets;
    }
}