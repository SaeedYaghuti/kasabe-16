import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';

// const dbConfig = config.get('db');

export const pgTestConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || 'localhost',
  port: 5433,
  // authname: process.env.RDS_USERNAME || 'postgres',
  password: process.env.RDS_PASSWORD || 'rootpass',
  database: process.env.RDS_DB_NAME || 'chat-test',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
  keepConnectionAlive: true,
};
