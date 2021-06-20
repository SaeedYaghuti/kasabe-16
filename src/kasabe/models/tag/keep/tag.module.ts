import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TagResolver } from '../tag.resolver';
import { TagService } from '../tag.service';
import { DatabaseModule } from '../../../../database/database.module';
import { TagRepository } from '../tag.repository';

@Module({
    imports: [
        DatabaseModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql'
        }),
    ],
    providers: [TagRepository, TagService, TagResolver]
})
export class TagModule {}