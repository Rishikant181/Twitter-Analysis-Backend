// PACKAGES
import { Body, Controller, Post } from '@nestjs/common';

// SERVICES
import { AccountService } from './account.service';

// DTOs
import { AuthKeyDto } from 'src/twitter/auth/dto/auth-key.dto';
import { AuthCredentialDto } from 'src/twitter/auth/dto/auth-credential.dto';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) { }

	@Post('login')
	login(@Body() credentials: AuthCredentialDto): Promise<AuthKeyDto> {
		return this.accountService.login(credentials);
	}
}
