import React from 'react';
import Navigation from '@/app/kalis/(components)/navigation';
import Header from '@/app/kalis/(components)/header';

export default function KalisLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', width: '1920px' }}>
      <Header />
      <div style={{ height: 'calc(100% - 48px)', display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
        <Navigation />
        <div style={{ flex: '1 1', overflow: 'auto', padding: '20px' }}>
          {children}
        </div>
      </div>
    </section>
  );
}
