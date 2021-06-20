import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';

// const dbConfig = config.get('db');

export const postgresqlConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || 'localhost',
  // port: process.env.RDS_PORT || 5433,
  port: 5433,
  // authname: process.env.RDS_USERNAME || 'postgres',
  password: process.env.RDS_PASSWORD || 'rootpass',
  database: process.env.RDS_DB_NAME || 'chat',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  // synchronize: process.env.TYPEORM_SYNC || true,
  synchronize: true,
  keepConnectionAlive: true,
};
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   host: dbConfig.host,33
 'u'
//   port: 5432,
//   authname: 'postgres',
//   password: 'rootpass',
//   database: 'taskmanagement',
//   entities: [__dirname + '/../**/*.entity.{js, ts}'],
//   synchronize: true,
// };
