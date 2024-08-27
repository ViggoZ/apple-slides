import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apple Bento Slides',
  description: '苹果发布会幻灯片画廊',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-neutral-950">{children}</body>
    </html>
  );
}