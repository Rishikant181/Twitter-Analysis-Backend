// PACKAGES
import { Injectable } from '@nestjs/common';
import { Rettiwt } from 'rettiwt-api';

// DTOs
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    /** Login to Twitter account and return the cookies.
     * 
     * @param credentials The credentials to the Twitter account.
     * @returns The cookies after logging in.
     */
    async login(credentials: AuthCredentialDto) {
        return Rettiwt().account.login(credentials.email, credentials.userName, credentials.password);
    }
}
