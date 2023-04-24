// PACKAGES
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAuthCookie } from 'rettiwt-api';

export type AccountDocument = HydratedDocument<Account>;

/**
 * The account details of a single user
 */
@Schema()
export class Account implements IAuthCookie {
	/**
	 * The email id of user.
	 */
	@Prop()
	email: string;

	/**
	 * The password for the account.
	 */
	@Prop()
	password: string;

	/**
	 * Token used to authenticate a device.
	 */
	@Prop()
	kdt: string;

	/**
	 *  Token used to authenticate a user using a Twitter ID.
	 */
	@Prop()
	twid: string;

	/**
	 *  The CSRF token of the session.
	 */
	@Prop()
	ct0: string;

	/**
	 *  The authentication token used while logging in to the account.
	 */
	@Prop()
	// eslint-disable-next-line @typescript-eslint/naming-convention
	auth_token: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AccountSchema = SchemaFactory.createForClass(Account);
