// PACKAGE
import { Inject, Injectable, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt, DataErrors } from 'rettiwt-api';

// ENTITIES
import { User, CursoredData } from './entities/user.entity';
import { Tweet } from '../tweet/entities/tweet.entity';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated cookies are used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class UserService {
    /** The cookie string to use for authenticatin Rettiwt instance. */
    private cookie: string;
    
    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {
        this.cookie = request.headers['cookie'];
    }

	/**
     * Get the details of the Twitter user with the given id/username.
     * 
	 * @param id The id/username of the twitter user.
	 * @returns The details of the twitter user with the given id/username.
	 */
	async find(id: string): Promise<User> {
		// If username is provided
        if(isNaN(Number(id))) {
            // Fetching and returning the details using username
            return Rettiwt().users.getUserDetails(id)
            .catch(err => {
                throw new HttpException(DataErrors.UserNotFound, HttpStatus.NOT_FOUND)
            });
        }
        // If id is provided
        else {
            // Fetching and returning the details using id
            return Rettiwt().users.getUserDetailsById(id)
            .catch(err => {
                throw new HttpException(DataErrors.UserNotFound, HttpStatus.NOT_FOUND)
            });
        }
	}

    /**
     * Get the followers of the Twitter user with the given id
     * 
     * @param id The id of the twitter user.
     * @param count The number of followers to fetch, must be >= 40 when no cursor is provided.
     * @param cursor The cursor to next batch.
     * @returns The list of follower of the twitter user with the given id.
     */
    async findFollowers(id: string, count: number, cursor: string): Promise<CursoredData<User>> {
        let followers: CursoredData<User> = {
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
            let data = await Rettiwt(this.cookie).users.getUserFollowers(id, batchSize, followers.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            followers.list = followers.list.concat(data.list);
            followers.next = data.next;

            // Incrementing total data fetched
            total = followers.list.length;
        } while (total < count);

        // If no followers found
        if (!followers.list.length) {
            throw new HttpException(DataErrors.NoFollowsFound, HttpStatus.NOT_FOUND);
        }

        return followers;
    }

    /**
     * Get the following of the Twitter user with the given id
     * 
     * @param id The id of the twitter user.
     * @param count The number of following to fetch, must be >= 40 when no cursor is provided.
     * @param cursor The cursor to next batch.
     * @returns The list of following of the twitter user with the given id.
     */
    async findFollowing(id: string, count: number, cursor: string): Promise<CursoredData<User>> {
        let following: CursoredData<User> = {
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
            let data = await Rettiwt(this.cookie).users.getUserFollowing(id, batchSize, following.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            following.list = following.list.concat(data.list);
            following.next = data.next;

            // Incrementing total data fetched
            total = following.list.length;
        } while (total < count);

        // If no following found
        if (!following.list.length) {
            throw new HttpException(DataErrors.NoFollowsFound, HttpStatus.NOT_FOUND);
        }

        return following;
    }

    /**
     * Get the list of tweets liked by the Twitter user with the given id.
     * 
     * @param id The id of the twitter user.
     * @param count The number of liked tweets to fetch, must be >= 40 when no cursor is provided.
     * @param cursor The cursor to next batch.
     * @returns The list of liked tweets of the twitter user with the given id.
     */
    public async findLikes(id: string, count: number, cursor: string = ''): Promise<CursoredData<Tweet>> {
        let likes: CursoredData<Tweet> = {
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
            let data = await Rettiwt(this.cookie).users.getUserLikes(id, batchSize, likes.next.value);

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

        // If no likes found
        if (!likes.list.length) {
            throw new HttpException(DataErrors.NoLikedTweetsFound, HttpStatus.NOT_FOUND);
        }

        return likes;
    }
}