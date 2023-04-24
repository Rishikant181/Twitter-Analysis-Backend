import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
	imports: [ConfigModule],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
