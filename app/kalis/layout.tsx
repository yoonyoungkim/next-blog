import React from 'react';
import { getAllPosts } from '@/app/lib/api';
import Link from 'next/link';

export default function KalisLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  const posts = getAllPosts('kalis', ['slug', 'title', 'date']);
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
