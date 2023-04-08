// PACKAGES
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

// MODELS
import { EntitySentimentPayload } from './models/sentiment-payload.model';
import { EntitySentimentResponse } from './models/entity-sentiment-response.model';
import { ClassificationPayload } from './models/classification-payload.model';
import { ClassificationResponse } from './models/classification-response.model';

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
	async getEntitySentiment(texts: string[]): Promise<EntitySentimentResponse> {
		// Getting the URL of the API endpoint to be called for sentiment analysis
		const url = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.ENTITY_SENTIMENT}?key=${gcloudConfig.API_KEY}`;

		// Preparing the payload
		const payload: EntitySentimentPayload = new EntitySentimentPayload(texts);

		// Getting the sentiment analysis result
		const res: EntitySentimentResponse = (await axios.post<EntitySentimentResponse>(url, payload)).data;

		return res;
	}

	/**
	 * Perform classification on the given text to determine which category the text belongs to.
	 * The categories are defined here {@link https://cloud.google.com/natural-language/docs/categories}
	 *
	 * @param texts The list of text to be classified.
	 *
	 * @returns The classification result along with confidence level.
	 */
	async getTextClassification(texts: string[]): Promise<ClassificationResponse[]> {
		/** The list of response promises from different threads. */
		const promiseList: Promise<AxiosResponse<ClassificationResponse>>[] = [];

		/** The list of classification results of the list of text. */
		let res: ClassificationResponse[] = [];

		// Getting the URL of the API endpoint to be called for text classification
		const url = `${gcloudConfig.BASE_URL}${gcloudConfig.endpoints.TEXT_CLASSIFICATION}?key=${gcloudConfig.API_KEY}`;

		// Running classification on each text
		for (const text of texts) {
			// Preparing the payload
			const payload: ClassificationPayload = new ClassificationPayload(text);

			// Getting the classification result and adding the promise to the list of promises
			promiseList.push(axios.post<ClassificationResponse>(url, payload));
		}

		// Waiting for all the promises to be resolved, then extracting data from each of the promise
		res = (await Promise.all(promiseList)).map((res) => res.data);

		return res;
	}
}
