'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { PostType } from '@/app/interfaces/posts';


const Navigation = () => {
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

  return <div style={{ display: 'flex' }}>
    <div>
      <input type='text' placeholder='Search posts...' value={searchKeyword}
             onChange={handleChange} />
      <ul>
        {
          posts.map((post, index) => (<Link key={index} href={`/kalis/${post.slug}`}>
            <li>{post.title} - {post.date}</li>
          </Link>))
        }
      </ul>
    </div>
  </div>;
};

export default Navigation;
