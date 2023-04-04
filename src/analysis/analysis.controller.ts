// PACKAGES
import { Controller, Get, Param, Query } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) { }

	@Get(':id/interests')
	interests(@Param('id') id: string, @Query('count') count: number) {
		return this.analysisService.getInterests(id, count);
	}
}
