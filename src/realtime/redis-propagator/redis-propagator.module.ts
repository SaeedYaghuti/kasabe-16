import { Module, forwardRef } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';

import { RedisPropagatorService } from './redis-propagator.service';
import { ChatService } from '../../chat/chat.service';
import { ChatModule } from '../../chat/chat.module';

@Module({
  imports: [
    RedisModule,
  ],
  providers: [RedisPropagatorService],
  exports: [RedisPropagatorService],
})
export class RedisPropagatorModule {}
