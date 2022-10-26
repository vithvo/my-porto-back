import { Length } from 'class-validator';
import { UserEntity } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerEntity } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private repository: Repository<AnswerEntity>,
  ) {}

  async create(dto: CreateAnswerDto, userId: number) {
    const answer = await this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: userId },
      comment: { id: dto.commentId },

    });
    return this.repository.findOne({
      where: { id: answer.id },
      relations: ['user'],
    });
  }

  async findAll(commentId: number, postId: number) {
    const qb = await this.repository.createQueryBuilder('c');

    if (commentId) {
      qb.where('c.commentId = :commentId', { commentId });
    }
    if (postId) {
      qb.where('c.postId = :postId', { postId });
    }

    const result = await qb
      .leftJoinAndSelect('c.comment', 'comment')
      .leftJoinAndSelect('c.post', 'post')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    return result.map((obj) => {
      return {
        ...obj,
        comment: { id: obj.comment.id },
        post: { id: obj.post.id },
      };
    });
  }

  findOne(id: number): Promise<AnswerEntity> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, dto: UpdateAnswerDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
