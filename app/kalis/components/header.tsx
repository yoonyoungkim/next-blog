import React from 'react';
import Link from 'next/link';
import { KALIS_SEGMENT } from '@/app/constants/constants';

const Header = () => {
  return (
    <div
      style={{ position: 'sticky', top: 0, width: '100%', height: '48px', minHeight: '48px', padding: '0 30px', borderBottom: '1px solid rgb(219, 219, 220)', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center' }}>
      <Link href={`/${KALIS_SEGMENT}`}>Kalis Header</Link>
    </div>
  );
};

export default Header;
