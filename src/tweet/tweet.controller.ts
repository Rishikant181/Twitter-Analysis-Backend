// PACKAGES
import { Controller, Get, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';

// SERVICES
import { TweetService } from './tweet.service';

// ENTITIES
import { Tweet, CursoredData } from './entities/tweet.entity';
import { User } from '../user/entities/user.entity';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';

@Controller('tweet')
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
	
	@Get('/')
	findTweets(@Query('query') query: string, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<Tweet>> {
		return this.tweetService.search(JSON.parse(query), count, cursor);
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
