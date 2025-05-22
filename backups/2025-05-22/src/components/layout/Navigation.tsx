'use client';

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="md:hidden">
      <button
        className="flex items-center justify-center h-10 w-10 rounded-md bg-background"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <Link href="/" className="font-bold text-xl">
                Anic Digital
              </Link>
              <button
                className="flex items-center justify-center h-10 w-10 rounded-md bg-background"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 py-8">
              <Link
                href="/"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive('/') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive('/marketplace') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Marketplace
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive('/dashboard') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                href="/publisher/listings"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive('/publisher') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Publisher
              </Link>
            </nav>
            
            <div className="mt-auto">
              <Link
                href="/login"
                className="w-full flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 