'use client';

import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { PostType } from '@/app/interfaces/posts';
import MenuClose from '@/app/public/icon__menu-close-white.svg';
import MenuOpen from '@/app/public/icon__menu-open-white.svg';
import Image from 'next/image';


const Navigation = ({ segment }: { segment: string }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredPosts = useMemo(() => posts
    .filter(({ title }) => !title ? true : title.includes(searchKeyword)), [posts, searchKeyword]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${segment}/posts`);
      const posts = await response.json();
      setPosts(posts);
    })();
  }, [segment]);

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

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
            filteredPosts.map((post, index) => (
              <Link key={index} href={`/${segment}/${post.slug}`}>
                <li style={{ color: '#ffffff' }}>{post.title}</li>
              </Link>
            ))
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
