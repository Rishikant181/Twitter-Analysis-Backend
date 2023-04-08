// CONTROLLERS
import { Controller, Post, Body } from '@nestjs/common';

// SERVICES
import { AuthService } from './auth.service';

// DTOs
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body('credentials') credentials: AuthCredentialDto) {
		return this.authService.login(credentials);
	}
}
