// PACKAGES
import { Controller } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) { }
}
