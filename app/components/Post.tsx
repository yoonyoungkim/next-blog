import { PostType } from '@/app/interfaces/posts';

const Post = ({ post }: { post: PostType }) => {
  return (<>
    <div>{post.title}</div>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </>);
};

export default Post;
