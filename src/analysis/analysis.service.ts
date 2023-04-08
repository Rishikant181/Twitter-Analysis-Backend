// PACKAGES
import { Injectable, Inject } from '@nestjs/common';

// SERVICES
import { TwitterService } from 'src/twitter/twitter.service';
import { TweetService } from 'src/twitter/tweet/tweet.service';
import { UserService } from 'src/twitter/user/user.service';
import { NlpService } from './nlp.service';

// MODELS
import { EntitySentimentResponse } from './models/entity-sentiment-response.model';
import { ClassificationResponse } from './models/classification-response.model';

// DTOs
import { TweetDto } from 'src/twitter/tweet/dto/tweet.dto';
import { Interest, InterestsDto } from './dto/interests.dto';

@Injectable()
export class AnalysisService {
	constructor(
		@Inject(TwitterService) private twitter: TwitterService,
		@Inject(TweetService) private tweets: TweetService,
		@Inject(UserService) private users: UserService,
		@Inject(NlpService) private nlp: NlpService,
	) {}

	/**
	 * Fetches the most recent 'count' number of tweets of the Twitter user with the given id.
	 *
	 * @param id The id/username of the Twitter user.
	 * @param count The number of tweets to fetch.
	 *
	 * @returns The most recent 'count' number of Tweets of the given target user.
	 */
	private async getUserTweets(id: string, count: number): Promise<TweetDto[]> {
		// Getting the username of the target Twitter user
		const userName: string = (await this.users.find(id)).userName;

		// Getting the list of tweets to analyze, then extracting only the tweet texts from it
		const tweets: TweetDto[] = (await this.tweets.search({ fromUsers: [userName] }, { count: count })).list;

		return tweets;
	}

	/**
	 * Performs an analysis on a Twitter user with the given id, based on most recent 'count' number of tweets.
	 *
	 * @param id The id/username of target Twitter user.
	 * @param count The number of tweets based on which analysis is to be done.
	 *
	 * @returns The analysis result, based on the most recent 'count' number of tweets.
	 */
	async sentimentFromTweets(id: string, count: number): Promise<EntitySentimentResponse> {
		// Getting the list of tweets' text
		const tweets: string[] = (await this.getUserTweets(id, count)).map((tweet) => tweet.fullText);

		// Performaing analysis
		const analysisRes: EntitySentimentResponse = await this.nlp.getEntitySentiment(tweets);

		return analysisRes;
	}

	/**
	 * Analyzes the most recent 'count' number of tweets of the target user to determine their interests.
	 *
	 * @param id The id/username of the Twitter user whose interests are to be analyzed.
	 * @param count The number of tweets to anaylyze.
	 *
	 * @returns The percentage interests of the Twitter user.
	 */
	async interestsFromTweets(id: string, count: number): Promise<InterestsDto> {
		/** The frequence of each category in the list of tweets. */
		const categoryFreq: { [key: string]: number } = {};

		/** The interests of the Twitter user. */
		const result: InterestsDto = new InterestsDto();

		// Getting the list of tweets' text
		const tweets: string[] = (await this.getUserTweets(id, count)).map((tweet) => tweet.fullText);

		// Getting the number of tweets to be analyzed
		const total: number = tweets.length;

		// Classifying the tweets list
		const res: ClassificationResponse[] = await this.nlp.getTextClassification(tweets);

		// Iterating over each result
		for (const classification of res) {
			// Getting the dominant predicted category from the response
			/**
			 * If the classfier failed to indentify category, returning 'Other' for it.
			 * Else, the returned category name is used.
			 */
			const category: string = classification.categories[0] ? classification.categories[0].name : 'Other';

			/**
			 * If category has not been stored in freq map, set it's freq to one.
			 * Else, increment freq.
			 */
			categoryFreq[category] = categoryFreq[category] != undefined ? categoryFreq[category] + 1 : 1;
		}

		// Storing the frequency in final result
		for (const [name, freq] of Object.entries(categoryFreq)) {
			result.interests.push(new Interest(name, freq, total));
		}

		// Storing the total number of tweets in result
		result.total = total;

		return result;
	}
}
