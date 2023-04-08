// PACKAGES
import { Inject, Injectable } from '@nestjs/common';

// PROVIDERS
import { TwitterService } from '../twitter.service';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';
import { TweetListArgsDto } from './dto/tweet-list-args.dto';
import { TweetDto } from './dto/tweet.dto';
import { CursoredDataDto } from '../dto/cursored-list.dto';
import { UserDto } from 'src/twitter/user/dto/user.dto';

@Injectable()
export class TweetService {
	/** The maximum number of data items to fetch at once. */
	private batchSize = 100;

	/**
	 * @param twitter The TweetService instance to use accessing Twitter API.
	 */
	constructor(@Inject(TwitterService) private twitter: TwitterService) {}

	/**
	 * Get the details of the Tweet with the given id/username.
	 *
	 * @param id The id of the tweet.
	 * @returns The details of the tweet with the given id.
	 */
	async find(id: string): Promise<TweetDto> {
		// Fetching and returning the details of the tweet with the given id
		return await this.twitter.api().tweets.getTweetDetails(id);
	}

	/**
	 * Get the list of tweets matching the given filter.
	 *
	 * @param query The search query for getting the tweets.
	 * @param args Additional list arguments.
	 * @returns The list of tweets matching the given query.
	 */
	async search(query: TweetQueryDto, args: TweetListArgsDto): Promise<CursoredDataDto<TweetDto>> {
		/** The cursored data to be returned. */
		const tweets: CursoredDataDto<TweetDto> = new CursoredDataDto<TweetDto>([], args.cursor);

		/** The total number of data fetched. */
		let total = 0;

		/** The number of data to fetch at once. */
		let batchSize = 20;

		// Fetching batch-wise, as long as total data fetched is less than required
		do {
			// For last batch, set batch size to amount of data remaining
			/**
			 * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
			 * So the batch size is reduced to the amount of data remaining to fetch
			 */
			batchSize = args.count - total <= batchSize ? args.count - total : batchSize;

			// Fetching a single batch
			const data = await this.twitter.api().tweets.getTweets(query, batchSize, tweets.next.value);

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
	async likes(id: string, args: TweetListArgsDto): Promise<CursoredDataDto<UserDto>> {
		/** The cursored data to be returned. */
		const likes: CursoredDataDto<UserDto> = new CursoredDataDto<UserDto>([], args.cursor);

		/** The total number of data fetched. */
		let total = 0;

		/** The number of data to fetch at once. */
		let batchSize: number = this.batchSize;

		// Fetching batch-wise, as long as total data fetched is less than required
		do {
			// For last batch, set batch size to amount of data remaining
			/**
			 * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
			 * So the batch size is reduced to the amount of data remaining to fetch
			 */
			batchSize = args.count - total <= batchSize ? args.count - total : batchSize;

			// Fetching a single batch
			const data = await this.twitter.api(true).tweets.getTweetLikers(id, batchSize, likes.next.value);

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
	async retweets(id: string, args: TweetListArgsDto): Promise<CursoredDataDto<UserDto>> {
		/** The cursored data to be returned. */
		const retweets: CursoredDataDto<UserDto> = new CursoredDataDto<UserDto>([], args.cursor);

		/** The total number of data fetched. */
		let total = 0;

		/** The number of data to fetch at once. */
		let batchSize: number = this.batchSize;

		// Fetching batch-wise, as long as total data fetched is less than required
		do {
			// For last batch, set batch size to amount of data remaining
			/**
			 * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
			 * So the batch size is reduced to the amount of data remaining to fetch
			 */
			batchSize = args.count - total <= batchSize ? args.count - total : batchSize;

			// Fetching a single batch
			const data = await this.twitter.api(true).tweets.getTweetRetweeters(id, batchSize, retweets.next.value);

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
