// PACKAGES
import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

/**
 * The credentials used to login to an account.
 */
export class AuthCredentialDto {
	/** The email associated with the Twitter account. */
	@IsString()
	@IsEmail()
	@MinLength(1)
	email: string;

	/** The username of the Twitter account's user. */
	@IsAlphanumeric()
	@MinLength(1)
	userName: string;

	/** The password to the Twitter account. */
	@IsString()
	@MinLength(1)
	password: string;
}
