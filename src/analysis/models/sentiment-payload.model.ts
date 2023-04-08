// MODELS
import { Document } from './document.model';

// INTERFACES
import { IEntitySentimentPayload, EEncodingType } from '../interface/sentiment-payload.interface';

/**
 * The payload to be sent for analyzing entity sentiment.
 */
export class EntitySentimentPayload implements IEntitySentimentPayload {
	/** Input document. */
	document: Document;

	/** The encoding type used by the API to calculate offsets. */
	encodingType: EEncodingType;

	/**
	 * @param texts The list of texts whose sentiment is to be analyzed.
	 */
	constructor(texts: string[]) {
		/** The concatenated string, containing all the input texts as a paragraph. */
		const concatString: string = texts.join('');

		this.document = new Document(concatString);
		this.encodingType = EEncodingType.UTF8;
	}
}
