import { Injectable, PipeTransform } from '@nestjs/common';
import { validateAnonymousMessage } from '../../common/validation/message-validation.util';
import { CreateReplyDto } from './create-reply.dto';

@Injectable()
export class CreateReplyPipe implements PipeTransform {
  transform(value: unknown): CreateReplyDto {
    return {
      message: validateAnonymousMessage(value),
    };
  }
}
