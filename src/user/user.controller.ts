// PACKAGE
import { Controller, Get, Param, Query } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

// ENTITIES
import { User } from './entities/user.entity';
import { Tweet } from '../tweet/entities/tweet.entity';
import { CursoredData } from '../dto/common.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(':id')
	find(@Param('id') id: string): Promise<User> {
		return this.userService.find(id);
	}

	@Get(':id/followers')
	followers(@Param('id') id: string, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<User>> {
		return this.userService.findFollowers(id, count, cursor);
	}

	@Get(':id/following')
	following(@Param('id') id: string, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<User>> {
		return this.userService.findFollowing(id, count, cursor);
	}

	@Get(':id/likes')
	likes(@Param('id') id: string, @Query('count') count?: number, @Query('cursor') cursor?: string): Promise<CursoredData<Tweet>> {
		return this.userService.findLikes(id, count, cursor);
	}
}
