import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { Posts } from 'src/decorators/post.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAnswerDto, @User() commentId: number) {
    return this.answerService.create(dto, commentId);
  }

  @Get()
  findAll(@Query() query: { commentId?: string; postId: string }) {
    return this.answerService.findAll(+query.commentId, +query.postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnswerDto) {
    return this.answerService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
