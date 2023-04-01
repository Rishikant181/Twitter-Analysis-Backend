// PACKAGES
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt, Tweet, User } from 'rettiwt-api';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';
import { TweetListArgsDto } from './dto/tweet-list-args.dto';
import { CursoredDataDto } from '../dto/cursored-list.dto';
import { AuthKeyDto } from 'src/twitter/auth/dto/auth-key.dto';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated api key is used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class TweetService {
    /** The API keys to use for authenticating Rettiwt instance. */
    private apiKey: AuthKeyDto;

    /** The maximum number of data items to fetch at once. */
    private batchSize: number = 100;

    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {
        // Getting the API keys from request header
        this.apiKey =  {
            auth_token: request.headers['auth_token'],
            ct0: request.headers['ct0'],
            kdt: request.headers['kdt'],
            twid: request.headers['twid']
        }
    }

    /**
     * Get the details of the Tweet with the given id/username.
     * 
     * @param id The id of the tweet.
     * @returns The details of the tweet with the given id.
     */
    async find(id: string): Promise<Tweet> {
        // Fetching and returning the details of the tweet with the given id
        return await Rettiwt().tweets.getTweetDetails(id);
    }

    /**
     * Get the list of tweets matching the given filter.
     * 
     * @param query The search query for getting the tweets.
     * @param args Additional list arguments.
     * @returns The list of tweets matching the given query.
     */
    async search(query: TweetQueryDto, args: TweetListArgsDto): Promise<CursoredDataDto<Tweet>> {
        /** The cursored data to be returned. */
        let tweets: CursoredDataDto<Tweet> = new CursoredDataDto<Tweet>([], args.cursor);
        
        /** The total number of data fetched. */
        let total: number = 0;

        /** The number of data to fetch at once. */
        let batchSize: number = 20;

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

        return tweets;
    }

    /**
     * Get the list of likes of a Tweet.
     * 
     * @param id The id of the tweet.
     * @param args Additional list arguments.
     * @returns The list of likes of the tweet with the given id.
     */
    async likes(id: string, args: TweetListArgsDto): Promise<CursoredDataDto<User>> {
        /** The cursored data to be returned. */
        let likes: CursoredDataDto<User> = new CursoredDataDto<User>([], args.cursor);

        /** The total number of data fetched. */
        let total: number = 0;

        /** The number of data to fetch at once. */
        let batchSize: number = this.batchSize;

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((args.count - total) <= batchSize) ? (args.count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt(this.apiKey).tweets.getTweetLikers(id, batchSize, likes.next.value);

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

        return likes;
    }

    /**
     * Get the list of retweets of the Tweets.
     * 
     * @param id The id of the tweet.
     * @param args Additional list arguments.
     * @returns The list of retweets of the tweet with the given id.
     */
    async retweets(id: string, args: TweetListArgsDto): Promise<CursoredDataDto<User>> {
        /** The cursored data to be returned. */
        let retweets: CursoredDataDto<User> = new CursoredDataDto<User>([], args.cursor);

        /** The total number of data fetched. */
        let total: number = 0;

        /** The number of data to fetch at once. */
        let batchSize: number = this.batchSize;

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((args.count - total) <= batchSize) ? (args.count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt(this.apiKey).tweets.getTweetRetweeters(id, batchSize, retweets.next.value);

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

        return retweets;
    }
}
