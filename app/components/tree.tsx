import { TreePostType } from '@/app/interfaces/treePost';
import TreeItem from '@/app/components/treeItem';

const Tree = ({ tree, handleClickTreeItem }: { tree: TreePostType[], handleClickTreeItem: (slug: string) => void }) => {
  return (<>
    {tree?.map((post) => (<TreeItem key={post.id} tree={post} handleClickTreeItem={handleClickTreeItem} />))}
  </>);
};

export default Tree;
