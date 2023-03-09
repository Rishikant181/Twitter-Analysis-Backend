// PACKAGE
import { Controller, Get, Param } from '@nestjs/common';
import { Query, Req } from '@nestjs/common/decorators';

// SERVICES
import { UserService } from './user.service';

// ENTITIES
import { User } from './entities/user.entity';
import { CursoredData } from '../entities/cursored.entity';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(':id')
	find(@Param('id') id: string): Promise<User> {
		return this.userService.find(id);
	}

	@Get(':id/followers')
	followers(@Req() request: Request, @Param('id') id: string, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<User>> {
		
	}
}
