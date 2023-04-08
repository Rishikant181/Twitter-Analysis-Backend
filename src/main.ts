// PACKAGES
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as CookieParser from 'cookie-parser';

// MODULES
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	// Initializing new NestJS app
	const app = await NestFactory.create(AppModule);

	// Adding global pipes
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	// Adding middlewares
	app.use(CookieParser());

	// Listening for HTTP requests
	await app.listen(3000);
}

void bootstrap();
