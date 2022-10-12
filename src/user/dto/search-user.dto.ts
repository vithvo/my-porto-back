export class SearchUserDto {
  email?: string;
  fullName?: string;
  limit?: number = 0;
  take?: number = 10;
  createdAt?: string;
}
