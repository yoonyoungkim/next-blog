import { getPostBySlug } from '@/app/lib/api';
import markdownToHtml from '@/app/lib/markdownToHtml';
import { KALIS_SEGMENT, PAGE_DATA_LIST } from '@/app/constants/constants';

export default async function Page({ params }: {
  params: {
    slug: string,
  }
}) {
  const post = getPostBySlug(KALIS_SEGMENT, params.slug, [
    ...PAGE_DATA_LIST,
  ]);
  const content = await markdownToHtml(post.content || '');
  return <>
    <div>---------</div>
    <div>{post.title}</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </>;
}
