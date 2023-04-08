// PACKAGES
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt, IDataContext } from 'rettiwt-api';

// DTOs
import { AuthKeyDto } from 'src/twitter/auth/dto/auth-key.dto';

@Injectable({ scope: Scope.REQUEST })
export class TwitterService {
	/** The API keys to use for authenticating Rettiwt instance. */
	private apiKey: AuthKeyDto;

	/**
	 * @param request The oncoming HTTP request from the client.
	 */
	constructor(@Inject(REQUEST) private request: Request) {
		// Getting the API keys from request header
		this.apiKey = {
			auth_token: request.headers['auth_token'],
			ct0: request.headers['ct0'],
			kdt: request.headers['kdt'],
			twid: request.headers['twid'],
		};
	}

	/**
	 * @param authenticate Whether to use authentication for fetching data from Twitter.
	 *
	 * @returns The API instance to use for fetching data from Twitter.
	 */
	api(authenticate = false): IDataContext {
		return Rettiwt(authenticate ? this.apiKey : undefined);
	}
}
