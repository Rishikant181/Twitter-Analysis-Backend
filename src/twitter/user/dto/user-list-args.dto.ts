// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min } from 'class-validator';
import { IListArgs } from 'rettiwt-api';

export class UserListArgsDto {
	/** The number of data items to fetch.
	 *
	 * @defaultValue 40
	 * @remarks Must be >= 40
	 */
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@Min(40)
	count?: number = 40;

	/** The cursor to the batch of data to fetch. */
	@IsString()
	@IsOptional()
	cursor?: string = '';
}
