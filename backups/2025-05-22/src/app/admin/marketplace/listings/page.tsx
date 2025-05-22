'use client';

import ListingTable from '@/components/admin/marketplace/ListingTable';

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace Listings</h1>
        <p className="text-gray-500 mt-1">Review and manage publisher listings</p>
      </div>

      <ListingTable />
    </div>
  );
} 