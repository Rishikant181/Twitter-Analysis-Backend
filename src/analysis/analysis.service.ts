// PACKAGES
import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';

// SERVICES
import { TwitterService } from 'src/twitter/twitter.service';

// DTOs
import { AnalysisPayLoad } from './dto/nlp-payload.dto';
import { AnalysisResultDto } from './dto/nlp-response.dto';

// CONFIGS
import gcloudConfig from './config/cloud-nlp';

@Injectable()
export class AnalysisService {
    constructor(@Inject(TwitterService) private twitter: TwitterService) { }

    /**
     * Perform entity-wise sentiment analysis on the list of texts.
     * 
     * @param texts The list of text whose sentiment is to be analyzed.
     * 
     * @returns The aggregate sentiment associated with each entity in the text.
     */
    private async getSentiment(texts: string[]): Promise<AnalysisResultDto> {
        // Getting the URL of the API endpoint to be called for sentiment analysis
        const url: string = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.ENTITY_SENTIMENT}?key=${gcloudConfig.API_KEY}`;

        // Preparing the payload
        const payload: AnalysisPayLoad = new AnalysisPayLoad(texts);

        // Getting the sentiment analysis result
        const res: AnalysisResultDto = (await axios.post<AnalysisResultDto>(url, payload)).data;

        return res;
    }

    /**
     * Performs an analysis on a Twitter user with the given id, based on most recent 'count' number of tweets.
     * 
     * @param id The id of target Twitter user.
     * @param count The number of tweets based on which analysis is to be done.
     * 
     * @returns The analysis result, based on the most recent 'count' number of tweets.
     */
    async analyzeTweets(id: string, count: number): Promise<AnalysisResultDto> {
        // Getting the username of the target Twitter user
        const userName: string = (await this.twitter.api().users.getUserDetails(id)).userName;
        
        // Getting the list of tweets to analyze, then extracting only the tweet texts from it
        const tweets: string[] = (await this.twitter.api().tweets.getTweets({
            fromUsers: [userName],
        }, count)).list.map(tweet => tweet.fullText);

        // Performaing analysis
        const analysisRes: AnalysisResultDto = await this.getSentiment(tweets);

        return analysisRes;
    }
}