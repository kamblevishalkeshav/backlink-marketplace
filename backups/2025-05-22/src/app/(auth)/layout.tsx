'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute top-8 right-8 z-50">
        <Link 
          href="/" 
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-600" />
        </Link>
      </div>
      <main className="w-full">
        {children}
      </main>
    </div>
  );
} 