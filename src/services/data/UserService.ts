// PACKAGE LIBS
import { Rettiwt, User } from 'rettiwt-api';

/**
 * @summary Handles all data related to Twitter users
 */
export default class UserService {
    // MEMBER METHODS

    /**
     * @param userName The username of the Twitter user
     * @returns The details of the Twitter use with the given username
     */
    public async details(userName: string): Promise<User> {
        return await Rettiwt().users.getUserDetails(userName);
    }
}