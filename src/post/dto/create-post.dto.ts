import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  id: number;

  @IsString()
  title: string;

  @IsString()
  text: string;
}
