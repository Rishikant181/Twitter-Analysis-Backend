// PACKAGES
import { IsAlpha, IsAlphanumeric, IsEmail, IsString } from 'class-validator'

/**
 * The credentials used to login to an account.
 */
export class AuthCredentialDto {
    /** The email associated with the Twitter account. */
    @IsString()
    @IsEmail()
    email: string;

    /** The username of the Twitter account's user. */
    @IsAlphanumeric()
    userName: string;

    /** The password to the Twitter account. */
    @IsString()
    password: string;
}