import { Injectable, PipeTransform } from '@nestjs/common';
import { validateAnonymousMessage } from '../../common/validation/message-validation.util';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class CreatePostPipe implements PipeTransform {
  transform(value: unknown): CreatePostDto {
    return {
      message: validateAnonymousMessage(value),
    };
  }
}
