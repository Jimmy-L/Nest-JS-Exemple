import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './reservation/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService: LoggerService = app.get('LoggerService');

  await app.listen(3000);
}
bootstrap();
