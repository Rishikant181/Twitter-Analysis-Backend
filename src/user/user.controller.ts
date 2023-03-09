// PACKAGE
import { Controller, Get, Param } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

// ENTITIES
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(':id')
	find(@Param('id') id: string): Promise<User> {
		return this.userService.find(id);
	}
}
