// PACKAGES
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt, DataErrors } from 'rettiwt-api';

// ENTITIES
import { Tweet } from './entities/tweet.entity';
import { User } from '../user/entities/user.entity';
import { CursoredData } from '../dtos/cursored-data.dto';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';
import { TweetListArgsDto } from './dto/tweet-list-args.dto';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated cookies are used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class TweetService {
    /** The cookie string to use for authenticatin Rettiwt instance. */
    private cookie: string;

    /** The maximum number of data items to fetch at once. */
    private batchSize: number = 100;

    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {
        this.cookie = request.headers['cookie'];
    }

    /**
     * Get the details of the Tweet with the given id/username.
     * 
     * @param id The id of the tweet.
     * @returns The details of the tweet with the given id.
     */
    async find(id: string): Promise<Tweet> {
        // Fetching and returning the details of the tweet with the given id
        return await Rettiwt().tweets.getTweetById(id);
    }

    /**
     * Get the list of tweets matching the given filter.
     * 
     * @param query The search query for getting the tweets.
     * @param args Additional list arguments.
     * @returns The list of tweets matching the given query.
     */
    async search(query: TweetQueryDto, args: TweetListArgsDto): Promise<CursoredData<Tweet>> {
        let tweets: CursoredData<Tweet> = {
            list: [],
            next: { value: args.cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = this.batchSize;                         // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((args.count - total) <= batchSize) ? (args.count - total) : batchSize;

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
        } while (total < args.count);

        // If no tweets found
        if (!tweets.list.length) {
            throw new Error(DataErrors.NoTweetsFound);
        }

        return tweets;
    }

    /**
     * Get the list of likes of a Tweet.
     * 
     * @param id The id of the tweet.
     * @param args Additional list arguments.
     * @returns The list of likes of the tweet with the given id.
     */
    async likes(id: string, args: TweetListArgsDto): Promise<CursoredData<User>> {
        let likes: CursoredData<User> = {
            list: [],
            next: { value: args.cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = this.batchSize;                         // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((args.count - total) <= batchSize) ? (args.count - total) : batchSize;

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
        } while (total < args.count);

        // If no likes found
        if (!likes.list.length) {
            throw new Error(DataErrors.NoLikersFound);
        }

        return likes;
    }

    /**
     * Get the list of retweets of the Tweets.
     * 
     * @param id The id of the tweet.
     * @param args Additional list arguments.
     * @returns The list of retweets of the tweet with the given id.
     */
    async retweets(id: string, args: TweetListArgsDto): Promise<CursoredData<User>> {
        let retweets: CursoredData<User> = {
            list: [],
            next: { value: args.cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = this.batchSize;                         // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((args.count - total) <= batchSize) ? (args.count - total) : batchSize;

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
        } while (total < args.count);

        // If no retweets found
        if (!retweets.list.length) {
            throw new Error(DataErrors.NoRetweetersFound);
        }

        return retweets;
    }
}
