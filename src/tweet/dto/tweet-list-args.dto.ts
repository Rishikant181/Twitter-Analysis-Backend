// PACKAGES
import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class TweetListArgsDto {
    /** The number of data items to fetch. */
    @IsNumber()
    @IsOptional()
    @Min(10)
    count?: number = 10;

    /** The cursor to the batch of data to fetch. */
    @IsString()
    @IsOptional()
    cursor?: string = '';
}