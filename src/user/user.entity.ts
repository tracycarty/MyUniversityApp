import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Reply } from '../replies/reply.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userId: string; // The anonymous User ID like User_1023

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Reply, reply => reply.user)
  replies: Reply[];
}