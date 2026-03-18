import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

@Module({
  imports: [PostsModule],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule {}
