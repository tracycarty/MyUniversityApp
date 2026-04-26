import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction, ReactionType } from './reaction.entity';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { PostsService } from '../posts/posts.service';
import { RepliesService } from '../replies/replies.service';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    private postsService: PostsService,
    private repliesService: RepliesService,
  ) {}

  async createOrUpdate(userId: number, createReactionDto: CreateReactionDto): Promise<Reaction> {
    const { type, postId, replyId } = createReactionDto;

    // Validate that the post or reply exists
    if (postId) {
      await this.postsService.findOne(postId);
    } else if (replyId) {
      await this.repliesService.findOne(replyId);
    }

    // Build where clause dynamically
    const whereClause: any = { userId };
    if (postId) {
      whereClause.postId = postId;
    }
    if (replyId) {
      whereClause.replyId = replyId;
    }

    // Find existing reaction
    const existingReaction = await this.reactionRepository.findOne({
      where: whereClause,
    });

    if (existingReaction) {
      // Update existing reaction
      existingReaction.type = type;
      return this.reactionRepository.save(existingReaction);
    }

    // Create new reaction
    const reaction = this.reactionRepository.create({
      userId,
      type,
      postId,
      replyId,
    });

    return this.reactionRepository.save(reaction);
  }

  async removeReaction(userId: number, reactionId: number): Promise<void> {
    const reaction = await this.reactionRepository.findOne({
      where: { id: reactionId },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    // Verify the reaction belongs to the user
    if (reaction.userId !== userId) {
      throw new BadRequestException('You can only remove your own reactions');
    }

    await this.reactionRepository.remove(reaction);
  }

  async getReactionsByPost(postId: number): Promise<{ type: ReactionType; count: number }[]> {
    const reactions = await this.reactionRepository.find({
      where: { postId },
    });

    return this.aggregateReactions(reactions);
  }

  async getReactionsByReply(replyId: number): Promise<{ type: ReactionType; count: number }[]> {
    const reactions = await this.reactionRepository.find({
      where: { replyId },
    });

    return this.aggregateReactions(reactions);
  }

  async getUserReactionOnPost(userId: number, postId: number): Promise<Reaction | null> {
    return this.reactionRepository.findOne({
      where: { userId, postId },
    });
  }

  async getUserReactionOnReply(userId: number, replyId: number): Promise<Reaction | null> {
    return this.reactionRepository.findOne({
      where: { userId, replyId },
    });
  }

  private aggregateReactions(reactions: Reaction[]): { type: ReactionType; count: number }[] {
    const aggregated = {};

    reactions.forEach(reaction => {
      if (!aggregated[reaction.type]) {
        aggregated[reaction.type] = 0;
      }
      aggregated[reaction.type]++;
    });

    return Object.entries(aggregated).map(([type, count]) => ({
      type: type as ReactionType,
      count: count as number,
    }));
  }
}
