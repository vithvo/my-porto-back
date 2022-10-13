import { SearchUserDto } from './dto/search-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.usersRepository.save(dto);
  }

  async findAll() {
    const arr = await this.usersRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.comments', 'comments')
      .loadRelationCountAndMap('u.commentsCount', 'u.comments', 'comments')
      .getMany();
    return arr.map((obj) => {
      delete obj.comments;
      return obj;
    });
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  findByCond(cond: LoginUserDto) {
    return this.usersRepository.findOneBy(cond);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(+id, updateUserDto);
  }

  async search(dto: SearchUserDto) {
    const qb = this.usersRepository.createQueryBuilder('u');

    qb.limit(dto.limit);
    qb.take(dto.take);

    if (dto.fullName) {
      qb.andWhere(`u.fullName ILIKE :fullName`);
    }
    if (dto.email) {
      qb.andWhere(`u.email ILIKE :email`);
    }
    if (dto.createdAt) {
      qb.andWhere(`u.createdAt ILIKE :createdAt`);
    }

    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
      createdAt: `%${dto.createdAt}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }
}
