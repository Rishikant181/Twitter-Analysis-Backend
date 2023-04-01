// PACKAGES
import { Body, Post, Query, Controller, Get, Param, UseFilters } from '@nestjs/common';

// SERVICES
import { TweetService } from './tweet.service';

// DTOs
import { TweetQueryDto } from './dto/tweet-query.dto';
import { TweetListArgsDto } from './dto/tweet-list-args.dto';
import { TweetDto } from './dto/tweet.dto';
import { CursoredDataDto } from '../dto/cursored-list.dto';
import { UserDto } from 'src/twitter/user/dto/user.dto';

// FILTERS
import { TwitterErrorFilter } from '../twitter.filter';

@Controller('tweet')
@UseFilters(new TwitterErrorFilter())
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
	
	@Post('/')
	findTweets(@Body() query: TweetQueryDto, @Query() args: TweetListArgsDto): Promise<CursoredDataDto<TweetDto>> {
		return this.tweetService.search(query, args);
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<TweetDto> {
		return this.tweetService.find(id);
	}

	@Get(':id/likes')
	findLikes(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredDataDto<UserDto>> {
		return this.tweetService.likes(id, args);
	}

	@Get(':id/retweets')
	findRetweets(@Param('id') id: string, @Query() args: TweetListArgsDto): Promise<CursoredDataDto<UserDto>> {
		return this.tweetService.retweets(id, args);
	}
}
