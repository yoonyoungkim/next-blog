import { TreeItemType } from '@/app/interfaces/treeItem';
import Link from 'next/link';

const MenuButton = ({ tree, segment, handleClickTreeItem }: {
  tree: TreeItemType,
  segment: string,
  handleClickTreeItem: (slug: string) => void
}) => (<Link href={`/${segment}/${tree.slug}`}>
  <li style={{ color: '#ffffff' }} onClick={() => handleClickTreeItem(tree.slug)}>{tree.title}</li>
</Link>);

const TreeItem = ({ tree, segment, handleClickTreeItem }: {
  tree: TreeItemType,
  segment: string,
  handleClickTreeItem: (slug: string) => void
}) => {
  return (<>
    {tree.children.length > 0 && tree.isOpen ? (
      <div>
        <MenuButton tree={tree} segment={segment} handleClickTreeItem={handleClickTreeItem} />
        <div style={{ paddingLeft: '20px' }}>
          {tree.children.map(leaf => <TreeItem tree={leaf} segment={segment} key={`${leaf.id}`}
                                               handleClickTreeItem={handleClickTreeItem} />)}
        </div>
      </div>
    ) : (<MenuButton tree={tree} segment={segment} handleClickTreeItem={handleClickTreeItem} />)}
  </>);
};

export default TreeItem;
