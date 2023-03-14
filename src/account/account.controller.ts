// CONTROLLERS
import { Controller, Post, Body } from '@nestjs/common';

// SERVICES
import { AccountService } from './account.service';

// DTOs
import { AccountCredentialDto } from './dto/account-credential.dto';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) { }

	@Post('login')
	login(@Body('credentials') credentials: AccountCredentialDto) {
		return 'Logged in!';
	}
}
