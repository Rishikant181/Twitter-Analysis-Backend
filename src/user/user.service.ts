// PACKAGE
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt } from 'rettiwt-api';

// ENTITIES
import { User } from './entities/user.entity';
import { Tweet } from '../tweet/entities/tweet.entity';
import { CursoredData } from '../dtos/cursored-data.dto';

// DTOs
import { UserListArgsDto } from './dto/user-list-args.dto';
import { ApiKeyDto } from '../auth/dto/api-key.dto';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated api key is used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class UserService {
    /** The API keys to use for authenticating Rettiwt instance. */
    private apiKey?: ApiKeyDto;

    /** The maximum number of data items to fetch at once. */
    private batchSize: number = 100;
    
    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {
        // If API key string present, then storing if after parsing to JSON
        this.apiKey =  {
            auth_token: request.headers['auth_token'],
            ct0: request.headers['ct0'],
            kdt: request.headers['kdt'],
            twid: request.headers['twid']
        }
    }

	/**
     * Get the details of the Twitter user with the given id/username.
     * 
	 * @param id The id/username of the twitter user.
	 * @returns The details of the twitter user with the given id/username.
	 */
	async find(id: string): Promise<User> {
        /**
         * @remarks There might be a better way to do this.
         */
		// If username is provided
        if(isNaN(Number(id))) {
            // Fetching and returning the details using username
            return Rettiwt().users.getUserDetails(id);
        }
        // If id is provided
        else {
            // Fetching and returning the details using id
            return Rettiwt().users.getUserDetails(id);
        }
	}

    /**
     * Get the followers of the Twitter user with the given id
     * 
     * @param id The id of the twitter user.
     * @param args Additional list arguments.
     * @returns The list of follower of the twitter user with the given id.
     */
    async followers(id: string, args: UserListArgsDto): Promise<CursoredData<User>> {
        let followers: CursoredData<User> = {
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
            let data = await Rettiwt(this.apiKey).users.getUserFollowers(id, batchSize, followers.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            followers.list = followers.list.concat(data.list);
            followers.next = data.next;

            // Incrementing total data fetched
            total = followers.list.length;
        } while (total < args.count);

        return followers;
    }

    /**
     * Get the following of the Twitter user with the given id
     * 
     * @param id The id of the twitter user.
     * @param args Additional list arguments.
     * @returns The list of following of the twitter user with the given id.
     */
    async following(id: string, args: UserListArgsDto): Promise<CursoredData<User>> {
        let following: CursoredData<User> = {
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
            let data = await Rettiwt(this.apiKey).users.getUserFollowing(id, batchSize, following.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            following.list = following.list.concat(data.list);
            following.next = data.next;

            // Incrementing total data fetched
            total = following.list.length;
        } while (total < args.count);

        return following;
    }

    /**
     * Get the list of tweets liked by the Twitter user with the given id.
     * 
     * @param id The id of the twitter user.
     * @param args Additional list arguments.
     * @returns The list of liked tweets of the twitter user with the given id.
     */
    public async likes(id: string, args: UserListArgsDto): Promise<CursoredData<Tweet>> {
        let likes: CursoredData<Tweet> = {
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
            let data = await Rettiwt(this.apiKey).users.getUserLikes(id, batchSize, likes.next.value);

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
}
