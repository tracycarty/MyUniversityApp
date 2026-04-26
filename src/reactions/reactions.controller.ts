import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { CreateReactionPipe } from './dto/create-reaction.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReactionType } from './reaction.entity';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrUpdateReaction(
    @Request() req,
    @Body(CreateReactionPipe) createReactionDto: CreateReactionDto,
  ) {
    return this.reactionsService.createOrUpdate(req.user.id, createReactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeReaction(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.reactionsService.removeReaction(req.user.id, parseInt(id));
  }

  @Get('post/:postId')
  async getPostReactions(
    @Param('postId') postId: string,
  ): Promise<{ type: ReactionType; count: number }[]> {
    return this.reactionsService.getReactionsByPost(parseInt(postId));
  }

  @Get('reply/:replyId')
  async getReplyReactions(
    @Param('replyId') replyId: string,
  ): Promise<{ type: ReactionType; count: number }[]> {
    return this.reactionsService.getReactionsByReply(parseInt(replyId));
  }
}
