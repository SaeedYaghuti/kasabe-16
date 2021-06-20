import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

@Module({
  // imports: [// TypeOrmModule.forFeature(postgresqlConfig), // connect to database]
  providers: [ItemsService, ItemsResolver]
})
export class ItemsModule {}
