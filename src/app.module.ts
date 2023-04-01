import { Module } from '@nestjs/common';
import { TwitterModule } from './twitter/twitter.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
	imports: [TwitterModule, AnalysisModule],
	controllers: [],
	providers: [],
})

export class AppModule { }