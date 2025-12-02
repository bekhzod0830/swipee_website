import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'swipee',
  description: 'Discover Your Style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateStaticParams() {
  return [];
}
