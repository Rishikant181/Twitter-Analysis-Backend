// PACKAGES
import { Test, TestingModule } from '@nestjs/testing';

// SERVICES
import { AnalysisService } from './analysis.service';

describe('AnalysisService', () => {
	let service: AnalysisService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AnalysisService],
		}).compile();

		service = module.get<AnalysisService>(AnalysisService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
