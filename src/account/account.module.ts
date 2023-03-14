// PACKAGES
import { Module } from '@nestjs/common';

// SERVICES
import { AccountService } from './account.service';

// CONTROLLERS
import { AccountController } from './account.controller';

@Module({
	controllers: [AccountController],
	providers: [AccountService]
})

export class AccountModule { }
