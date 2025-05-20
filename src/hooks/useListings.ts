'use client';

import { useCallback, useState } from 'react';

export interface Listing {
  id: number;
  website: string;
  domain?: string;
  domainAuthority: number;
  domainRating: number;
  traffic: string;
  category: string;
  price: string;
  description: string;
  indexing?: string;
  language?: string;
  turnaroundTime?: string;
  linkType?: string;
  acceptedAnchors?: string;
  requirements?: string[];
  publisherInfo?: {
    name: string;
    registeredSince: string;
    completedOrders: number;
    rating: number;
  };
}

export interface ListingFilters {
  category?: string;
  minDA?: number;
  maxDA?: number;
  minDR?: number;
  maxDR?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock listings data - in a real app, this would come from an API
  const mockListings: Listing[] = [
    {
      id: 1,
      website: "healthblog.com",
      domain: "https://healthblog.com",
      domainAuthority: 52,
      domainRating: 58,
      traffic: "12.5K",
      category: "Health",
      price: "$120",
      description: "Health and wellness blog covering fitness, nutrition, and mental health topics with a focus on evidence-based information.",
      indexing: "Google, Bing",
      language: "English",
      turnaroundTime: "3-5 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic, Exact match (subject to approval)",
      requirements: [
        "Content must be relevant to health, wellness, fitness, or nutrition",
        "No promotional content for pharmaceutical products",
        "Content must be original and not published elsewhere",
        "Minimum 500 words of high-quality content"
      ],
      publisherInfo: {
        name: "Health & Wellness Media Group",
        registeredSince: "2018",
        completedOrders: 183,
        rating: 4.8
      }
    },
    {
      id: 2,
      website: "techreview.net",
      domain: "https://techreview.net",
      domainAuthority: 48,
      domainRating: 51,
      traffic: "24K",
      category: "Technology",
      price: "$150",
      description: "Technology news and reviews covering the latest gadgets, software, and tech trends.",
      indexing: "Google, Bing, Yahoo",
      language: "English",
      turnaroundTime: "2-4 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic",
      requirements: [
        "Content must be tech-related",
        "No promotional content for competitive products",
        "Content must be original and not published elsewhere",
        "Minimum 800 words of high-quality content"
      ],
      publisherInfo: {
        name: "Tech Media Inc",
        registeredSince: "2019",
        completedOrders: 145,
        rating: 4.6
      }
    },
    {
      id: 3,
      website: "financenews.org",
      domain: "https://financenews.org",
      domainAuthority: 56,
      domainRating: 60,
      traffic: "35K",
      category: "Finance",
      price: "$180",
      description: "Financial news, market analysis, and investment strategies for individual investors.",
      indexing: "Google, Bing",
      language: "English",
      turnaroundTime: "3-5 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic",
      requirements: [
        "Content must be finance-related",
        "No promotional content for cryptocurrency",
        "Content must be original and not published elsewhere",
        "Minimum 1000 words of high-quality content"
      ],
      publisherInfo: {
        name: "Finance News Network",
        registeredSince: "2017",
        completedOrders: 210,
        rating: 4.9
      }
    },
    {
      id: 4,
      website: "travelblog.co",
      domain: "https://travelblog.co",
      domainAuthority: 45,
      domainRating: 47,
      traffic: "18K",
      category: "Travel",
      price: "$130",
      description: "Travel guides, destination reviews, and travel tips from experienced globe trotters.",
      indexing: "Google, Bing",
      language: "English",
      turnaroundTime: "4-6 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic, Exact match (subject to approval)",
      requirements: [
        "Content must be travel-related",
        "No promotional content for airlines",
        "Content must be original and not published elsewhere",
        "Minimum 600 words of high-quality content"
      ],
      publisherInfo: {
        name: "Global Travel Media",
        registeredSince: "2020",
        completedOrders: 87,
        rating: 4.5
      }
    },
    {
      id: 5,
      website: "cookingrecipes.com",
      domain: "https://cookingrecipes.com",
      domainAuthority: 51,
      domainRating: 53,
      traffic: "42K",
      category: "Food",
      price: "$145",
      description: "Recipes, cooking tips, and food culture articles from professional chefs.",
      indexing: "Google, Bing, Yahoo",
      language: "English",
      turnaroundTime: "2-4 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic",
      requirements: [
        "Content must be food or cooking related",
        "No promotional content for food delivery services",
        "Content must be original and not published elsewhere",
        "Minimum 700 words of high-quality content with at least one original recipe"
      ],
      publisherInfo: {
        name: "Culinary Arts Network",
        registeredSince: "2018",
        completedOrders: 164,
        rating: 4.7
      }
    },
    {
      id: 6,
      website: "digitalmarketing.io",
      domain: "https://digitalmarketing.io",
      domainAuthority: 49,
      domainRating: 52,
      traffic: "28K",
      category: "Marketing",
      price: "$160",
      description: "Digital marketing strategies, SEO tips, and online advertising guides for businesses.",
      indexing: "Google, Bing",
      language: "English",
      turnaroundTime: "3-5 days",
      linkType: "Dofollow",
      acceptedAnchors: "Brand name, Generic, Exact match (subject to approval)",
      requirements: [
        "Content must be marketing-related",
        "No promotional content for SEO tools",
        "Content must be original and not published elsewhere",
        "Minimum 800 words of high-quality content"
      ],
      publisherInfo: {
        name: "Digital Marketing Pros",
        registeredSince: "2019",
        completedOrders: 132,
        rating: 4.7
      }
    },
  ];

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/listings');
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setListings(mockListings);
      setFilteredListings(mockListings);
    } catch (err) {
      setError('Failed to fetch listings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchListingById = useCallback(async (id: number | string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch(`/api/listings/${id}`);
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const listing = mockListings.find(l => l.id === Number(id));
      
      if (!listing) {
        throw new Error('Listing not found');
      }
      
      return listing;
    } catch (err) {
      setError('Failed to fetch listing details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const filterListings = useCallback((filters: ListingFilters) => {
    let filtered = [...listings];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.website.toLowerCase().includes(searchTerm) ||
        listing.category.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(listing => listing.category === filters.category);
    }
    
    if (filters.minDA !== undefined) {
      filtered = filtered.filter(listing => listing.domainAuthority >= filters.minDA!);
    }
    
    if (filters.maxDA !== undefined) {
      filtered = filtered.filter(listing => listing.domainAuthority <= filters.maxDA!);
    }
    
    if (filters.minDR !== undefined) {
      filtered = filtered.filter(listing => listing.domainRating >= filters.minDR!);
    }
    
    if (filters.maxDR !== undefined) {
      filtered = filtered.filter(listing => listing.domainRating <= filters.maxDR!);
    }
    
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter(listing => {
        const price = parseInt(listing.price.replace(/\D/g, ''));
        return (filters.minPrice === undefined || price >= filters.minPrice) && 
               (filters.maxPrice === undefined || price <= filters.maxPrice);
      });
    }
    
    setFilteredListings(filtered);
  }, [listings]);

  return {
    listings: filteredListings,
    loading,
    error,
    fetchListings,
    fetchListingById,
    filterListings
  };
} 