import { AnswerEntity } from './../../answers/entities/answer.entity';
import { PostEntity } from './../../post/entities/post.entity';
import { UserEntity } from './../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  answersLength: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  user: UserEntity;

  @JoinColumn({ name: 'postId' })
  @ManyToOne(() => PostEntity, { nullable: false, onDelete: 'CASCADE' })
  post: PostEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
