// CONTROLLERS
import { Controller } from '@nestjs/common';

// SERVICES
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) { }
}
