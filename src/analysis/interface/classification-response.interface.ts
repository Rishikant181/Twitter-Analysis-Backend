/**
 * Represents a category returned from the text classifier.
 */
export interface IClassificationCategory {
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
export interface IClassificationResponse {
    /** Categories representing the input document. */
    categories: IClassificationCategory[];
}