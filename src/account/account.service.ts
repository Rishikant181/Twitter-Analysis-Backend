// PACKAGES
import { Injectable } from '@nestjs/common';
import { Rettiwt } from 'rettiwt-api';

// DTOs
import { AccountCredentialDto } from './dto/account-credential.dto';

@Injectable()
export class AccountService {
    /** Login to Twitter account and return the cookies.
     * 
     * @param credentials The credentials to the Twitter account.
     * @returns The cookies after logging in.
     */
    async login(credentials: AccountCredentialDto) {
        return Rettiwt().account.login(credentials.email, credentials.userName, credentials.password);
    }
}
