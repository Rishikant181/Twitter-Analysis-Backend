// PACKAGES
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * The credentials of a user.
 */
export class CredentialDto {
	/**
	 * The email id of user.
	 */
	@IsNotEmpty()
	@IsEmail()
	email: string;

	/**
	 * The password for the account.
	 */
	@IsNotEmpty()
	password: string;
}
