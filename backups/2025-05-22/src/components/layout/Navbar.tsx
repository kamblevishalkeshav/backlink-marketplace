"use client"

import { useTheme } from '@/app/providers';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        {/* Logo Area */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
            <span className="text-[#2ac37a]">Backlink</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-[#2b2e2f]'}>Marketplace</span>
          </Link>
          
          {/* Navigation Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/features" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/marketplace" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </Link>
            <Link 
              href="/blog" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-200
                     ${theme === 'dark' ? 'bg-[#87c44d] text-white' : 'text-foreground hover:bg-[#87c44d]/10'} hover:text-[#87c44d]`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Sign In Button - Hidden on mobile */}
          <Button 
            variant="outline" 
            asChild 
            className={`hidden sm:inline-flex text-sm font-bold hover:bg-[#87c44d]/10 hover:text-[#87c44d] hover:border-[#87c44d] ${
              theme === 'dark' ? 'bg-[#87c44d]/20 !text-white !border-[#87c44d]' : ''
            }`}
          >
            <Link href="/login"><span className="font-extrabold">Sign In</span></Link>
          </Button>

          {/* Get Started Button */}
          <Button 
            className="bg-[#2ac37a] hover:bg-[#2ac37a]/90 text-white text-sm font-bold"
            asChild
          >
            <Link href="/register"><span className="font-extrabold">Get Started</span></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 