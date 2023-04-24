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
	@Prop({
		type: String,
		required: true,
	})
	email: string;

	/**
	 * The password for the account.
	 */
	@Prop({
		type: String,
		required: true,
	})
	password: string;

	/**
	 * Token used to authenticate a device.
	 */
	@Prop({
		type: String,
		required: true,
	})
	kdt: string;

	/**
	 *  Token used to authenticate a user using a Twitter ID.
	 */
	@Prop({
		type: String,
		required: true,
	})
	twid: string;

	/**
	 *  The CSRF token of the session.
	 */
	@Prop({
		type: String,
		required: true,
	})
	ct0: string;

	/**
	 *  The authentication token used while logging in to the account.
	 */
	@Prop({
		type: String,
		required: true,
	})
	// eslint-disable-next-line @typescript-eslint/naming-convention
	auth_token: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AccountSchema = SchemaFactory.createForClass(Account);
