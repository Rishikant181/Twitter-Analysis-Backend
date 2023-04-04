import { IDocument } from './document.interface';

/**
 * The payload to be sent for classifying a document.
 */
export interface IClassificationPayload {
    /** Input document. */
    document: IDocument;
};