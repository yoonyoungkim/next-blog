import { getCachedPostsBySegment } from '../../lib/api';
import { PostType } from '@/app/interfaces/posts';


type Items = {
  [key: string]: number;
}

export async function getAllPosts(segment: string) {
  const fields = ['title', 'depth', 'seq'];

  const cachedPostFileTitleList = (await getCachedPostsBySegment(segment));
  // const postFileTitleList = getPostFileTitleListBySegment(segment)
  //   .map((postFileTitle) => getPostBySlug(segment, postFileTitle, fields));

  // const posts = process.env.NODE_ENV === 'production' ?
  //   cachedPostFileTitleList : postFileTitleList;
  const posts = cachedPostFileTitleList;
  return posts
    .sort((post1: Items, post2: Items) => (post1.depth - post2.depth) || post1.seq - post2.seq);
}

export async function getAllStaticParams(segment: string) {
  const posts = await getAllPosts(segment);
  return posts.map((post: PostType) => ({
    slug: post.slug.split('/') || [],
  }));
}
