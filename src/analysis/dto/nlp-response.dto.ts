import { IEntity, IEntitySentimentResponse, EntityType, EntityMentionType, IEntityMention, ISentiment, ITextSpan, IClassificationCategory, IClassificationResponse } from '../interface/nlp-response.interface';

/**
 * Represents an output piece of text.
 */
export class TextSpan implements ITextSpan {
    /** The content of the output text. */
    content: string;

    /** The beginning offset of the content in the original document. */
    beginOffset: number;
};

/**
 * Represents the feeling associated with the entire text or entities in the text.
 */
export class Sentiment implements ISentiment {
    /** The absolute magnitude of sentiment, in [0, +inf) range. */
    magnitude: number;

    /** Sentiment score between -1.0 (negative sentiment) and 1.0 (positive sentiment). */
    score: number
}

/**
 * Represents a mention for an entity in the text.  
 * Currently, proper noun mentions are supported.  
 */
export class EntityMention implements IEntityMention {
    /** The mention text. */
    text: ITextSpan;

    /** The type of the entity mention. */
    type: EntityMentionType;

    /** The sentiment expressed for this mention of the entity in the provided document. */
    sentiment: Sentiment;
}

/**
 * Represents a phrase in the text that is a known entity, such as a person, an organization, or location.
 */
export class Entity implements IEntity {
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
    sentiment: Sentiment;
}

/**
 * The entity-level sentiment analysis response message.
 */
export class EntitySentimentResult implements IEntitySentimentResponse {
    /** The recognized entities in the input document with associated sentiments. */
    entities: Entity[];

    /** The language of the text as specified in the request or automatically-detected. */
    language: string;
}

/**
 * Represents a category returned from the text classifier.
 */
export class ClassificationCategory implements IClassificationCategory {
    /**
     * The name of the category representing the document.
     * The categories are defined here {@link https://cloud.google.com/natural-language/docs/categories}
     */
    name: string;

    /** 
     * The classifier's confidence of the category.  
     * Number represents how certain the classifier is that this category represents the given text.  
     */
    confidence: number;
}

/**
 * The document classification response message.
 */
export class ClassificationResponse implements IClassificationResponse {
    /** Categories representing the input document. */
    categories: ClassificationCategory;
}