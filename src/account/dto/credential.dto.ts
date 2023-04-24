// PACKAGES
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * The credentials of a user.
 */
export class CredentialDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}
