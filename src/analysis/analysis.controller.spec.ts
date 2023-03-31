// PACKAGES
import { Test, TestingModule } from '@nestjs/testing';

// CONTROLLERS
import { AnalysisController } from './analysis.controller';

// SERVICES
import { AnalysisService } from './analysis.service';

describe('AnalysisController', () => {
	let controller: AnalysisController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AnalysisController],
			providers: [AnalysisService],
		}).compile();

		controller = module.get<AnalysisController>(AnalysisController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
