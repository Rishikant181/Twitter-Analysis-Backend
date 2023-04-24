// PACKAGES
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// MODELS
import { Account } from './schema/account.schema';

// DTOs
import { AuthCredentialDto } from 'src/twitter/auth/dto/auth-credential.dto';
import { AuthKeyDto } from 'src/twitter/auth/dto/auth-key.dto';
import { AuthService } from 'src/twitter/auth/auth.service';
import { HttpStatusCode } from 'axios';

@Injectable()
export class AccountService {
	constructor(
		@Inject(ConfigService) private configService: ConfigService,
		@Inject(AuthService) private auth: AuthService,
		@InjectModel(Account.name) private accountModel: Model<Account>
	) { }

	/**
	 * Login into the twitter account with given credentials.
	 *
	 * @param credential The twitter account credentials.
	 */
	async login(credential: AuthCredentialDto): Promise<AuthKeyDto> {
		// Getting the account details of the account with the given email
		const account: Account = await this.accountModel.findOne({ email: credential.email });

		// If account does not exist, then login to twitter
		if (!account) {
			return await this.auth.login(credential);
		}
		// If account exists, check password
		else if (credential.password == account.password) {
			return {
				kdt: account.kdt,
				twid: account.twid,
				ct0: account.ct0,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				auth_token: account.auth_token
			};
		}
		// If wrong password
		else {
			throw new HttpException('Wrong password!', HttpStatusCode.Unauthorized);
		}
	}
}
