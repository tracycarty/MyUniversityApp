import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostPipe } from './dto/create-post.pipe';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body(CreatePostPipe) createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto.message, req.user as User);
  }

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }
}
