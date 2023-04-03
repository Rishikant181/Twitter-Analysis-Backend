// PACKAGES
import { Injectable } from '@nestjs/common';
import axios from 'axios';

// DTOs
import { EntitySentimentPayload, ClassificationPayload } from './dto/nlp-payload.dto';
import { EntitySentimentResult, ClassificationResult } from './dto/nlp-response.dto';

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
    async getEntitySentiment(texts: string[]): Promise<EntitySentimentResult> {
        // Getting the URL of the API endpoint to be called for sentiment analysis
        const url: string = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.ENTITY_SENTIMENT}?key=${gcloudConfig.API_KEY}`;

        // Preparing the payload
        const payload: EntitySentimentPayload = new EntitySentimentPayload(texts);

        // Getting the sentiment analysis result
        const res: EntitySentimentResult = (await axios.post<EntitySentimentResult>(url, payload)).data;

        return res;
    }

    /**
     * Perform classification on the given text to determine which category the text belongs to.
     * The categories are defined here {@link https://cloud.google.com/natural-language/docs/categories}
     * 
     * @param text The text to be classified.
     * 
     * @returns The classification result along with confidence level.
     */
    async getTextClassification(text: string): Promise<ClassificationResult> {
        // Getting the URL of the API endpoint to be called for text classification
        const url: string = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.TEXT_CLASSIFICATION}?key=${gcloudConfig.API_KEY}`;

        // Preparing the payload
        const payload: ClassificationPayload = new ClassificationPayload(text);

        // Getting the classification result
        const res: ClassificationResult = (await axios.post<ClassificationResult>(url, payload)).data;

        return res;
    }
}