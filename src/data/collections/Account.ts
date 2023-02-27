// PACKAGES
import { Rettiwt } from 'rettiwt-api';

/**
 * @summary Handles all data operations related to twitter account
 */
export default class Account {
    /**
     * @param email The email of the twitter account
     * @param userName The username of the user associated with the twitter account
     * @param password The password to the twitter account
     * @returns The cookies after logging in to twitter
     */
    public async login(email: string, userName: string, password: string): Promise<string> {
        // Getting the cookies used to authenticate to Twitter
        return await Rettiwt().account.login(email, userName, password);
    }
}