import { NextResponse } from 'next/server';
import { getPostBySlug, getPostFileTitleListBySegment } from '@/app/lib/api';

type Items = {
  [key: string]: string;
}

async function getCachedPostsBySegment(segment: string) {
  return await require((`../../../../cache/${segment}.js`)).posts;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const segment = searchParams.get('segment') || '';
  const fields: string[] = searchParams.getAll('fields') || [];
  const searchKeyword = searchParams.get('searchKeyword') || '';

  const cachedPostFileTitleList = (await getCachedPostsBySegment(segment));
  const postFileTitleList = getPostFileTitleListBySegment(segment)
    .map((postFileTitle) => getPostBySlug(segment, postFileTitle, fields));

  const posts = process.env.NODE_ENV === 'production' ?
    cachedPostFileTitleList : postFileTitleList;

  const sortedPosts = posts
    .filter((post: Items) => post.title.includes(searchKeyword))
    .sort((post1: Items, post2: Items) => (post1.date > post2.date) ? -1 : 1);
  return NextResponse.json(sortedPosts);
}
