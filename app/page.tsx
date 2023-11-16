import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <Link href='/hr'>
        <li>hr</li>
      </Link>
      <Link href='/kalis'>
        <li>kalis</li>
      </Link>
    </ul>
  );
}
