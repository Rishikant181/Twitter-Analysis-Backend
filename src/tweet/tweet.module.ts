// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { TweetService } from './tweet.service';

// CONTROLLERS
import { TweetController } from './tweet.controller';

@Module({
	controllers: [TweetController],
	providers: [TweetService]
})

export class TweetModule { }
