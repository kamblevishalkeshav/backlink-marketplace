import Link from 'next/link';
import React from 'react';

const DashboardFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-green-600 font-bold text-lg mr-1">Backlink</span>
            <span className="text-gray-700 font-bold text-lg">Marketplace</span>
            <span className="text-sm text-gray-500 ml-2">© {currentYear} Backlink Marketplace. All rights reserved.</span>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy
            </Link>
            <Link href="/help" className="text-sm text-gray-500 hover:text-gray-700">
              Help
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter; 