import { TreeItemType } from '@/app/interfaces/treeItem';
import TreeItem from '@/app/components/treeItem';

const Tree = ({ tree, segment, handleClickTreeItem }: {
  tree: TreeItemType[],
  segment: string,
  handleClickTreeItem: (slug: string) => void
}) => {
  return (<>
    {tree?.map((post) => (
      <TreeItem key={post.id} segment={segment} tree={post} handleClickTreeItem={handleClickTreeItem} />))}
  </>);
};

export default Tree;
