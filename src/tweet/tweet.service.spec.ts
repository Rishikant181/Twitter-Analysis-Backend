// PACKAGES
import { Test, TestingModule } from '@nestjs/testing';

// SERVICES
import { TweetService } from './tweet.service';

describe('TweetService', () => {
	let service: TweetService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TweetService],
		}).compile();

		service = module.get<TweetService>(TweetService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
