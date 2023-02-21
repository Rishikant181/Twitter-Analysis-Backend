// PACKAGE LIBS
import { Rettiwt, User, CursoredData } from 'rettiwt-api';

/**
 * @summary Handles all data operations related to Twitter users
 */
export default class Users {
    // MEMBER METHODS

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

        // Fetching batch-wise, as long as total data fetched is less than required
        do {
            // Fetching a single batch
            let data = await Rettiwt().users.getUserFollowers(id, 100, followers.next.value);

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