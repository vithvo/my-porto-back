import { UserEntity } from './../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const comment = await this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: userId },
    });
    return this.repository.findOne({
      where: { id: comment.id },
      relations: ['user'],
    });
  }

  async findAll(postId: number) {
    const qb = await this.repository.createQueryBuilder('c');

    if (postId) {
      qb.where('c.postId = :postId', { postId });
    }

    const result = await qb
      .leftJoinAndSelect('c.post', 'post')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    return result.map((obj) => {
      return {
        ...obj,
        post: { id: obj.post.id, title: obj.post.title },
      };
    });
  }

  findOne(id: number): Promise<CommentEntity> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, dto: UpdateCommentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

}
