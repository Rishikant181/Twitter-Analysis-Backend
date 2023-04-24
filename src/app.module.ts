import { Module } from '@nestjs/common';
import { TwitterModule } from './twitter/twitter.module';
import { AnalysisModule } from './analysis/analysis.module';
import { AccountModule } from './account/account.module';

@Module({
	imports: [TwitterModule, AnalysisModule, AccountModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
