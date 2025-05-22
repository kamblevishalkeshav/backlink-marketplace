import React from 'react';

const MarketplaceFooter: React.FC = () => (
  <footer className="w-full border-t bg-white py-6 mt-8">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <span className="text-sm text-gray-500">
        © {new Date().getFullYear()} Backlink Marketplace. All rights reserved.
      </span>
      <nav className="flex gap-4 text-sm" aria-label="Footer">
        <a href="/terms" className="hover:underline text-gray-600">Terms</a>
        <a href="/privacy" className="hover:underline text-gray-600">Privacy</a>
        <a href="/contact" className="hover:underline text-gray-600">Contact</a>
      </nav>
    </div>
  </footer>
);

export default MarketplaceFooter; 