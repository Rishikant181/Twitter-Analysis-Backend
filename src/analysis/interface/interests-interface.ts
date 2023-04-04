/**
 * Represents the percentage of total input tweets what fall into a specific category.
 */
export interface IInterest {
    /**
     * The name of the category representing the document.
     * The categories are defined here {@link https://cloud.google.com/natural-language/docs/categories}
     */
    name: string;

    /** The number of tweets that fall into this category. */
    count: number;

    /** The percentage of input tweets which fall into this category. */
    percentage: number;
}

/**
 * Represents the percentage share of different interests.
 */
export interface IInterests {
    /** The list of interests of the user. */
    interests: IInterest[];

    /** The total number of tweets based on which the analysis was done. */
    total: number;
}