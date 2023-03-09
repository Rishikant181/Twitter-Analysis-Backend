// PACKAGE
import { Injectable } from '@nestjs/common';
import { Rettiwt } from 'rettiwt-api';

// ENTITIES
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
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
