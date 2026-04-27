import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { Post } from '../posts/post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(postId: number, message: string, user: User): Promise<Reply> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const reply = this.replyRepository.create({ message, post, user });
    return this.replyRepository.save(reply);
  }

  async findByPostId(postId: number): Promise<Reply[]> {
    return this.replyRepository.find({
      where: { post: { id: postId } },
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Reply> {
    const reply = await this.replyRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!reply) {
      throw new Error(`Reply with id ${id} not found`);
    }
    return reply;
  }
}

