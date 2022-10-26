import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, undefined, {
    message: 'First and last name: Minimum characters - 3',
  })
  fullName: string;

  @IsEmail(undefined, { message: 'Mail: Invalid mail' })
  email: string;

  @Length(6, undefined, { message: 'Password: Minimum characters - 6' })
  password: string;
}
export class GitHubUserCodeDTO {
  code: string;
}
