import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`running in port ${process.env.PORT}`);
  console.log('secret=',process.env.JWT_SECRET);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
