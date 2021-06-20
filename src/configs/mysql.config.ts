import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';

// const dbConfig = config.get('db');

export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username:  'root',
  // password:  'root',
  database:  'chat',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  // synchronize: process.env.TYPEORM_SYNC || true,
  synchronize: true,
};
