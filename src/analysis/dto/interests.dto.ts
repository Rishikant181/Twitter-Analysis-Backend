// INTERFACES
import { IInterest, IInterests } from '../interface/interests-interface';

/**
 * Represents the percentage of total input tweets what fall into a specific category.
 */
export class Interest implements IInterest {
    /**
     * The name of the category representing the document.
     * The categories are defined here {@link https://cloud.google.com/natural-language/docs/categories}
     */
    name: string;

    /** The number of tweets that fall into this category. */
    count: number;

    /**
     * The percentage of input tweets which fall into this category.
     */
    percentage: number;

    /**
     * @param name The name of the category.
     * @param count The number of tweets that fall into this category.
     * @param total The total number of tweets used for analysis.
     */
    constructor(name: string, count: number, total: number) {
        this.name = name;
        this.count = count;
        this.percentage = (count / total) * 100;
    }
}

/**
 * Represents the percentage share of different interests.
 */
export class InterestsDto implements IInterests {
    /** The list of interests of the user. */
    interests: Interest[];

    /** The total number of tweets based on which the analysis was done. */
    total: number;
}