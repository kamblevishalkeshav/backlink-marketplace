import { Bell, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MarketplaceHeader: React.FC = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-green-600 font-bold text-xl">
              <span className="mr-1">🔗</span> 
              Backlink Marketplace
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/marketplace" className="text-gray-900 font-medium hover:text-green-600">
              Marketplace
            </Link>
            <Link href="/listings" className="text-gray-500 hover:text-gray-900">
              My Listings
            </Link>
            <Link href="/orders" className="text-gray-500 hover:text-gray-900">
              Orders
            </Link>
            <Link href="/analytics" className="text-gray-500 hover:text-gray-900">
              Analytics
            </Link>
          </nav>
          
          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <button className="flex items-center ml-2 text-sm text-gray-600">
                Account
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader; 