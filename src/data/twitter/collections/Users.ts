// PACKAGE LIBS
import { Rettiwt, User, CursoredData } from 'rettiwt-api';

/**
 * @summary Handles all data operations related to Twitter users
 */
export default class Users {
    // MEMBER DATA
    private cookie: string;                                                 // To store the cookie to use for authenticating rettiwt

    // MEMBER METHODS
    /**
     * @param cookie The cookie to be used for authenticating
     */
    constructor(cookie: string = '') {
        this.cookie = cookie;
    }

    /**
     * @param id The id of the Twitter user, can be username or id
     * @returns The details of the Twitter use with the given id
     */
    public async details(id: string): Promise<User> {
        // If username is provided
        if(isNaN(Number(id))) {
            // Fetching and returning the details using username
            return await Rettiwt().users.getUserDetails(id);
        }
        // If id is provided
        else {
            // Fetching and returning the details using id
            return await Rettiwt().users.getUserDetailsById(id);
        }
    }

    /**
     * @param id The id of the twitter user
     * @param count The number of followers to fetch
     * @param cursor The cursor to next batch
     * @returns The list of follower of the twitter user with the given id
     */
    public async followers(id: string, count: number, cursor: string = ''): Promise<CursoredData<User>> {
        let followers: CursoredData<User> = {
            list: [],
            next: { value: cursor }
        };
        let total: number = 0;                                          // To store the total number of data fetched
        let batchSize: number = 100;                                    // To store the number of data to fetch at once

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // For last batch, set batch size to amount of data remaining
            /** 
             * If the amount of data remaining to fetch ( = count - total) is <= batchSize, this implies this is the last batch.
             * So the batch size is reduced to the amount of data remaining to fetch
             */
            batchSize = ((count - total) <= batchSize) ? (count - total) : batchSize;

            // Fetching a single batch
            let data = await Rettiwt(this.cookie).users.getUserFollowers(id, batchSize, followers.next.value);

            // If no additional data found
            if (!data.list.length) {
                break;
            }

            // Concatenating data
            followers.list = followers.list.concat(data.list);
            followers.next = data.next;

            // Incrementing total data fetched
            total = followers.list.length;
        } while (total < count);

        return followers;
    }
}