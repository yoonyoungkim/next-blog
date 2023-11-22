import React from 'react';
import Navigation from '@/app/components/navigation';

export default async function HrLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex' }}>
      <nav>
        <Navigation segment={'hr'} />
      </nav>
      {children}
    </section>
  );
}
