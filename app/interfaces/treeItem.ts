export type TreeItemType = {
  id: string;
  slug: string;
  isOpen: boolean
  title: string;
  parentId: string;
  children: TreeItemType[];
}
