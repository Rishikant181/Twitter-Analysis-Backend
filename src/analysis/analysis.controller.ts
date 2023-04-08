// PACKAGES
import { Controller, Get, Query } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';

// DTOs
import { InterestsDto } from './dto/interests.dto';

@Controller('analysis')
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) {}

	@Get('interests')
	interests(@Query('id') id: string, @Query('count') count: number): Promise<InterestsDto> {
		return this.analysisService.interestsFromTweets(id, count);
	}
}
