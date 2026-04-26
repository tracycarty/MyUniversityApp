import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(postId: number, message: string): Promise<Reply> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const reply = this.replyRepository.create({ message, post });
    return this.replyRepository.save(reply);
  }

  async findByPostId(postId: number): Promise<Reply[]> {
    return this.replyRepository.find({
      where: { post: { id: postId } },
      order: { createdAt: 'ASC' },
    });
  }
}
