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
import { TweetListArgsDto } from './dto/tweet-list-args.dto';

@Controller('tweet')
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
	
	@Post('/')
	findTweets(@Body() query: TweetQueryDto, @Query() args: TweetListArgsDto): Promise<CursoredData<Tweet>> {
		return this.tweetService.search(query, args.count, args.cursor);
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Tweet> {
		return this.tweetService.find(id);
	}

	@Get(':id/likes')
	findLikes(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredData<User>> {
		return this.tweetService.likes(id, args.count, args.cursor);
	}

	@Get(':id/retweets')
	findRetweets(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredData<User>> {
		return this.tweetService.retweets(id, args.count, args.cursor);
	}
}
