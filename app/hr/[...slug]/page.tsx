import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';
import { HR_SEGMENT, PAGE_DATA_LIST } from '@/app/constants/constants';
import { getAllStaticParams } from '@/app/api/utils/utils';

export async function generateStaticParams() {
  return await getAllStaticParams(HR_SEGMENT);
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const post = getPostBySlug('hr', params.slug.join('/'), PAGE_DATA_LIST);
  const content = await markdownToHtml(post.content || '');

  return (
    <div style={{ display: 'flex-columns', overflow: 'auto' }}>
      <div>{post.title}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
