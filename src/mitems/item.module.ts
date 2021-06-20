import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemResolver } from './item.resolver';
import { ItemRepository } from './item.repository';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [ 
    DatabaseModule, 
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }), 
  ],
  providers: [ItemRepository, ItemService, ItemResolver],
  // providers: [ItemResolver], // Nest can't resolve dependencies of the ItemResolver (?) ItemService

  // providers: [ItemRepository, ItemService] // GraphQLError {
  //   message: 'Type Query must define one or more fields.'
  // }

})
export class ItemModule {}
