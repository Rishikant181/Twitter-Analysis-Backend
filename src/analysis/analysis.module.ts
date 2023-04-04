// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AnalysisService } from './analysis.service';
import { TwitterService } from 'src/twitter/twitter.service';
import { TweetService } from 'src/twitter/tweet/tweet.service';
import { UserService } from 'src/twitter/user/user.service';
import { NlpService } from './nlp.service';

// CONTROLLERS
import { AnalysisController } from './analysis.controller';

@Module({
	controllers: [AnalysisController],
	providers: [
		AnalysisService,
		TwitterService,
		TweetService,
		UserService,
		NlpService
	]
})

export class AnalysisModule { }