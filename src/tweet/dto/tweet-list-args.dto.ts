// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min } from 'class-validator';

export class TweetListArgsDto {
    /** The number of data items to fetch.
     * 
     * @defaultValue 10
     * @remarks Must be >= 10
     */
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(10)
    count?: number = 10;

    /** The cursor to the batch of data to fetch. */
    @IsString()
    @IsOptional()
    cursor?: string = '';
}