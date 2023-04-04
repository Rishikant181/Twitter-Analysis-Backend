/**
 * The type of the entity.
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
 * Represents an output piece of text.
 */
export interface ITextSpan {
    /** The content of the output text. */
    content: string;

    /** The beginning offset of the content in the original document. */
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
 * Represents the feeling associated with the entire text or entities in the text.
 */
export interface ISentiment {
    /** The absolute magnitude of sentiment, in [0, +inf) range. */
    magnitude: number;

    /** Sentiment score between -1.0 (negative sentiment) and 1.0 (positive sentiment). */
    score: number
}

/**
 * Represents a mention for an entity in the text.  
 * Currently, proper noun mentions are supported.  
 */
export interface IEntityMention {
    /** The mention text. */
    text: ITextSpan;

    /** The type of the entity mention. */
    type: EntityMentionType;

    /** The sentiment expressed for this mention of the entity in the provided document. */
    sentiment: ISentiment;
}

/**
 * Represents a phrase in the text that is a known entity, such as a person, an organization, or location.
 */
export interface IEntity {
    /** The representative name for the entity. */
    name: string;

    /** The entity type. */
    type: EntityType;

    /**
     * The salience score associated with the entity in the [0, 1.0] range.  
     * The salience score for an entity provides information about the importance or centrality of that entity to the entire document text.  
     * Scores closer to 0 are less salient, while scores closer to 1.0 are highly salient.  
     */
    salience: number;

    /**
     * The mentions of this entity in the input document.  
     * The API currently supports proper noun mentions.  
     */
    mentions: IEntityMention[];

    /** The aggregate sentiment expressed for this entity in the provided document. */
    sentiment: ISentiment;
}

/**
 * The entity-level sentiment analysis response message.
 */
export interface IEntitySentimentResult {
    /** The recognized entities in the input document with associated sentiments. */
    entities: IEntity[];

    /** The language of the text as specified in the request or automatically-detected. */
    language: string;
}