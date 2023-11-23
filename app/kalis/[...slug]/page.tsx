import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';
import { KALIS_SEGMENT, PAGE_DATA_LIST } from '@/app/constants/constants';
import { getAllStaticParams } from '@/app/lib/utils';

export async function generateStaticParams() {
  return await getAllStaticParams(KALIS_SEGMENT);
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const post = getPostBySlug(KALIS_SEGMENT, params.slug.join('/'), PAGE_DATA_LIST);
  const content = await markdownToHtml(post.content || '');

  return (
    <div style={{ display: 'flex-columns' }}>
      <div>Title: {post.title}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
