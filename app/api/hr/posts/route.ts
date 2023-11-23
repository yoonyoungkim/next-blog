import { HR_SEGMENT } from '@/app/constants/constants';
import { getAllPosts } from '@/app/lib/utils';

export async function GET() {
  const posts = await getAllPosts(HR_SEGMENT);
  return Response.json(posts);
}
