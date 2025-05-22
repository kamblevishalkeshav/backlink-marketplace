import { EnhancedFilters } from '@/components/marketplace/EnhancedFilterPanel';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

// Import the listing type from MarketplaceTable
interface Listing {
  id: string;
  price: number;
  website: {
    domain: string;
    verified: boolean;
  };
  type: {
    listingType: 'innerpage-link' | 'guest-post' | 'homepage-link' | 'sitewide-link';
    permanent: boolean;
    months?: number;
  };
  approx: {
    workingDays: number;
    wordCount?: number;
  };
  language: {
    primary: string;
    native: string;
    extra?: string[];
  };
  category: string;
  metrics: {
    country: string;
    countryCode: string;
    dr: {
      value: number;
      percentage: string;
    };
    da: number;
    as: number;
    traffic: number;
    keywords: number;
    refDomains: number;
  };
  niches: string[];
  publisherNote?: string;
  created: string;
}

// Sample data - will be replaced with API calls in production
const sampleListings: Listing[] = [
  // We'll import this from a separate file later, just using placeholder data now
  {
    id: '1',
    price: 552,
    website: {
      domain: 'artsmerd.at',
      verified: true
    },
    type: {
      listingType: 'innerpage-link',
      permanent: true
    },
    approx: {
      workingDays: 2
    },
    language: {
      primary: 'English',
      native: 'English'
    },
    category: 'Technology',
    metrics: {
      country: 'US',
      countryCode: 'US',
      dr: {
        value: 64,
        percentage: '57%'
      },
      da: 33,
      as: 32,
      traffic: 1363,
      keywords: 2477,
      refDomains: 1211
    },
    niches: ['Agri-food and cuisine', 'Healthcare blogs', 'Animal care'],
    created: '2025-05-20'
  },
  {
    id: '2',
    price: 552,
    website: {
      domain: 'teamdago.io',
      verified: true
    },
    type: {
      listingType: 'innerpage-link',
      permanent: true
    },
    approx: {
      workingDays: 2
    },
    language: {
      primary: 'English',
      native: 'English'
    },
    category: 'Technology',
    metrics: {
      country: 'US',
      countryCode: 'US',
      dr: {
        value: 75,
        percentage: '67%'
      },
      da: 50,
      as: 33,
      traffic: 1359,
      keywords: 3919,
      refDomains: 4286
    },
    niches: ['Alternative health', 'Accessibility tools', 'Business management'],
    created: '2025-05-20'
  },
  // Add more sample listings as needed
];

// Define the context interface
interface MarketplaceContextType {
  listings: Listing[];
  filteredListings: Listing[];
  activeFilters: EnhancedFilters;
  activeListingType: 'guest-posts' | 'homepage-links' | 'innerpage-links' | 'sitewide-links';
  searchTerm: string;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  applyFilters: (filters: EnhancedFilters) => void;
  setListingType: (type: 'guest-posts' | 'homepage-links' | 'innerpage-links' | 'sitewide-links') => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
}

// Create context with default values
const MarketplaceContext = createContext<MarketplaceContextType>({
  listings: [],
  filteredListings: [],
  activeFilters: {
    languages: [],
    countries: [],
    categories: [],
    sensitiveNiches: [],
    noFollow: null,
    contentBy: null,
    sponsored: null,
    priceRange: { min: 0, max: 500 },
    drRange: { min: 0, max: 100 },
    daRange: { min: 0, max: 100 },
    asRange: { min: 0, max: 100 },
    trafficRange: { min: 0, max: 1000000 },
    keywordsRange: { min: 0, max: 10000 },
    refDomainsRange: { min: 0, max: 1000 },
    competitorGapMatch: false,
    excludePurchased: false
  },
  activeListingType: 'guest-posts',
  searchTerm: '',
  loading: false,
  totalPages: 1,
  currentPage: 1,
  applyFilters: () => {},
  setListingType: () => {},
  setSearchTerm: () => {},
  setCurrentPage: () => {}
});

// Provider component
export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listings] = useState<Listing[]>(sampleListings);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(sampleListings);
  const [activeFilters, setActiveFilters] = useState<EnhancedFilters>({
    languages: [],
    countries: [],
    categories: [],
    sensitiveNiches: [],
    noFollow: null,
    contentBy: null,
    sponsored: null,
    priceRange: { min: 0, max: 500 },
    drRange: { min: 0, max: 100 },
    daRange: { min: 0, max: 100 },
    asRange: { min: 0, max: 100 },
    trafficRange: { min: 0, max: 1000000 },
    keywordsRange: { min: 0, max: 10000 },
    refDomainsRange: { min: 0, max: 1000 },
    competitorGapMatch: false,
    excludePurchased: false
  });
  const [activeListingType, setActiveListingType] = useState<'guest-posts' | 'homepage-links' | 'innerpage-links' | 'sitewide-links'>('guest-posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages] = useState(14162); // Placeholder, would be determined by API
  const [currentPage, setCurrentPage] = useState(1);

  // Function to apply filters
  const applyFilters = useCallback((filters: EnhancedFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Function to set listing type
  const setListingType = useCallback((type: 'guest-posts' | 'homepage-links' | 'innerpage-links' | 'sitewide-links') => {
    setActiveListingType(type);
    setCurrentPage(1); // Reset to first page when listing type changes
  }, []);

  // Apply filters and search term to listings
  useEffect(() => {
    setLoading(true);
    
    // In a real application, this would be an API call
    // For now, we'll filter the sample data client-side
    const filtered = listings.filter(listing => {
      // Filter by listing type
      if (activeListingType === 'guest-posts' && listing.type.listingType !== 'guest-post') return false;
      if (activeListingType === 'homepage-links' && listing.type.listingType !== 'homepage-link') return false;
      if (activeListingType === 'innerpage-links' && listing.type.listingType !== 'innerpage-link') return false;
      if (activeListingType === 'sitewide-links' && listing.type.listingType !== 'sitewide-link') return false;
      
      // Filter by price range
      if (listing.price < activeFilters.priceRange.min || 
         (activeFilters.priceRange.max !== 500 && listing.price > activeFilters.priceRange.max)) return false;
      
      // Filter by DR range
      if (listing.metrics.dr.value < activeFilters.drRange.min || 
         listing.metrics.dr.value > activeFilters.drRange.max) return false;
      
      // Filter by DA range
      if (listing.metrics.da < activeFilters.daRange.min || 
         listing.metrics.da > activeFilters.daRange.max) return false;
      
      // Filter by AS range
      if (listing.metrics.as < activeFilters.asRange.min || 
         listing.metrics.as > activeFilters.asRange.max) return false;
      
      // Filter by traffic range
      if (listing.metrics.traffic < activeFilters.trafficRange.min || 
         (activeFilters.trafficRange.max !== 1000000 && listing.metrics.traffic > activeFilters.trafficRange.max)) return false;
      
      // Filter by keywords range
      if (listing.metrics.keywords < activeFilters.keywordsRange.min || 
         (activeFilters.keywordsRange.max !== 10000 && listing.metrics.keywords > activeFilters.keywordsRange.max)) return false;
      
      // Filter by ref domains range
      if (listing.metrics.refDomains < activeFilters.refDomainsRange.min || 
         (activeFilters.refDomainsRange.max !== 1000 && listing.metrics.refDomains > activeFilters.refDomainsRange.max)) return false;
      
      // Filter by language
      if (activeFilters.languages.length > 0 && 
         !activeFilters.languages.includes(listing.language.primary.toLowerCase())) return false;
      
      // Filter by country
      if (activeFilters.countries.length > 0 && 
         !activeFilters.countries.includes(listing.metrics.country.toLowerCase())) return false;
      
      // Filter by category
      if (activeFilters.categories.length > 0 && 
         !activeFilters.categories.includes(listing.category.toLowerCase())) return false;
      
      // Filter by search term
      if (searchTerm && !listing.website.domain.includes(searchTerm.toLowerCase()) && 
         !listing.niches.some(niche => niche.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      
      return true;
    });
    
    // Simulate API delay
    setTimeout(() => {
      setFilteredListings(filtered);
      setLoading(false);
    }, 300);
    
  }, [listings, activeFilters, activeListingType, searchTerm]);

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        filteredListings,
        activeFilters,
        activeListingType,
        searchTerm,
        loading,
        totalPages,
        currentPage,
        applyFilters,
        setListingType,
        setSearchTerm,
        setCurrentPage
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

// Custom hook to use the marketplace context
export const useMarketplace = () => useContext(MarketplaceContext); 