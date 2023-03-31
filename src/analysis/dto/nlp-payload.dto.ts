// INTERFACES
import { IPayload, IDocument, EncodingType, ContentType } from '../interface/nlp-payload.interface';

/**
 * The payload to be sent for analyzing entity sentiment.
 */
export class NlpPayLoadDto implements IPayload {
    /** Input document. */
    document: IDocument;

    /** The encoding type used by the API to calculate offsets. */
    encodingType: EncodingType;

    /**
     * @param texts The list of texts whose sentiment is to be analyzed.
     */
    constructor(texts: string[]) {
        /** The concatenated string, containing all the input texts as a paragraph. */
        let concatString: string = texts.join('');

        this.document = {
            type: ContentType.PLAIN_TEXT,
            content: concatString
        };
        this.encodingType = EncodingType.UTF8;
    }
}