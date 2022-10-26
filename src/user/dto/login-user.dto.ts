import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Mail: Invalid mail' })
  email: string;
  @Length(6, undefined, { message: 'Password: Minimum characters - 6' })
  password?: string;
}
