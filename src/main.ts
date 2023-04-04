import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestAppLogger } from './logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = app.get(NestAppLogger);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useLogger(logger);

  // Let's clean up when the app is terminating
  app.enableShutdownHooks();

  await app.listen(port);

  process.on('uncaughtException', (err) => {
    logger.error(err, 'uncaughtException');
  });

  process.on('unhandledRejection', (err) => {
    logger.error(err, 'unhandledRejection');
  });
}

bootstrap();
