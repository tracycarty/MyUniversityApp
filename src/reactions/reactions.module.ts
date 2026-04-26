import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './reaction.entity';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { PostsModule } from '../posts/posts.module';
import { RepliesModule } from '../replies/replies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction]),
    PostsModule,
    RepliesModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
  exports: [ReactionsService],
})
export class ReactionsModule {}
