import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, TweetModule, AuthModule],
	controllers: [],
	providers: [],
})

export class AppModule { }