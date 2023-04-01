// PACKAGES
import { Inject, Injectable } from '@nestjs/common';

// PROVIDERS
import { TwitterService } from '../twitter.service';

// DTOs
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthKeyDto } from './dto/auth-key.dto';

@Injectable()
export class AuthService {
    /**
     * @param twitter The TweetService instance to use accessing Twitter API.
     */
    constructor(@Inject(TwitterService) private twitter: TwitterService) { }

    /** Login to Twitter account and return the cookies.
     * 
     * @param credentials The credentials to the Twitter account.
     * @returns The cookies after logging in.
     */
    async login(credentials: AuthCredentialDto): Promise<AuthKeyDto> {
        return this.twitter.api().account.login(credentials.email, credentials.userName, credentials.password);
    }
}
