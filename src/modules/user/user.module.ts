// PACKAGE
import { Module } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

// CONTROLLERS
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
