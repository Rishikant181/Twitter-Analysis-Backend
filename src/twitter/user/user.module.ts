// PACKAGE
import { Module } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

// PROVIDERS
import { TwitterService } from '../twitter.service';

// CONTROLLERS
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService, TwitterService]
})

export class UserModule { }
