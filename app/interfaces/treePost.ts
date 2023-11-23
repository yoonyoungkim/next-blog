import { PostType } from '@/app/interfaces/post';

export type TreePostType = {
  post: PostType;
  id: string;
  slug: string;
  isOpen: boolean
  title: string;
  parentId: string;
  children: TreePostType[];
}
