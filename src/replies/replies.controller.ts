import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { CreateReplyPipe } from './dto/create-reply.pipe';
import { RepliesService } from './replies.service';

@Controller('posts/:id/replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  addReply(
    @Param('id', ParseIntPipe) postId: number,
    @Body(CreateReplyPipe) createReplyDto: CreateReplyDto,
  ) {
    return this.repliesService.addReply(postId, createReplyDto.message);
  }

  @Get()
  getReplies(@Param('id', ParseIntPipe) postId: number) {
    return this.repliesService.getReplies(postId);
  }
}
