import { getCachedPostsBySegment, getPostBySlug, getPostFileTitleListBySegment } from '../../lib/api';


type Items = {
  [key: string]: string;
}

export async function getAllPosts(segment: string) {
  const fields = ['title', 'date'];

  const cachedPostFileTitleList = (await getCachedPostsBySegment(segment));
  const postFileTitleList = getPostFileTitleListBySegment(segment)
    .map((postFileTitle) => getPostBySlug(segment, postFileTitle, fields));

  const posts = process.env.NODE_ENV === 'production' ?
    cachedPostFileTitleList : postFileTitleList;

  return posts
    .sort((post1: Items, post2: Items) => (post1.date > post2.date) ? -1 : 1);
}
