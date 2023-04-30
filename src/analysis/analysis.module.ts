// PACKAGES
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
		{
			provide: NlpService,
			inject: [ConfigService],
			useFactory: (config: ConfigService): NlpService => new NlpService(config.get<string>('CLOUD_NLP_API_KEY'))
		}
	],
})
export class AnalysisModule { }
