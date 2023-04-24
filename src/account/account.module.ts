import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './schema/account.schema';
import { AuthService } from 'src/twitter/auth/auth.service';
import { TwitterService } from 'src/twitter/twitter.service';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('ATLAS_URL'),
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{
				name: Account.name,
				schema: AccountSchema,
			},
		]),
	],
	controllers: [AccountController],
	providers: [AccountService, TwitterService, AuthService],
})
export class AccountModule { }
