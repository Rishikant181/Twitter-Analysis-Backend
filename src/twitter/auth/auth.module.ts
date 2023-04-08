// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AuthService } from './auth.service';

// PROVIERS
import { TwitterService } from '../twitter.service';

// CONTROLLERS
import { AuthController } from './auth.controller';

@Module({
	controllers: [AuthController],
	providers: [AuthService, TwitterService],
})
export class AuthModule {}
