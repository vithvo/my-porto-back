// enum PostViewsEnum {
//   DESC = 'DESC',
//   ASC = 'ASC',
// }

export class SearchPostDto {
  title?: string;
  text?: string;
  views?: 'DESC' | 'ASC';
  limit?: number = 0;
  take?: number = 10;
}
