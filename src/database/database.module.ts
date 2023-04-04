import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      migrations: [],
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
