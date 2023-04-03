// PACKAGES
import { Injectable, Inject } from '@nestjs/common';

// SERVICES
import { TwitterService } from 'src/twitter/twitter.service';
import { NlpService } from './nlp.service';

// DTOs
import { EntitySentimentResult } from './dto/nlp-response.dto';

@Injectable()
export class AnalysisService {
    constructor(@Inject(TwitterService) private twitter: TwitterService, @Inject(NlpService) private nlp: NlpService) { }

    /**
     * Performs an analysis on a Twitter user with the given id, based on most recent 'count' number of tweets.
     * 
     * @param id The id of target Twitter user.
     * @param count The number of tweets based on which analysis is to be done.
     * 
     * @returns The analysis result, based on the most recent 'count' number of tweets.
     */
    async analyzeTweets(id: string, count: number): Promise<EntitySentimentResult> {
        // Getting the username of the target Twitter user
        const userName: string = (await this.twitter.api().users.getUserDetails(id)).userName;
        
        // Getting the list of tweets to analyze, then extracting only the tweet texts from it
        const tweets: string[] = (await this.twitter.api().tweets.getTweets({
            fromUsers: [userName],
        }, count)).list.map(tweet => tweet.fullText);

        // Performaing analysis
        const analysisRes: EntitySentimentResult = await this.nlp.getEntitySentiment(tweets);

        return analysisRes;
    }
}