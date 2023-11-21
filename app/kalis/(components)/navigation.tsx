'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { PostType } from '@/app/interfaces/posts';
import MenuClose from '@/app/public/icon__menu-close-white.svg';
import MenuOpen from '@/app/public/icon__menu-open-white.svg';
import Image from 'next/image';


const Navigation = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/posts?segment=kalis&fields=title&fields=date');
      const posts = await response.json();
      setPosts(posts);
    })();
  }, []);

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    const response = await fetch(`/api/posts/search?segment=kalis&fields=title&fields=date&searchKeyword=${event.target.value}`);
    const posts = await response.json();
    setPosts(posts);
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
            posts.map((post, index) => (
              <Link key={index} href={`/kalis/${post.slug}`}>
                <li style={{ color: '#ffffff' }}>{post.title} - {post.date}</li>
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
