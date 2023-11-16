import { Author } from '@/app/interfaces/author';

export type PostType = {
  title: string;
  date: string;
  author: Author;
  content: string;
  slug: string;
}
