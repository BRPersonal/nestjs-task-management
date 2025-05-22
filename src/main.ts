import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import {TransformInterceptor} from 'src/transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("main");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(`Application running in port ${port}`);
  logger.log(`secret=${process.env.JWT_SECRET}`);
}

bootstrap();
