import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  commentId: number;
	
  @IsNotEmpty()
  postId: number;
}
