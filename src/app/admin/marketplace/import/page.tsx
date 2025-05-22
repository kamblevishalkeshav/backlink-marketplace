import ListingImport from '@/components/admin/marketplace/ListingImport';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Import Listings | Admin',
  description: 'Import listings from CSV or Excel files',
};

export default function ImportListingsPage() {
  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="mb-6 flex items-center">
          <Link href="/admin/marketplace/listings">
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Import Listings</h1>
        </div>
        
        <div className="grid gap-6">
          <div className="prose max-w-none">
            <p>
              Use this tool to bulk import listings from a CSV or Excel file. 
              The file should follow the template format with all required fields.
            </p>
            <h3>Instructions</h3>
            <ol className="list-decimal ml-5">
              <li>Download the template CSV file</li>
              <li>Fill in your listing data following the format</li>
              <li>Save the file and upload it using the form below</li>
              <li>Review any validation errors and fix them in your file</li>
              <li>Re-upload the corrected file if needed</li>
            </ol>
          </div>
          
          <ListingImport />
        </div>
      </div>
    </AdminLayout>
  );
} 