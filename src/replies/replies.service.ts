import { Injectable } from '@nestjs/common';
import { PostsService, SupportReply } from '../posts/posts.service';

@Injectable()
export class RepliesService {
  constructor(private readonly postsService: PostsService) {}

  addReply(postId: number, message: string): SupportReply {
    const post = this.postsService.findPostById(postId);
    const reply = this.postsService.createReply(message);

    post.replies.push(reply);

    return reply;
  }

  getReplies(postId: number): SupportReply[] {
    const post = this.postsService.findPostById(postId);
    return [...post.replies];
  }
}
