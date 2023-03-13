// PACKAGES
import { Test, TestingModule } from '@nestjs/testing';

// CONTROLLERS
import { AccountController } from './account.controller';

// SERVICES
import { AccountService } from './account.service';

describe('AccountController', () => {
	let controller: AccountController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccountController],
			providers: [AccountService],
		}).compile();

		controller = module.get<AccountController>(AccountController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
