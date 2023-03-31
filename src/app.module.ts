import { Module } from '@nestjs/common';
import { UserModule } from './twitter/user/user.module';
import { TweetModule } from './twitter/tweet/tweet.module';
import { AuthModule } from './twitter/auth/auth.module';

@Module({
	imports: [UserModule, TweetModule, AuthModule],
	controllers: [],
	providers: [],
})

export class AppModule { }