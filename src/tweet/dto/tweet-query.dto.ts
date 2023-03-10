// PACKAGE
import { TweetFilter } from 'rettiwt-api';

export class TweetQueryDto implements TweetFilter {
    /** The list of words to search. */
    words?: string[];

    /** The list of hashtags to search.
     *
     * @remarks
     * '#' must be excluded from the hashtag!
     */
    hashtags?: string[];

    /** The list of usernames whose tweets are to be searched.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    fromUsers?: string[];

    /** The list of username to whom the tweets to be searched, are adressed.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    toUsers?: string[];

    /** The list of username mentioned in the tweets to search.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    mentions?: string[];

    /** The date starting from which tweets are to be searched.
     *
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    startDate?: string;

    /** The date upto which tweets are to be searched.
     *
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    endDate?: string;

    /** The id of the tweet, after which the tweets are to be searched. */
    sinceId?: string;

    /** The id of the tweet which is quoted in the tweets to search. */
    quoted?: string;
    
    /** Whether to fetch tweets that are links or not.
     *
     * @defaultValue false
     */
    links?: boolean;
}