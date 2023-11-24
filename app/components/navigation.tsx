'use client';

import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MenuClose from '@/app/public/icon__menu-close-white.svg';
import MenuOpen from '@/app/public/icon__menu-open-white.svg';
import Image from 'next/image';
import Tree from '@/app/components/tree';
import { MenuType } from '@/app/interfaces/menu';
import { menusToTree } from '@/app/components/nativationUtil';

const Navigation = ({ segment }: { segment: string }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const hasSearchKeyword = useMemo(() => searchKeyword?.length > 0, [searchKeyword?.length]);

  const searchedMenus = useMemo(() => menus
    .filter(({ title }) => title?.includes(searchKeyword)), [menus, searchKeyword]);

  const treePosts = useMemo(() => menusToTree(menus), [menus]);

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const handleClickTreeItem = useCallback((slug: string) => {
    const updateMenu = menus.map((menu: MenuType) => {
      if (slug === menu.slug) {
        return {
          ...menu,
          isOpen: !menu.isOpen,
        };
      }
      return menu;
    });
    setMenus(updateMenu);
  }, [menus]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${segment}/posts`);
      const menus = (await response.json())
        .map((menu: MenuType) => ({ ...menu, isOpen: true }));
      setMenus(menus);
    })();
  }, [segment]);

  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column', width: isOpenMenu ? '338px' : '40px', backgroundColor: 'hsl(229, 44%, 18%)' }}>
      {isOpenMenu ? (<div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input type='text' placeholder='Search posts...' value={searchKeyword}
                 onChange={handleChange} />
          <Image src={MenuClose} alt='close button' style={{ cursor: 'pointer' }} width={20} height={20}
                 onClick={handleClick} />
        </div>
        <ul>
          {
            hasSearchKeyword ? (searchedMenus.map((post, index) => (
              <Link key={index} href={`/${segment}/${post.slug}`}>
                <li style={{ color: '#ffffff' }}>{post.title}</li>
              </Link>
            ))) : <Tree tree={treePosts} segment={segment} handleClickTreeItem={handleClickTreeItem} />
          }
        </ul>
      </div>) : (<div style={{ padding: '20px 10px' }}>
        <Image src={MenuOpen} alt='open button' style={{ cursor: 'pointer' }} width={20} height={20}
               onClick={handleClick} />
      </div>)}
    </div>
  );
};

export default Navigation;
