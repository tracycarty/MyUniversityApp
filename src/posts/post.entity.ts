import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Reply } from '../replies/reply.entity';
import { Reaction } from '../reactions/reaction.entity';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Reply, reply => reply.post)
  replies: Reply[];

  @OneToMany(() => Reaction, reaction => reaction.post)
  reactions: Reaction[];

  @ManyToOne(() => User, user => user.posts)
  user: User;
}