import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        UserModule,
        TweetModule,
        AuthModule,
        RouterModule.register([
            {
                path: 'twitter',
                module: UserModule
            },
            {
                path: 'twitter',
                module: TweetModule
            },
            {
                path: 'twitter',
                module: AuthModule
            },
        ])
    ],
    controllers: [],
    providers: [],
})

export class TwitterModule { }