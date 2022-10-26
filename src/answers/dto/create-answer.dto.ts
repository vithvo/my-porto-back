import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  commentId: number;

  @IsNotEmpty()
  postId: number;

  @IsOptional()
  answersLength: object;
}
