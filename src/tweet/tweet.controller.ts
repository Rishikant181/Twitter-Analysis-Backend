// PACKAGES
import { Controller } from '@nestjs/common';

// SERVICES
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
	constructor(private readonly tweetService: TweetService) { }
}
