// PACKAGE
import { Inject, Injectable } from '@nestjs/common';

// PROVIDERS
import { TwitterService } from '../twitter.service';

// DTOs
import { UserListArgsDto } from './dto/user-list-args.dto';
import { UserDto } from './dto/user.dto';
import { CursoredDataDto } from '../dto/cursored-list.dto';
import { TweetDto } from 'src/twitter/tweet/dto/tweet.dto';

@Injectable()
export class UserService {
    /** The maximum number of data items to fetch at once. */
    private batchSize: number = 100;
    
    /**
     * @param twitter The TweetService instance to use accessing Twitter API.
     */
    constructor(@Inject(TwitterService) private twitter: TwitterService) { }

	/**
     * Get the details of the Twitter user with the given id/username.
     * 
	 * @param id The id/username of the twitter user.
	 * @returns The details of the twitter user with the given id/username.
	 */
	async find(id: string): Promise<UserDto> {
        /**
         * @remarks There might be a better way to do this.
         */
		// If username is provided
        if(isNaN(Number(id))) {
            // Fetching and returning the details using username
            return this.twitter.api().users.getUserDetails(id);
        }
        // If id is provided
        else {
            // Fetching and returning the details using id
            return this.twitter.api().users.getUserDetails(id);
        }
	}

    /**
     * Get the followers of the Twitter user with the given id
     * 
     * @param id The id of the twitter user.
     * @param args Additional list arguments.
     * @returns The list of follower of the twitter user with the given id.
     */
    async followers(id: string, args: UserListArgsDto): Promise<CursoredDataDto<UserDto>> {
        /** The cursored data to be returned. */
        let followers: CursoredDataDto<UserDto> = new CursoredDataDto<UserDto>([], args.cursor);

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
            let data = await this.twitter.api(true).users.getUserFollowers(id, batchSize, followers.next.value);

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
    async following(id: string, args: UserListArgsDto): Promise<CursoredDataDto<UserDto>> {
        /** The cursored data to be returned. */
        let following: CursoredDataDto<UserDto> = new CursoredDataDto<UserDto>([], args.cursor);

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
            let data = await this.twitter.api(true).users.getUserFollowing(id, batchSize, following.next.value);

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
    public async likes(id: string, args: UserListArgsDto): Promise<CursoredDataDto<TweetDto>> {
        /** The cursored data to be returned. */
        let likes: CursoredDataDto<TweetDto> = new CursoredDataDto<TweetDto>([], args.cursor);

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
            let data = await this.twitter.api(true).users.getUserLikes(id, batchSize, likes.next.value);

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
