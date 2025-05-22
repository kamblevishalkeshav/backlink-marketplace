'use client';

import EnhancedFilterPanel, { EnhancedFilters } from '@/components/marketplace/EnhancedFilterPanel';
import { FilterValues } from '@/components/marketplace/FilterPanel';
import MarketplaceFooter from '@/components/marketplace/MarketplaceFooter';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceTable from '@/components/marketplace/MarketplaceTable';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { ListingFilters, useListings } from '@/hooks/useListings';
import { useEffect, useState } from 'react';

export default function MarketplacePage() {
  const [searchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    minDA: 0,
    maxDA: 100,
    minDR: 0,
    maxDR: 100,
    category: '',
    minPrice: 0,
    maxPrice: 500,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const { fetchListings, filterListings } = useListings(currentPage, pageSize);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    // Create filter object from activeFilters and searchTerm
    const filters: ListingFilters = {
      ...activeFilters,
      search: searchTerm
    };
    
    filterListings(filters);
  }, [activeFilters, searchTerm, filterListings]);

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchTerm]);

  const handleApplyEnhancedFilters = (filters: EnhancedFilters) => {
    // Map the enhanced filters to the format expected by the listings hook
    const mappedFilters: FilterValues = {
      minDA: filters.daRange?.min || 0,
      maxDA: filters.daRange?.max || 100,
      minDR: filters.drRange?.min || 0,
      maxDR: filters.drRange?.max || 100,
      category: filters.categories?.length ? filters.categories[0] : '',
      minPrice: filters.priceRange?.min || 0,
      maxPrice: filters.priceRange?.max || 500,
    };
    
    setActiveFilters(mappedFilters);
  };

  return (
    <MarketplaceProvider>
      <div className="min-h-screen bg-gray-50">
        <MarketplaceHeader />
        
        <main className="container mx-auto px-4 py-6">
          {/* Project Overview Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-xl font-bold text-gray-800 mb-1">arivupro.com</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">DR</span>
                    <span className="font-semibold">34</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">DA</span>
                    <span className="font-semibold">27</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">AS</span>
                    <span className="font-semibold">38</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Traffic</span>
                    <span className="font-semibold">58.8K</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Keywords</span>
                    <span className="font-semibold">11.3K</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Ref. Domains</span>
                    <span className="font-semibold">656</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Country</span>
                    <div className="flex items-center">
                      <span className="mr-1">IN</span>
                      <span className="text-xs text-gray-500">(87%)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <h3 className="text-sm font-semibold mb-1">Competitor Link Gap</h3>
                      <p className="text-xs text-gray-600">Add your competitors and automatically analyze their backlinks.</p>
                    </div>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                      Add Competitor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter and Table Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <EnhancedFilterPanel onApplyFilters={handleApplyEnhancedFilters} />
            
            <MarketplaceTable className="mt-4" />
            
            {/* The pagination is now handled within the MarketplaceTable component */}
          </div>
        </main>
        
        <MarketplaceFooter />
      </div>
    </MarketplaceProvider>
  );
} 