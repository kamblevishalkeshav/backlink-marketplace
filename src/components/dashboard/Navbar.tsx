import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-600 mr-2">Backlink</span>
            <span className="text-xl font-bold text-gray-800">Marketplace</span>
          </Link>
          
          <div className="ml-10 space-x-1">
            <Link 
              href="/marketplace" 
              className="px-3 py-2 text-sm font-medium text-green-600 border-b-2 border-green-500"
            >
              Marketplace
            </Link>
            <Link 
              href="/projects" 
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Projects
            </Link>
            <Link 
              href="/orders" 
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Orders
            </Link>
            <div className="relative inline-block">
              <Link 
                href="/wallet" 
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
              >
                Wallet
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            <div className="relative inline-block">
              <Link 
                href="/tools" 
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
              >
                Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 