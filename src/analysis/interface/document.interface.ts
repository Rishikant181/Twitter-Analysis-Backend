/**
 * The document types enum.
 */
export enum ContentType {
    TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
    PLAIN_TEXT = 'PLAIN_TEXT',
    HTML = 'HTML'
};

/**
 * Represents the input to API methods.
 */
export interface IDocument {
    /** The content type of the docuemnt. If the type is not set or is TYPE_UNSPECIFIED, returns an INVALID_ARGUMENT error. */
    type: ContentType;

    /** The content of the input in string format. */
    content: string;
};