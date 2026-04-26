import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateReactionDto } from './create-reaction.dto';
import { ReactionType } from '../reaction.entity';

@Injectable()
export class CreateReactionPipe implements PipeTransform {
  transform(value: any): CreateReactionDto {
    if (!value) {
      throw new BadRequestException('Reaction data is required');
    }

    const { type, postId, replyId } = value;

    // Validate reaction type
    if (!type || !Object.values(ReactionType).includes(type)) {
      throw new BadRequestException(
        `Invalid reaction type. Must be one of: ${Object.values(ReactionType).join(', ')}`,
      );
    }

    // Validate that either postId or replyId is provided, but not both
    if ((!postId && !replyId) || (postId && replyId)) {
      throw new BadRequestException(
        'Exactly one of postId or replyId must be provided',
      );
    }

    // Validate IDs are positive numbers
    if (postId && (typeof postId !== 'number' || postId <= 0)) {
      throw new BadRequestException('postId must be a positive number');
    }

    if (replyId && (typeof replyId !== 'number' || replyId <= 0)) {
      throw new BadRequestException('replyId must be a positive number');
    }

    return {
      type,
      postId,
      replyId,
    };
  }
}
