// PACKAGES
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAuthCookie } from 'rettiwt-api';

export type AccountDocument = HydratedDocument<Account>

/**
 * The account details of a single user
 */
@Schema()
export class Account implements IAuthCookie {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    kdt: string;

    @Prop()
    twid: string;

    @Prop()
    ct0: string;

    @Prop()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    auth_token: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AccountSchema = SchemaFactory.createForClass(Account);