import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { CreateReplyPipe } from './dto/create-reply.pipe';
import { RepliesService } from './replies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';

@Controller('posts/:id/replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addReply(
    @Param('id', ParseIntPipe) postId: number,
    @Body(CreateReplyPipe) createReplyDto: CreateReplyDto,
    @Request() req,
  ) {
    return this.repliesService.create(postId, createReplyDto.message, req.user as User);
  }

  @Get()
  getReplies(@Param('id', ParseIntPipe) postId: number) {
    return this.repliesService.findByPostId(postId);
  }
}
