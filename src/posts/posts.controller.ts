import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostPipe } from './dto/create-post.pipe';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body(CreatePostPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto.message);
  }

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }
}
