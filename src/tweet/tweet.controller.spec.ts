// PACKAGE
import { Test, TestingModule } from '@nestjs/testing';

// CONTROLLERS
import { TweetController } from './tweet.controller';

// SERVICES
import { TweetService } from './tweet.service';

describe('TweetController', () => {
	let controller: TweetController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TweetController],
			providers: [TweetService],
		}).compile();

		controller = module.get<TweetController>(TweetController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
