/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error', 'debug']);
}

bootstrap();
