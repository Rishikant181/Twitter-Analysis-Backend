/**
 * The document types enum.
 */
export enum IContentType {
    TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
    PLAIN_TEXT = 'PLAIN_TEXT',
    HTML = 'HTML'
};

/**
 * Represents the input to API methods.
 */
export interface IDocument {
    /** The content type of the docuemnt. If the type is not set or is TYPE_UNSPECIFIED, returns an INVALID_ARGUMENT error. */
    type: IContentType;

    /** The language of the document (if not specified, the language is automatically detected). */
    language: string;

    /** The content of the input in string format. */
    content: string;
};

/**
 * Represents the text encoding that the caller uses to process the output.
 */
export enum IEncodingType {
    NONE = 'NONE',
    UTF8 = 'UTF8',
    UTF16 = 'UTF16',
    UTF32 = 'UTF32'
};

/**
 * The payload to be sent for analyzing entity sentiment.
 */
export interface IPayload {
    /** Input document. */
    document: IDocument;

    /** The encoding type used by the API to calculate offsets. */
    encodingType: IEncodingType;
};