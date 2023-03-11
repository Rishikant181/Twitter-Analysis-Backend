// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min } from 'class-validator';

export class UserListArgsDto {
    /** The number of data items to fetch. */
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