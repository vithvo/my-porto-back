// enum PostViewsEnum {
//   DESC = 'DESC',
//   ASC = 'ASC',
// }

export class SearchPostDto {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  tag?: string;
  limit?: number = 0;
  take?: number = 10;
}
