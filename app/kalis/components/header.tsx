import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <div
      style={{ position: 'sticky', top: 0, width: '100%', height: '48px', minHeight: '48px', padding: '0 30px', borderBottom: '1px solid rgb(219, 219, 220)', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center' }}>
      <Link href={'/kalis'}>Header</Link>
    </div>
  );
};

export default Header;
