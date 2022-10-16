import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
