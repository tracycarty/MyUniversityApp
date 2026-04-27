import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Reaction } from '../reactions/reaction.entity';
import { User } from '../user/user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, post => post.replies)
  post: Post;

  @OneToMany(() => Reaction, reaction => reaction.reply)
  reactions: Reaction[];

  @ManyToOne(() => User, user => user.replies)
  user: User;
}