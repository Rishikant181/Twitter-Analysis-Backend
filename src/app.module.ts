import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule } from './twitter/twitter.module';
import { AnalysisModule } from './analysis/analysis.module';
import { AccountModule } from './account/account.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TwitterModule,
		AnalysisModule,
		AccountModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
