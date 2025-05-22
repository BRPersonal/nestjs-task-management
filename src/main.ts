import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import {TransformInterceptor} from 'src/transform.interceptor';
import { Logger } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger("main");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = configService.get('PORT');
  const secret = configService.get('JWT_SECRET');
  await app.listen(port);
  
  logger.log(`Application running in port ${port}`);
  logger.log(`secret=${secret}`);
}

bootstrap();
