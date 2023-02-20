// PACKAGE LIBS
import { Rettiwt, User } from 'rettiwt-api';

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
}