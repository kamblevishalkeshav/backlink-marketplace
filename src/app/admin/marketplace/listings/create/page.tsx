'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

// Dynamic import for client-only rendering
const ListingEditor = dynamic(
  () => import('@/components/admin/marketplace/ListingEditor'),
  { ssr: false }
);

export default function CreateListingPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      router.push('/admin/marketplace/listings');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-16">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Listing
            </h1>
          </div>
          <p className="text-gray-500 mt-1 ml-10">Add a new website to your marketplace listings</p>
        </div>
        
        <Button 
          onClick={handleSave} 
          size="lg" 
          disabled={isSaving}
          className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          {isSaving ? 'Saving...' : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Listing
            </>
          )}
        </Button>
      </motion.div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <Suspense fallback={<div className="p-8">Loading editor...</div>}>
          <ListingEditor />
        </Suspense>
      </div>
    </div>
  );
} 