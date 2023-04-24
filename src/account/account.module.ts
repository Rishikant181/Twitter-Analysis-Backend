import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
	imports: [ConfigModule, MongooseModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			uri: configService.get<string>('ATLAS_URL'),
		}),
		inject: [ConfigService]
	})],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule { }
