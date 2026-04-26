import { ReactionType } from '../reaction.entity';

export class CreateReactionDto {
  type: ReactionType;
  postId?: number;
  replyId?: number;
}
