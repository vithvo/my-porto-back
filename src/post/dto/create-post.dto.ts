import { IsArray, IsOptional, IsString } from 'class-validator';

export interface OutputBlockData {
  id: string;

  type: string;

  data: any;
}

export class CreatePostDto {
  id: number;

  @IsString()
  title: string;

  @IsArray()
  body: OutputBlockData[];

  @IsOptional()
  @IsArray()
  tags?: string;
}
