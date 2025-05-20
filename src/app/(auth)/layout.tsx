'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl px-4 py-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-primary">Backlink</span>
          <span>Marketplace</span>
        </Link>
      </div>
      <main className="w-full">
        {children}
      </main>
    </div>
  );
} 