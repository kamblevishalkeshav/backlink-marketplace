'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronRight, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Load the editor component on the client side only
const ListingEditorMultiStep = dynamic(
  () => import('@/components/admin/marketplace/ListingEditorMultiStep'),
  { ssr: false }
);

export default function CreateListingPage() {
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
              <BreadcrumbLink href="/admin/marketplace/listings">Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Create Listing</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <div className="bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <Plus className="h-6 w-6 text-white" />
          </div>
          Create New Listing
        </h1>
      </div>
      
      <Suspense fallback={<div>Loading editor...</div>}>
        <ListingEditorMultiStep />
      </Suspense>
    </div>
  );
} 