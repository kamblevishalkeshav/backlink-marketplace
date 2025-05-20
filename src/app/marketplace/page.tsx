'use client';

import { Button } from '@/components/common/Button';
import { FilterPanel, FilterValues } from '@/components/marketplace/FilterPanel';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { Listing, ListingFilters, useListings } from '@/hooks/useListings';
import { Filter, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    minDA: 0,
    maxDA: 100,
    minDR: 0,
    maxDR: 100,
    category: '',
    minPrice: 0,
    maxPrice: 500,
  });
  
  const { listings, loading, error, fetchListings, filterListings } = useListings();

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

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleFilterChange = (filters: FilterValues) => {
    setActiveFilters(filters);
    setShowFilters(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-accent/10 text-primary mb-4">
          <span className="text-sm font-medium">Find quality backlinks for your website</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-primary">Backlink Marketplace</h1>
        <p className="text-muted-foreground">
          Browse through our collection of high-quality backlink opportunities
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <SearchBar
            onSearch={handleSearch}
            initialQuery={searchTerm}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="flex-grow md:flex-grow-0"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8">
        {/* Filters panel - desktop */}
        <div className="hidden lg:block">
          <FilterPanel 
            onFilter={handleFilterChange}
            isOpen={true}
            onClose={() => {}}
          />
        </div>

        {/* Mobile filter panel */}
        <FilterPanel 
          onFilter={handleFilterChange}
          isOpen={showFilters && typeof window !== 'undefined' && window.innerWidth < 1024}
          onClose={() => setShowFilters(false)}
        />

        {/* Listing grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
              <p className="text-muted-foreground">Loading listings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-primary">Error Loading Listings</h3>
              <p className="text-muted-foreground mb-4">
                There was a problem loading the marketplace listings. Please try again later.
              </p>
              <Button 
                onClick={() => fetchListings()} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing: Listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    website={listing.website}
                    domainAuthority={listing.domainAuthority}
                    domainRating={listing.domainRating}
                    traffic={listing.traffic}
                    category={listing.category}
                    price={listing.price}
                    description={listing.description}
                  />
                ))}
              </div>

              {listings.length === 0 && (
                <div className="text-center py-16 bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find backlink opportunities.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveFilters(activeFilters)}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 