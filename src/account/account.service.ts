// PACKAGES
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// MODELS
import { Account } from './schema/account.schema';

// DTOs
import { AuthCredentialDto } from 'src/twitter/auth/dto/auth-credential.dto';
import { AuthKeyDto } from 'src/twitter/auth/dto/auth-key.dto';
import { AuthService } from 'src/twitter/auth/auth.service';

@Injectable()
export class AccountService {
	constructor(
		@Inject(ConfigService) private configService: ConfigService,
		@Inject(AuthService) private auth: AuthService,
	) {}

	/**
	 * Login into the twitter account with given credentials.
	 *
	 * @param credential The twitter account credentials.
	 */
	async login(credential: AuthCredentialDto): Promise<AuthKeyDto> {
		return this.auth.login(credential);
	}
}
