import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Unique } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Reply } from '../replies/reply.entity';

export enum ReactionType {
  HEART = 'heart',
  CARE = 'care',
}

@Entity()
@Unique(['userId', 'post', 'replyId'])
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  type: ReactionType;

  @Column()
  userId: number;

  @ManyToOne(() => Post, post => post.reactions, { nullable: true, onDelete: 'CASCADE' })
  post: Post;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Reply, reply => reply.reactions, { nullable: true, onDelete: 'CASCADE' })
  reply: Reply;

  @Column({ nullable: true })
  replyId: number;

  @CreateDateColumn()
  createdAt: Date;
}
