// PACKAGES
import { Body, Post, Query, Controller, Get, Param, UseFilters } from '@nestjs/common';
import { CursoredData, Tweet, User } from 'rettiwt-api';

// SERVICES
import { TweetService } from './tweet.service';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';
import { TweetListArgsDto } from './dto/tweet-list-args.dto';

// FILTERS
import { TwitterErrorFilter } from 'src/filters/twitter-error.filter';

@Controller('twitter/tweet')
@UseFilters(new TwitterErrorFilter())
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
	
	@Post('/')
	findTweets(@Body() query: TweetQueryDto, @Query() args: TweetListArgsDto): Promise<CursoredData<Tweet>> {
		return this.tweetService.search(query, args);
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Tweet> {
		return this.tweetService.find(id);
	}

	@Get(':id/likes')
	findLikes(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredData<User>> {
		return this.tweetService.likes(id, args);
	}

	@Get(':id/retweets')
	findRetweets(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredData<User>> {
		return this.tweetService.retweets(id, args);
	}
}
