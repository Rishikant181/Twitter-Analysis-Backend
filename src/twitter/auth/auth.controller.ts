// CONTROLLERS
import { Controller, Post, Body } from '@nestjs/common';

// SERVICES
import { AuthService } from './auth.service';

// DTOs
import { AuthKeyDto } from './dto/auth-key.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body('credentials') credentials: AuthCredentialDto): Promise<AuthKeyDto> {
		return this.authService.login(credentials);
	}
}
