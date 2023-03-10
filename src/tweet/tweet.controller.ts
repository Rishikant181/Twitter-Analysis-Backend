// PACKAGES
import { Body, Post, Query, Controller, Get, Param } from '@nestjs/common';

// SERVICES
import { TweetService } from './tweet.service';

// ENTITIES
import { Tweet } from './entities/tweet.entity';
import { User } from '../user/entities/user.entity';
import { CursoredData } from '../dto/common.dto';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';

@Controller('tweet')
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
	
	@Post('/')
	findTweets(@Body() query: TweetQueryDto, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<Tweet>> {
		return this.tweetService.search(query, count, cursor);
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Tweet> {
		return this.tweetService.find(id);
	}

	@Get(':id/likes')
	findLikes(@Param('id') id: string, @Query('count') count: number, @Query('cursor') cursor: string): Promise<CursoredData<User>> {
		return this.tweetService.likes(id, count, cursor);
	}

	@Get(':id/retweets')
	findRetweets(@Param('id') id: string, @Query('count') count: number, @Query('cursor') cursor: string): Promise<CursoredData<User>> {
		return this.tweetService.retweets(id, count, cursor);
	}
}
