'use client';

import { Footer as ModernFooter } from "@/components/ui/footer-demo";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Use modern footer on home page, keep the original footer on other pages
  if (pathname === '/') {
    return <ModernFooter />;
  }

  // Original footer implementation for other pages
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
        {/* Top Section with Logo and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary text-xl">Backlink</span>
              <span className="text-white text-xl">Marketplace</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="text-sm hover:text-primary transition-colors duration-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm hover:text-primary transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/publisher/listings" className="text-sm hover:text-primary transition-colors duration-300">
                  Publisher Portal
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-primary transition-colors duration-300">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm hover:text-primary transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm hover:text-primary transition-colors duration-300">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm hover:text-primary transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm hover:text-primary transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm hover:text-primary transition-colors duration-300">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mt-0.5 text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-sm">support@backlinkmarketplace.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mt-0.5 text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mt-0.5 text-primary">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">123 Digital Avenue<br />San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section with Legal Links and Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <Link href="/terms" className="text-xs hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs hover:text-primary transition-colors duration-300">
              Cookie Policy
            </Link>
            <Link href="/legal" className="text-xs hover:text-primary transition-colors duration-300">
              Legal
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Backlink Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 