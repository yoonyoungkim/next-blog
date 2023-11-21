import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';
import { PAGE_DATA_LIST } from '@/app/constants/constants';

export default async function Page({ params }: {
  params: {
    slug: string,
  }
}) {
  const post = getPostBySlug('hr', params.slug, PAGE_DATA_LIST);
  const content = await markdownToHtml(post.content || '');

  return (
    <div style={{ display: 'flex-columns', overflow: 'auto' }}>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
