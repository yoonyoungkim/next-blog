import React from 'react';
import { getAllPosts } from '@/app/lib/api';
import { HR_SEGMENT, MENU_DATA_LIST } from '@/app/constants/constants';
import { PostType } from '@/app/interfaces/posts';
import Navigation from '@/app/hr/(components)/navigation';

export default async function HrLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  const posts: PostType[] = await getAllPosts(HR_SEGMENT, [...MENU_DATA_LIST]);
  return (
    <section>
      <nav>
        <Navigation />
      </nav>
      {children}
    </section>
  );
}
