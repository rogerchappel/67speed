import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '67speed', description: 'A zero-login nonsense speed test for the 6-7 meme.', metadataBase: new URL('https://67speed.com') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
