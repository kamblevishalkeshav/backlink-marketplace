'use client';

import ListingEditor from '@/components/admin/marketplace/ListingEditor';
import { DEFAULT_LISTING } from '@/components/admin/marketplace/constants';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Listing } from '@/types/listing';
import { ChevronRight, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditListingPageProps {
  params: {
    id: string;
  };
}

export default function EditListingPage({ params }: EditListingPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Omit<Listing, 'id' | 'status' | 'createdAt'>>(DEFAULT_LISTING);
  
  useEffect(() => {
    // In a real application, you would fetch the listing data from an API
    const fetchListing = async () => {
      try {
        setLoading(true);
        
        // Mock API call (replace with actual API call)
        // const response = await fetch(`/api/listings/${id}`);
        // const data = await response.json();
        
        // For demo purposes, we're just using a timeout to simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, you would use the API response
        const mockData = {
          ...DEFAULT_LISTING,
          website: {
            ...DEFAULT_LISTING.website,
            domain: 'example-domain.com',
            verified: true,
            tags: ['backlinks', 'technology']
          },
          price: 149,
          category: 'Technology',
          niches: ['Technology', 'Marketing'],
          metrics: {
            ...DEFAULT_LISTING.metrics,
            da: 45,
            dr: {
              value: 52,
              percentage: '+5%'  
            },
            traffic: 5000,
            keywords: 2500,
            refDomains: 120
          }
        };
        
        setListing(mockData);
      } catch (error) {
        console.error('Error fetching listing:', error);
        // In a real app, you would handle errors and show a toast notification
      } finally {
        setLoading(false);
      }
    };
    
    fetchListing();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-10 w-10 border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-lg font-medium">Loading listing...</span>
      </div>
    );
  }
  
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-6 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/marketplace">Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Edit Listing</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <Edit className="h-6 w-6 text-white" />
          </div>
          Edit Listing: {listing.website.domain}
        </h1>
      </div>
      
      <ListingEditor 
        initialData={listing}
        listingId={id}
      />
    </div>
  );
} 