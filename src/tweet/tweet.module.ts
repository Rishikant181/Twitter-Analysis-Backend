// PACKAGES
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

// MIDDLEWARES
import { ApiAccessCheckMiddleware } from '../middlewares/api-access-check.middleware';

// SERVICES
import { TweetService } from './tweet.service';

// CONTROLLERS
import { TweetController } from './tweet.controller';

@Module({
	controllers: [TweetController],
	providers: [TweetService]
})
export class TweetModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ApiAccessCheckMiddleware);
	}
}
