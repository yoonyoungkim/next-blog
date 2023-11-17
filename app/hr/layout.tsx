import React from 'react';
import { getAllPosts } from '@/app/lib/api';
import Link from 'next/link';
import { HR_SEGMENT, MENU_DATA_LIST } from '@/app/constants/constants';
import { PostType } from '@/app/interfaces/posts';

export default async function HrLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  const posts: PostType[] = await getAllPosts(HR_SEGMENT, [...MENU_DATA_LIST]);
  return (
    <section>
      {/*__post/hr*/}
      <nav>
        <ul>
          {
            posts.map((post, index) => (<Link key={index} href={`/hr/${post.slug}`}>
              <li>{post.title} - {post.date}</li>
            </Link>))
          }
        </ul>
      </nav>
      {children}
    </section>
  );
}
