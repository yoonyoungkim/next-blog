import React from 'react';
import Navigation from '@/app/kalis/(components)/navigation';

export default function KalisLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navigation />
      {children}
    </section>
  );
}
