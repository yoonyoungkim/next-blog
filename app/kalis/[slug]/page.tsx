import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';
import { KALIS_SEGMENT, PAGE_DATA_LIST } from '@/app/constants/constants';

export function generateStaticParams() {
  return [{ slug: 'example1' }];
}

export default async function Page({ params }: {
  params: {
    slug: string,
  }
}) {
  const post = getPostBySlug(KALIS_SEGMENT, params.slug, [
    ...PAGE_DATA_LIST,
  ]);
  const content = await markdownToHtml(post.content || '');

  return (
    <div style={{ display: 'flex-columns' }}>
      <div>Title: {post.title}</div>
      <div>Author: {post.author}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
