import { PostEntity } from './entities/post.entity';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(10);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async findOne(id: number) {
    await this.repository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({
        views: () => `views + 1`,
      })
      .execute();
    return this.repository.findOneByOrFail({ id });
  }

  create(dto: CreatePostDto, userId: number) {
    // const firstParagraph = dto.text.find((obj) => obj.type === 'paragraph')
    //   ?.data.text;
    return this.repository.save({
      title: dto.title,
      text: dto.text,
      user: { id: userId },
    });
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.limit(dto.limit);
    qb.take(dto.take);

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }
    if (dto.text) {
      qb.andWhere(`p.body ILIKE :body`);
    }
    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.text}%`,
      views: dto.views || 'DESC',
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Статья не найдна');
    }

    return this.repository.update(id, {
      title: dto.title,
      text: dto.text,

      user: { id: userId },
    });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Статья не найдна');
    }

    if (find.user.id !== userId) {
      throw new ForbiddenException('Нет доступа к этой статье');
    }

    return this.repository.delete(id);
  }
}
