// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';
import { TwitterService } from 'src/twitter/twitter.service';

// CONTROLLERS
import { AnalysisController } from './analysis.controller';

@Module({
	controllers: [AnalysisController],
	providers: [AnalysisService, TwitterService]
})

export class AnalysisModule { }