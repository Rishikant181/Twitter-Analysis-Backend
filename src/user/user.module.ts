// PACKAGE
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

// MIDDLEWARES
import { ApiAccessCheckMiddleware } from '../middlewares/api-access-check.middleware';

// SERVICES
import { UserService } from './user.service';

// CONTROLLERS
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ApiAccessCheckMiddleware);
    }
}
