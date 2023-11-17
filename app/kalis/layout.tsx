import React from 'react';

export default function KalisLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  );
}
