import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;
	
  @Column()
  password: string;
	
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
	
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
	
		// @OneToMany(() => CommentEntity, (comment) => comment.user, {
		//   eager: false,
		//   nullable: true,
		// })
		// comments: CommentEntity[];
}
