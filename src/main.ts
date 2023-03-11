// PACKAGES
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// MODULES
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	await app.listen(3000);
}

bootstrap();