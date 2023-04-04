/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const migrationsDir = resolve(__dirname, 'migrations');

const migrations = [`${migrationsDir}/*{.ts,.js}`];

if (
  process.env.NODE_ENV !== 'production'
  || process.env.DATABASE_TEST_MIGRATIONS
) {
  migrations.push(`${migrationsDir}/test/*{.ts,.js}`);
}

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  database: process.env.DATABASE_DB ?? 'event-booking-app',
  synchronize: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  migrations,
};
export const connectionSource = new DataSource(config);
