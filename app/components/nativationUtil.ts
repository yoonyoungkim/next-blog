import { TreeItemType } from '../interfaces/treeItem';
import { MenuType } from '@/app/interfaces/menu';

const arrayToTree: any = (array: TreeItemType[], parentId = '') =>
  array.filter(item => item.parentId === parentId)
    .map(child => ({ ...child, children: arrayToTree(array, child.id) }));

export const menusToTree = (menus: MenuType[]) => {
  const array = menus.map(menu => {
    const slugArray = menu.slug.split('/').filter(slug => slug !== 'index');
    return {
      id: slugArray.join('_'),
      parentId: slugArray.slice(0, slugArray.length - 1).join('_'),
      slug: menu.slug,
      title: menu.title,
      isOpen: menu.isOpen,
    };
  });
  return arrayToTree(array);
};
