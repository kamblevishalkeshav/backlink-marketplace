'use client';

import { Card } from '@/components/ui/card/index';
import { Listing } from '@/types/listing';
import { motion } from 'framer-motion';

// Enhanced section components
const BasicInfoSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Basic Information</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Website Domain</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded"
          placeholder="example.com"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded"
          placeholder="100"
          readOnly
        />
      </div>
    </div>
  </div>
);

const ContentSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Content Details</h3>
    <div>
      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        className="w-full p-2 border rounded min-h-32"
        placeholder="Describe this listing..."
        readOnly
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Listing Type</label>
      <select 
        className="w-full p-2 border rounded"
        disabled
      >
        <option value="">Select type</option>
        <option value="guest-post">Guest Post</option>
        <option value="link-insertion">Link Insertion</option>
      </select>
    </div>
  </div>
);

const MetricsSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Site Metrics</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Domain Authority (DA)</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded"
          placeholder="30"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Domain Rating (DR)</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded"
          placeholder="40"
          readOnly
        />
      </div>
    </div>
  </div>
);

const TrafficSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Traffic Information</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Traffic</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded"
          placeholder="10000"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Primary Language</label>
        <select 
          className="w-full p-2 border rounded"
          disabled
        >
          <option value="">Select language</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  </div>
);

const NichesSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Niche Categories</h3>
    <div>
      <label className="block text-sm font-medium mb-1">Selected Niches</label>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">Technology</span>
        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">Marketing</span>
        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">SEO</span>
      </div>
    </div>
  </div>
);

const SubmitSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Review & Submit</h3>
    <div className="bg-gray-50 p-4 rounded space-y-4">
      <p className="text-center text-gray-500">Please complete all required fields to enable submission.</p>
    </div>
  </div>
);

// Define ListingEditorProps interface for passing initial data and id for editing
interface ListingEditorProps {
  initialData?: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  listingId?: string;
}

export default function ListingEditor({ 
  // initialData is unused in this simplifiedversion
  // initialData = DEFAULT_LISTING,
  listingId
}: ListingEditorProps) {
  const isEditing = !!listingId;

  // Container animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Heading with Edit/Create context */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditing ? 'Edit Listing' : 'Create New Listing'}
        </h2>
        <p className="text-sm text-gray-600">
          {isEditing 
            ? 'Update the information for this listing'
            : 'Fill out the details to create a new listing'
          }
        </p>
      </div>
      
      {/* Main content sections */}
      <Card className="p-6 shadow-md">
        <motion.div
          className="space-y-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left column */}
          <div className="space-y-8">
            <motion.div variants={item}>
              <BasicInfoSection />
            </motion.div>
            
            <motion.div variants={item}>
              <ContentSection />
            </motion.div>
            
            <motion.div variants={item}>
              <TrafficSection />
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>
          
          {/* Right column */}
          <div className="space-y-8">
            <motion.div variants={item}>
              <MetricsSection />
            </motion.div>
            
            <motion.div variants={item}>
              <NichesSection />
            </motion.div>
            
            <motion.div variants={item}>
              <SubmitSection />
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
} 