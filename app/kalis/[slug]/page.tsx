import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';

export default async function Page({ params }: {
  params: {
    slug: string,
  }
}) {
  const post = getPostBySlug('kalis', params.slug, [
    'title',
    'slug',
    'description',
    'date',
    'lastmod',
    'weight',
    'content',
    'fileName',
  ]);
  const content = await markdownToHtml(post.content || '');
  return <>
    <div>{post.title}</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </>;
}
