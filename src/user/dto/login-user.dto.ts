import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Почта: Неверная почта' })
  email: string;
  @Length(6, undefined, { message: 'Пароль: Минимум символов - 6' })
  password?: string;
}
