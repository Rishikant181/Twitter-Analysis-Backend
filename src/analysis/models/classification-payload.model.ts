// MODELS
import { Document } from './document.model';

// INTERFACES
import { IClassificationPayload } from '../interface/classification-payload.interface';

/**
 * The payload to be sent for classifying a document.
 */
export class ClassificationPayload implements IClassificationPayload {
    /** Input document. */
    document: Document;

    /**
     * @param text The text which is to be classified.
     */
    constructor(text: string) {
        this.document = new Document(text);
    }
}