import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { AccountModule } from './account/account.module';

@Module({
	imports: [UserModule, TweetModule, AccountModule],
	controllers: [],
	providers: [],
})

export class AppModule { }