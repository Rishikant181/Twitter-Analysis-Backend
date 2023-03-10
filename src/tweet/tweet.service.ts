// PACKAGES
import { Inject, Injectable, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Rettiwt, DataErrors } from 'rettiwt-api';

// ENTITIES
import { Tweet, CursoredData } from './entities/tweet.entity';
import { User } from '../user/entities/user.entity';

/**
 * This service is request-scoped since a new instance is created for every request, and the associated cookies are used to fetch the data.
 */
@Injectable({ scope: Scope.REQUEST })
export class TweetService {
    /** The cookie string to use for authenticatin Rettiwt instance. */
    private cookie: string;

    /**
     * @param request The oncoming HTTP request from the client.
     */
    constructor(@Inject(REQUEST) private request: Request) {
        this.cookie = request.headers['cookie'];
    }

    /**
     * Get the details of the Tweet with the given id/username.
     * 
     * @param id The id of the tweet.
     * @returns The details of the tweet with the given id.
     */
    async find(id: string): Promise<Tweet> {
        // Fetching and returning the details of the tweet with the given id
        return await Rettiwt().tweets.getTweetById(id);
    }
}
