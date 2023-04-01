// PACKAGE
import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';

// SERVICES
import { UserService } from './user.service';

// DTOs
import { UserListArgsDto } from './dto/user-list-args.dto';
import { UserDto } from './dto/user.dto';
import { CursoredDataDto } from '../dto/cursored-list.dto';
import { TweetDto } from 'src/twitter/tweet/dto/tweet.dto';

// FILTERS
import { TwitterErrorFilter } from '../twitter.filter';

@Controller('user')
@UseFilters(new TwitterErrorFilter())
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(':id')
	find(@Param('id') id: string): Promise<UserDto> {
		return this.userService.find(id);
	}

	@Get(':id/followers')
	followers(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredDataDto<UserDto>> {
		return this.userService.followers(id, args);
	}

	@Get(':id/following')
	following(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredDataDto<UserDto>> {
		return this.userService.following(id, args);
	}

	@Get(':id/likes')
	likes(@Param('id') id: string, @Query() args: UserListArgsDto): Promise<CursoredDataDto<TweetDto>> {
		return this.userService.likes(id, args);
	}
}
