/**
 * The different type of document content.
 */
export enum ContentType {
    TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
    PLAIN_TEXT = 'PLAIN_TEXT',
    HTML = 'HTML'
};

/**
 * The document to be analyzed.
 */
export interface Document {
    type: ContentType;
    language: string;
    content: string;
};

/**
 * The different encoding types that a document uses.
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
export interface Payload {
    document: Document;
    encodingType: EncodingType;
};

/**
 * The different entity types that can be identified.
 */
export enum EntityType {
    UNKNOWN = 'UNKNOWN',
    PERSON = 'PERSON',
    LOCATION = 'LOCATION',
    ORGANIZATON = 'ORGANIZATION',
    EVENT = 'EVENT',
    WORK_OF_ART = 'WORK_OF_ART',
    CONSUMER_GOOD = 'CONSUMER_GOOD',
    OTHER = 'OTHER',
    PHONE_NUMER = 'PHONE_NUMBER',
    ADDRESS = 'ADDRESS',
    DATE = 'DATE',
    NUMBER = 'NUMBER',
    PRICE = 'PRICE'
};

/**
 * The span of the mentioned entity in the given document.
 */
export interface TextSpan {
    content: string;
    beginOffset: number;
};

/**
 * The type of noun that the entity is.
 */
export enum EntityMentionType {
    TYPE_UNKNOWN = 'TYPE_UNKNOWN',
    PROPER = 'PROPER',
    COMMON = 'COMMON'
};

/**
 * 
 */
export interface Sentiment {
    magnitude: number;
    score: number
}

export interface EntityMention {
    text: TextSpan;
    type: EntityMentionType;
    sentiment: Sentiment;
}

/**
 * The analysis result of each individual entity.
 */
export interface Entity {
    name: string;
    type: EntityType;
    salience: number;
    mentions: EntityMention[];
    sentiment: Sentiment;
}

/**
 * The response received from Cloud Natural Language API.
 */
export interface Response {
    entities: Entity[];
    language: string;
}