import { Module } from '@nestjs/common';
import { TwitterModule } from './twitter/twitter.module';

@Module({
	imports: [TwitterModule],
	controllers: [],
	providers: [],
})

export class AppModule { }