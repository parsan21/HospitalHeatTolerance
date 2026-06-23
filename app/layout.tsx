import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Hospital Heat Resilience',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
