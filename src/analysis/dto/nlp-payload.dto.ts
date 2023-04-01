// INTERFACES
import { IPayload, IDocument, EncodingType, ContentType } from '../interface/nlp-payload.interface';

/**
 * Represents the input to API methods.
 */
export class NlpDocumentDto implements IDocument {
    /** The content type of the document. If the type is not set or is TYPE_UNSPECIFIED, returns an INVALID_ARGUMENT error. */
    type: ContentType;

    /** The content of the input in string format. */
    content: string;

    /**
     * Initializes the document representation of the given text.
     * 
     * @param content The text to be represented as a document.
     */
    constructor(content: string) {
        this.type = ContentType.PLAIN_TEXT;
        this.content = content;
    }
};

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

        this.document = new NlpDocumentDto(concatString);
        this.encodingType = EncodingType.UTF8;
    }
}