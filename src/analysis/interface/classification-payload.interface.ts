import { IDocument } from './document.interface';

/**
 * The content categories used for classification.
 */
export enum ContentCategoriesVersion {
    /** If ContentCategoriesVersion is not specified, this option will default to V1. */
    CONTENT_CATEGORIES_VERSION_UNSPECIFIED = 'CONTENT_CATEGORIES_VERSION_UNSPECIFIED',

    /** Legacy content categories of our initial launch in 2017. */
    V1 = 'V1',

    /** Updated content categories in 2022. */
    V2 = 'V2'
}

/**
 * Options for the V2 model.
 */
export interface IV2Model {
    /** The content categories used for classification. */
    contentCategoriesVersion: ContentCategoriesVersion;
}

/**
 * Model options available for classification requests.
 */
export interface IClassificationModelOptions {
    /** The classification model to use. */
    v2Model: IV2Model;
}

/**
 * The payload to be sent for classifying a document.
 */
export interface IClassificationPayload {
    /** Input document. */
    document: IDocument;

    /** Model options to use for classification. Defaults to v2 options. */
    classificationModelOptions: IClassificationModelOptions
};