// PACKAGE
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt } from 'rettiwt-api';

// ENTITIES
import { User } from './entities/user.entity';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated cookies are used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class UserService {
    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {}

	/**
	 * @param id The id/username of the twitter user.
	 * @returns The details of the twitter user with the given id/username.
	 */
	find(id: string): Promise<User> {
		// If username is provided
        if(isNaN(Number(id))) {
            // Fetching and returning the details using username
            return Rettiwt().users.getUserDetails(id);
        }
        // If id is provided
        else {
            // Fetching and returning the details using id
            return Rettiwt().users.getUserDetailsById(id);
        }
	}
}
