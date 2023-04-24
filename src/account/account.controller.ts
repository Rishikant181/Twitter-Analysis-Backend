import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('login')
	login(@Body() credentials: unknown): Promise<undefined> {
		return this.accountService.login(credentials);
	}
}
