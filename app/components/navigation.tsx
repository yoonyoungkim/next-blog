'use client';

import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { PostType } from '@/app/interfaces/post';
import MenuClose from '@/app/public/icon__menu-close-white.svg';
import MenuOpen from '@/app/public/icon__menu-open-white.svg';
import Image from 'next/image';
import { TreePostType } from '@/app/interfaces/treePost';
import Tree from '@/app/components/tree';

const arrayToTree: any = (arr: TreePostType[], parentId = '') =>
  arr.filter(item => item.parentId === parentId)
    .map(child => ({ ...child, children: arrayToTree(arr, child.id) }));

interface PostTypeWithIsOpen extends PostType {
  isOpen: boolean;
}


const Navigation = ({ segment }: { segment: string }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [posts, setPosts] = useState<PostTypeWithIsOpen[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const hasSearchKeyword = useMemo(() => searchKeyword?.length > 0, [searchKeyword?.length]);
  const filteredPosts = useMemo(() => posts
    .filter(({ title }) => !title ? true : title.includes(searchKeyword)), [posts, searchKeyword]);
  const treePosts = useMemo(() => {
    const postsWithId = posts.map(post => {
      const slugArray = post.slug.split('/').filter(slug => slug !== 'index');
      return {
        id: slugArray.join('_'),
        parentId: slugArray.slice(0, slugArray.length - 1).join('_'),
        slug: `${segment}/${post.slug}`,
        title: post.title,
        isOpen: post.isOpen,
      };
    });
    return arrayToTree(postsWithId);
  }, [posts]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${segment}/posts`);
      const posts = (await response.json())
        .map((post: PostTypeWithIsOpen) => ({ ...post, isOpen: true }));
      setPosts(posts);
    })();
  }, [segment]);

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const handleClickTreeItem = useCallback((slug: string) => {
    setPosts(posts.map((post: PostTypeWithIsOpen) => {
      if (slug === `${segment}/${post.slug}`) {
        return {
          ...post,
          isOpen: !post.isOpen,
        };
      }
      return post;
    }));
  }, [posts]);

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
            hasSearchKeyword ? (filteredPosts.map((post, index) => (
              <Link key={index} href={`/${segment}/${post.slug}`}>
                <li style={{ color: '#ffffff' }}>{post.title}</li>
              </Link>
            ))) : <Tree tree={treePosts} handleClickTreeItem={handleClickTreeItem} />
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
