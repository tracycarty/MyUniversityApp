import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { RepliesModule } from './replies/replies.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReactionsModule } from './reactions/reactions.module';
import { User } from './user/user.entity';
import { Post } from './posts/post.entity';
import { Reply } from './replies/reply.entity';
import { Reaction } from './reactions/reaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'emotional_support',
      entities: [User, Post, Reply, Reaction],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    AuthModule,
    UserModule,
    PostsModule,
    RepliesModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
