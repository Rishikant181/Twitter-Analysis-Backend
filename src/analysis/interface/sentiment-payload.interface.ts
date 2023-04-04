import { IDocument } from './document.interface';

/**
 * Represents the text encoding that the caller uses to process the output.
 */
export enum EncodingType {
    NONE = 'NONE',
    UTF8 = 'UTF8',
    UTF16 = 'UTF16',
    UTF32 = 'UTF32'
};

/**
 * The payload to be sent for analyzing entity sentiment.
 */
export interface IEntitySentimentPayload {
    /** Input document. */
    document: IDocument;

    /** The encoding type used by the API to calculate offsets. */
    encodingType: EncodingType;
};