// PACKAGES
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService {
	constructor(@Inject(ConfigService) private configService: ConfigService) {}
}
