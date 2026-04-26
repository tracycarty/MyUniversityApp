import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Reply } from '../replies/reply.entity';
import { Reaction } from '../reactions/reaction.entity';

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
}