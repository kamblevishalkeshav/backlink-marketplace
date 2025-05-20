'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if path is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full",
        "transition-all duration-300 ease-in-out",
        scrolled 
          ? "backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-md" 
          : "backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800"
      )}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Text Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-extrabold text-2xl mr-8 leading-none select-none"
        >
          <span className="text-primary">Backlink</span>
          <span className="text-gray-900 dark:text-white">Marketplace</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link 
            href="/" 
            className={cn(
              "text-sm font-medium transition-all duration-200 py-2 relative", 
              isActive('/') 
                ? "text-primary" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            )}
          >
            <span>Home</span>
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/marketplace" 
            className={cn(
              "text-sm font-medium transition-all duration-200 py-2 relative", 
              isActive('/marketplace') 
                ? "text-primary" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            )}
          >
            <span>Marketplace</span>
            {isActive('/marketplace') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/publisher" 
            className={cn(
              "text-sm font-medium transition-all duration-200 py-2 relative", 
              isActive('/publisher') 
                ? "text-primary" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            )}
          >
            <span>For Publishers</span>
            {isActive('/publisher') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/pricing" 
            className={cn(
              "text-sm font-medium transition-all duration-200 py-2 relative", 
              isActive('/pricing') 
                ? "text-primary" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            )}
          >
            <span>Pricing</span>
            {isActive('/pricing') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
          <Link 
            href="/contact" 
            className={cn(
              "text-sm font-medium transition-all duration-200 py-2 relative", 
              isActive('/contact') 
                ? "text-primary" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            )}
          >
            <span>Contact</span>
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Link>
        </nav>
        
        {/* Right side controls */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Sign In / Get Started */}
          <Link
            href="/login"
            className="btn-base btn-secondary hidden lg:inline-flex"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="btn-base btn-primary hidden md:inline-flex"
          >
            Get Started
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="ml-4 flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 z-30 bg-white dark:bg-gray-900 md:hidden",
          "transition-all duration-300 ease-in-out",
          isMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container px-4 sm:px-6 pt-6 pb-20 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={cn(
                "text-lg font-medium p-3 rounded-lg transition-all duration-200", 
                isActive('/') 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Home
            </Link>
            <Link 
              href="/marketplace" 
              className={cn(
                "text-lg font-medium p-3 rounded-lg transition-all duration-200", 
                isActive('/marketplace') 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Marketplace
            </Link>
            <Link 
              href="/publisher" 
              className={cn(
                "text-lg font-medium p-3 rounded-lg transition-all duration-200", 
                isActive('/publisher') 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              For Publishers
            </Link>
            <Link 
              href="/pricing" 
              className={cn(
                "text-lg font-medium p-3 rounded-lg transition-all duration-200", 
                isActive('/pricing') 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "text-lg font-medium p-3 rounded-lg transition-all duration-200", 
                isActive('/contact') 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Contact
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/register"
                className="w-full btn-base btn-primary flex items-center justify-center p-3 mb-3"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="w-full btn-base btn-secondary flex items-center justify-center p-3"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 