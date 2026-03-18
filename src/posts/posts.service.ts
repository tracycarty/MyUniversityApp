import { Injectable, NotFoundException } from '@nestjs/common';

export interface SupportReply {
  id: number;
  message: string;
  createdAt: string;
}

export interface SupportPost {
  id: number;
  message: string;
  createdAt: string;
  replies: SupportReply[];
}

@Injectable()
export class PostsService {
  private readonly posts: SupportPost[] = [];
  private nextPostId = 1;
  private nextReplyId = 1;

  create(message: string): Omit<SupportPost, 'replies'> {
    const post: SupportPost = {
      id: this.nextPostId++,
      message,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    this.posts.unshift(post);

    return this.toPostResponse(post);
  }

  findAll(): Array<Omit<SupportPost, 'replies'>> {
    return this.posts.map((post) => this.toPostResponse(post));
  }

  findPostById(id: number): SupportPost {
    const post = this.posts.find((entry) => entry.id === id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} was not found.`);
    }

    return post;
  }

  createReply(message: string): SupportReply {
    return {
      id: this.nextReplyId++,
      message,
      createdAt: new Date().toISOString(),
    };
  }

  private toPostResponse(post: SupportPost): Omit<SupportPost, 'replies'> {
    return {
      id: post.id,
      message: post.message,
      createdAt: post.createdAt,
    };
  }
}
