// PACKAGE
import { Controller } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }
}
