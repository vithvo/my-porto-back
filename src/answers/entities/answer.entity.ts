import { PostEntity } from './../../post/entities/post.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('answers')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @JoinColumn({ name: 'commentId' })
  @ManyToOne(() => CommentEntity, { nullable: false, onDelete: 'CASCADE' })
  comment: CommentEntity;

  @JoinColumn({ name: 'postId' })
  @ManyToOne(() => PostEntity, { nullable: false, onDelete: 'CASCADE' })
  post: PostEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
