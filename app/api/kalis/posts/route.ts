import { KALIS_SEGMENT } from '@/app/constants/constants';
import { getAllPosts } from '@/app/lib/utils';

export async function GET() {
  const posts = await getAllPosts(KALIS_SEGMENT);
  return Response.json(posts);
}
