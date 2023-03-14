// PACKAGES
import { Test, TestingModule } from '@nestjs/testing';

// CONTROLLERS
import { AuthController } from './auth.controller';

// SERVICES
import { AuthService } from './auth.service';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
