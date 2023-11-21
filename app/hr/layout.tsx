import React from 'react';
import Navigation from '@/app/hr/(components)/navigation';

export default async function HrLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex' }}>
      <nav>
        <Navigation />
      </nav>
      {children}
    </section>
  );
}
