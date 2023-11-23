import React from 'react';
import Navigation from '@/app/components/navigation';
import Header from '@/app/hr/components/header';
import { HR_SEGMENT } from '@/app/constants/constants';

export default async function HrLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', width: '1920px' }}>
      <Header />
      <div style={{ height: 'calc(100% - 48px)', display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
        <nav>
          <Navigation segment={HR_SEGMENT} />
        </nav>
        <div style={{ flex: '1 1', overflow: 'auto', padding: '20px' }}>
          {children}
        </div>
      </div>
    </section>
  );
}
