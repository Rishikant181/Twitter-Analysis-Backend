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
	findTweets(@Query() query: TweetQueryDto) {
		return "Hello World";
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Tweet> {
		return this.tweetService.find(id);
	}
}
