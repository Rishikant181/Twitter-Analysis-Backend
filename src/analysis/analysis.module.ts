// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';

// CONTROLLERS
import { AnalysisController } from './analysis.controller';

@Module({
	controllers: [AnalysisController],
	providers: [AnalysisService]
})

export class AnalysisModule { }