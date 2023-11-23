import { TreePostType } from '@/app/interfaces/treePost';
import Link from 'next/link';

const TreeItem = ({ tree, handleClickTreeItem }: { tree: TreePostType, handleClickTreeItem: (slug: string) => void }) => {
  return (<>
    {tree.children.length > 0 && tree.isOpen ? (
      <div>
        <Link href={`/${tree.slug}`}>
          <li style={{ color: '#ffffff' }} onClick={() => handleClickTreeItem(tree.slug)}>{tree.title}</li>
        </Link>
        <div style={{ paddingLeft: '20px' }}>
          {tree.children.map(leaf => <TreeItem tree={leaf} key={`${leaf.id}`}
                                               handleClickTreeItem={handleClickTreeItem} />)}
        </div>
      </div>
    ) : (<Link href={`/${tree.slug}`}>
      <li style={{ color: '#ffffff' }} onClick={() => handleClickTreeItem(tree.slug)}>{tree.title}</li>
    </Link>)}
  </>);
};

export default TreeItem;
