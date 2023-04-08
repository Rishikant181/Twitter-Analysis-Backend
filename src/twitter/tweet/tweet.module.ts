// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { TweetService } from './tweet.service';

// PROVIDERS
import { TwitterService } from '../twitter.service';

// CONTROLLERS
import { TweetController } from './tweet.controller';

@Module({
	controllers: [TweetController],
	providers: [TweetService, TwitterService],
})
export class TweetModule {}
