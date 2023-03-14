// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AuthService } from './auth.service';

// CONTROLLERS
import { AuthController } from './auth.controller';

@Module({
	controllers: [AuthController],
	providers: [AuthService]
})

export class AuthModule { }
