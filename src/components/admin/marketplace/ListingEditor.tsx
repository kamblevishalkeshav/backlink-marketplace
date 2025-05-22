'use client';

import BasicInfoSection from '@/components/admin/marketplace/sections/BasicInfoSection';
import ContentSection from '@/components/admin/marketplace/sections/ContentSection';
import MetricsSection from '@/components/admin/marketplace/sections/MetricsSection';
import NichesSection from '@/components/admin/marketplace/sections/NichesSection';
import SubmitSection from '@/components/admin/marketplace/sections/SubmitSection';
import TrafficSection from '@/components/admin/marketplace/sections/TrafficSection';
import { Card } from '@/components/ui/card/index';
import { Listing } from '@/types/listing';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DEFAULT_LISTING } from './constants';

// Define ListingEditorProps interface for passing initial data and id for editing
interface ListingEditorProps {
  initialData?: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  listingId?: string;
}

export default function ListingEditor({ 
  initialData = DEFAULT_LISTING,
  listingId
}: ListingEditorProps) {
  const [formData, setFormData] = useState<Omit<Listing, 'id' | 'status' | 'createdAt'>>(initialData);
  
  const isEditing = !!listingId;

  const updateFormData = (
    path: string, 
    value: unknown
  ) => {
    const paths = path.split('.');
    
    setFormData(prev => {
      // For simple paths like 'price'
      if (paths.length === 1) {
        return { ...prev, [path]: value };
      }
      
      // For nested paths like 'website.domain'
      if (paths.length === 2) {
        const [parent, child] = paths;
        const parentObj = prev[parent as keyof typeof prev] as Record<string, unknown>;
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      }
      
      // For deeper paths like 'metrics.dr.value'
      if (paths.length === 3) {
        const [parent, child, subChild] = paths;
        const parentObj = prev[parent as keyof typeof prev] as Record<string, Record<string, unknown>>;
        const childObj = parentObj[child] as Record<string, unknown>;
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: {
              ...childObj,
              [subChild]: value
            }
          }
        };
      }
      
      return prev;
    });
  };

  // Special updates for array manipulations
  const updateArrayField = (
    path: string, 
    operation: 'add' | 'remove' | 'update',
    value: unknown,
    index?: number
  ) => {
    const paths = path.split('.');
    
    setFormData(prev => {
      // For paths like 'niches'
      if (paths.length === 1) {
        const currentArray = [...(prev[path as keyof typeof prev] as unknown[] || [])];
        
        if (operation === 'add') {
          currentArray.push(value);
        } else if (operation === 'remove' && index !== undefined) {
          currentArray.splice(index, 1);
        } else if (operation === 'update' && index !== undefined) {
          currentArray[index] = value;
        }
        
        return { ...prev, [path]: currentArray };
      }
      
      // For nested paths like 'website.tags'
      if (paths.length === 2) {
        const [parent, child] = paths;
        const parentObj = prev[parent as keyof typeof prev] as Record<string, unknown>;
        const currentArray = [...((parentObj[child] as unknown[]) || [])];
        
        if (operation === 'add') {
          currentArray.push(value);
        } else if (operation === 'remove' && index !== undefined) {
          currentArray.splice(index, 1);
        } else if (operation === 'update' && index !== undefined) {
          currentArray[index] = value;
        }
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: currentArray
          }
        };
      }
      
      // For deeper nested paths like 'metrics.countryTraffic'
      if (paths.length === 3) {
        const [parent, child, subChild] = paths;
        const parentObj = prev[parent as keyof typeof prev] as Record<string, Record<string, unknown>>;
        const childObj = parentObj[child];
        const currentArray = [...((childObj[subChild] as unknown[]) || [])];
        
        if (operation === 'add') {
          currentArray.push(value);
        } else if (operation === 'remove' && index !== undefined) {
          currentArray.splice(index, 1);
        } else if (operation === 'update' && index !== undefined) {
          currentArray[index] = value;
        }
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: {
              ...childObj,
              [subChild]: currentArray
            }
          }
        };
      }
      
      return prev;
    });
  };

  // Handle submission of the listing
  const handleSubmitListing = async (data: Omit<Listing, 'id' | 'status' | 'createdAt'>) => {
    try {
      // In a real application, you would make an API call here
      // const endpoint = isEditing 
      //   ? `/api/listings/${listingId}` 
      //   : '/api/listings';
      
      // const method = isEditing ? 'PUT' : 'POST';
      
      // Example API call (commented out for now)
      /*
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save listing');
      }
      
      const result = await response.json();
      */
      
      // For demonstration purposes, we're just delaying with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If editing, you might want to update the local data
      if (isEditing) {
        console.log('Updated listing:', data);
      } else {
        console.log('Created new listing:', data);
      }
      
      // Return success
      return Promise.resolve();
      
    } catch (error) {
      console.error('Error saving listing:', error);
      return Promise.reject(error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <motion.div variants={item}>
            <BasicInfoSection 
              formData={formData} 
              updateFormData={updateFormData}
              updateArrayField={updateArrayField}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ContentSection 
              formData={formData} 
              updateFormData={updateFormData}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <TrafficSection 
              formData={formData} 
              updateFormData={updateFormData}
              updateArrayField={updateArrayField}
            />
          </motion.div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          <motion.div variants={item}>
            <MetricsSection 
              formData={formData} 
              updateFormData={updateFormData}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <NichesSection 
              formData={formData} 
              updateFormData={updateFormData}
              updateArrayField={updateArrayField}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="p-6 border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Publisher Note</h3>
              <textarea
                value={formData.publisherNote || ''}
                onChange={(e) => updateFormData('publisherNote', e.target.value)}
                placeholder="Add details about special requirements or notes for publishers..."
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50">
              <h3 className="text-lg font-semibold text-amber-800">Preview Your Listing</h3>
              <p className="text-amber-700 mt-2">
                As you fill in the form, you&apos;ll see a live preview of how your listing will appear in the marketplace.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4 border border-amber-200 overflow-hidden">
                <div className="font-bold text-lg">{formData.website.domain || 'example.com'}</div>
                <div className="mt-2 text-sm text-gray-600">
                  <div><span className="font-medium">DA:</span> {formData.metrics.da}</div>
                  <div><span className="font-medium">DR:</span> {formData.metrics.dr.value}</div>
                  <div><span className="font-medium">Traffic:</span> {formData.metrics.traffic.toLocaleString()}</div>
                </div>
                <div className="mt-2 font-bold text-indigo-600">${formData.price}</div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <SubmitSection 
              formData={formData}
              onSubmit={handleSubmitListing}
              isEditing={isEditing}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 