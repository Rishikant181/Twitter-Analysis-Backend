// PACKAGE
import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { CursoredData } from 'rettiwt-api';

// SERVICES
import { UserService } from './user.service';

// ENTITIES
import { User } from './entities/user.entity';
import { Tweet } from '../tweet/entities/tweet.entity';

// DTOs
import { UserListArgsDto } from './dto/user-list-args.dto';

// FILTERS
import { TwitterErrorFilter } from 'src/filters/twitter-error.filter';

@Controller('user')
@UseFilters(new TwitterErrorFilter())
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(':id')
	find(@Param('id') id: string): Promise<User> {
		return this.userService.find(id);
	}

	@Get(':id/followers')
	followers(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredData<User>> {
		return this.userService.followers(id, args);
	}

	@Get(':id/following')
	following(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredData<User>> {
		return this.userService.following(id, args);
	}

	@Get(':id/likes')
	likes(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredData<Tweet>> {
		return this.userService.likes(id, args);
	}
}
