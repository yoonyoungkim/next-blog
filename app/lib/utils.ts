import { PostType } from '@/app/interfaces/posts';


type Items = {
  [key: string]: number;
}

export async function getAllPosts(segment: string) {
  const posts = (await require((`../../cache/${segment}.js`)).posts);
  return posts
    .sort((post1: Items, post2: Items) => (post1.depth - post2.depth) || post1.seq - post2.seq);
}

export async function getAllStaticParams(segment: string) {
  const posts = await getAllPosts(segment);
  return posts.map((post: PostType) => ({
    slug: post.slug.split('/') || [],
  }));
}
