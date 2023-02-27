// COLLECTIONS
import Account from "./collections/Account";
import Tweets from "./collections/Tweets";
import Users from "./collections/Users";

/**
 * @summary Defines the context which handle all data operations on Twitter
 */
export default class TwitterContext {
    // MEMBER DATA
    public users: Users;                                            // To store the collection from where to fetch twitter user data
    public tweets: Tweets;                                          // To store the collection from where to fetch twitter tweet data
    public account: Account;                                        // To store the collection from where to fetch data of logged in account
    
    // MEMBER METHODS
    /**
     * @param cookie The cookie to be used for authenticating
     */
    constructor(cookie: string = '') {
        this.users = new Users(cookie);
        this.tweets = new Tweets(cookie);
        this.account = new Account();

    }
}