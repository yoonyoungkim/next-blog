import React from 'react';
import Link from 'next/link';
import { HR_SEGMENT } from '@/app/constants/constants';
import { styled } from '@/stitches.config';

const Text = styled('p', {
  fontFamily: '$system',
  color: '$hiContrast',
  variants: {
    size: {
      1: {
        fontSize: '$1',
      },
      2: {
        fontSize: '$2',
      },
      3: {
        fontSize: '$3',
      },
    },
  },
});

const Header = () => {
  return (
    <div
      style={{ position: 'sticky', top: 0, width: '100%', height: '48px', minHeight: '48px', padding: '0 30px', borderBottom: '1px solid rgb(219, 219, 220)', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center' }}>
      <Link href={`/${HR_SEGMENT}`}><Text size={1}>HR Header</Text></Link>
    </div>
  );
};

export default Header;
