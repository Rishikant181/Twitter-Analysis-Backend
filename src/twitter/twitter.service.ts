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
			// eslint-disable-next-line
			auth_token: request.headers['auth_token'] as string,
			ct0: request.headers['ct0'] as string,
			kdt: request.headers['kdt'] as string,
			twid: request.headers['twid'] as string,
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
