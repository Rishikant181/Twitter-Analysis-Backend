import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TweetModule } from './modules/tweet/tweet.module';

@Module({
	imports: [UserModule, TweetModule],
	controllers: [],
	providers: [],
})

export class AppModule { }