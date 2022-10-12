import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, undefined, { message: 'Имя и фамилия: Минимум символов - 3' })
  fullName: string;

  @IsEmail(undefined, { message: 'Почта: Неверная почта' })
  email: string;

  @Length(6, undefined, { message: 'Пароль: Минимум символов - 6' })
  password: string;
}
