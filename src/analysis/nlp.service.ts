// PACKAGES
import { Injectable } from '@nestjs/common';
import axios from 'axios';

// DTOs
import { EntitySentimentAnalysisPayLoad } from './dto/nlp-payload.dto';
import { AnalysisResultDto } from './dto/nlp-response.dto';

// CONFIGS
import gcloudConfig from './config/cloud-nlp';

@Injectable()
export class NlpService {
    /**
     * Perform entity-wise sentiment analysis on the list of texts.
     * 
     * @param texts The list of text whose sentiment is to be analyzed.
     * 
     * @returns The aggregate sentiment associated with each entity in the text.
     */
    async getEntitySentiment(texts: string[]): Promise<AnalysisResultDto> {
        // Getting the URL of the API endpoint to be called for sentiment analysis
        const url: string = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.ENTITY_SENTIMENT}?key=${gcloudConfig.API_KEY}`;

        // Preparing the payload
        const payload: EntitySentimentAnalysisPayLoad = new EntitySentimentAnalysisPayLoad(texts);

        // Getting the sentiment analysis result
        const res: AnalysisResultDto = (await axios.post<AnalysisResultDto>(url, payload)).data;

        return res;
    }
}