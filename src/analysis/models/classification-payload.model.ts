// MODELS
import { Document } from './document.model';

// INTERFACES
import { IClassificationModelOptions, IClassificationPayload, ContentCategoriesVersion } from '../interface/classification-payload.interface';

/**
 * Options for the V2 model.
 */
export class V2Model implements V2Model {
    /** The content categories used for classification. */
    contentCategoriesVersion: ContentCategoriesVersion;

    constructor() {
        this.contentCategoriesVersion = ContentCategoriesVersion.V2;
    }
}

/**
 * Model options available for classification requests.
 */
export class ClassificationModelOptions implements IClassificationModelOptions {
    /** The classification model to use. */
    v2Model: V2Model;

    constructor() {
        this.v2Model = new V2Model();
    }
}

/**
 * The payload to be sent for classifying a document.
 */
export class ClassificationPayload implements IClassificationPayload {
    /** Input document. */
    document: Document;

    /** Model options to use for classification. Defaults to v2 options. */
    classificationModelOptions: ClassificationModelOptions;

    /**
     * @param text The text which is to be classified.
     */
    constructor(text: string) {
        this.document = new Document(text);
        this.classificationModelOptions = new ClassificationModelOptions();
    }
}