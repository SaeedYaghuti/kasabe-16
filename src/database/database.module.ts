import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmConfig } from './database-ormconfig.constant';
import { DatabaseService } from './database.service';
import { TestUtils } from '../test/test.utils';

@Module({
  imports: [
    // TypeOrmModule.forRoot(getOrmConfig()),
    TypeOrmModule.forRoot(getOrmConfig()),
    // TypeOrmModule.forFeature([Client]),
  ],
  providers: [
    DatabaseService,
    TestUtils,
  ],
  exports: [
    DatabaseService,
    TestUtils,
  ]
})
export class DatabaseModule { }
