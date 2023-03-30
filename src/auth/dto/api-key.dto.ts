// PACKAGES
import { IAuthCookie } from 'rettiwt-api';

/**
 * The API keys to be used for authenticating RettiwtAPI instance
 */
export class ApiKeyDto implements IAuthCookie {
    /** Token used to authenticate a device. */
    kdt: string;

    /** Token used to authenticate a user using a Twitter ID. */
    twid: string;

    /** The CSRF token of the session. */
    ct0: string;

    /** The authentication token used while logging in to the account. */
    auth_token: string;

    /**
     * @param keys The API keys to be used.
     */
    constructor(keys: IAuthCookie) {
        this.auth_token = keys.auth_token;
        this.ct0 = keys.ct0;
        this.kdt = keys.kdt;
        this.twid = keys.twid;
    }

    /**
     * @returns The string representation of the the API keys
     */
    toString(): string {
        return JSON.stringify(this);
    }
}