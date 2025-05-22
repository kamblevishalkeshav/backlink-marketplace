'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Listing } from '@/types/listing';
import { Calendar, DollarSign, FilePenLine, GanttChart, Send } from 'lucide-react';

interface ContentSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
}

export default function ContentSection({ formData, updateFormData }: ContentSectionProps) {
  const handleListingTypeChange = (type: string) => {
    updateFormData({
      type: {
        ...formData.type,
        listingType: type as 'guest-post' | 'innerpage-link' | 'homepage-link' | 'sitewide-link'
      }
    });
  };
  
  const handlePermanentChange = (permanent: boolean) => {
    const updatedType = {
      ...formData.type,
      permanent
    };
    
    // If not permanent, ensure we have a default month value
    if (!permanent && !updatedType.months) {
      updatedType.months = 1;
    }
    
    updateFormData({ type: updatedType });
  };
  
  const handleContentWriterChange = (value: string) => {
    updateFormData({
      type: {
        ...formData.type,
        contentWriter: value as 'buyer' | 'publisher' | 'both'
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Content & Pricing</h2>
        <p className="text-gray-500">
          Define what type of content you offer and your pricing structure.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium flex items-center mb-3">
              <FilePenLine className="h-5 w-5 text-indigo-600 mr-2" />
              Listing Type
            </Label>
            
            <RadioGroup
              value={formData.type.listingType}
              onValueChange={handleListingTypeChange}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <RadioGroupItem value="guest-post" id="guest-post" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="guest-post" className="font-medium">Guest Post</Label>
                  <p className="text-sm text-gray-500">
                    A full article published on the website with backlinks included.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <RadioGroupItem value="innerpage-link" id="innerpage-link" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="innerpage-link" className="font-medium">Inner Page Link</Label>
                  <p className="text-sm text-gray-500">
                    A backlink placed in an existing article on an inner page.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <RadioGroupItem value="homepage-link" id="homepage-link" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="homepage-link" className="font-medium">Homepage Link</Label>
                  <p className="text-sm text-gray-500">
                    A backlink placed directly on the website&apos;s homepage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <RadioGroupItem value="sitewide-link" id="sitewide-link" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="sitewide-link" className="font-medium">Sitewide Link</Label>
                  <p className="text-sm text-gray-500">
                    A backlink that appears on all pages of the website (footer, sidebar, etc.).
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center mb-3">
              <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
              Link Duration
            </Label>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="permanent-toggle" className="font-medium">Permanent Link</Label>
                <p className="text-sm text-gray-500">
                  The link will remain on the site indefinitely.
                </p>
              </div>
              <Switch
                id="permanent-toggle"
                checked={formData.type.permanent}
                onCheckedChange={handlePermanentChange}
              />
            </div>
            
            {!formData.type.permanent && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="months" className="font-medium">Duration in Months</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="months"
                    type="number"
                    min="1"
                    max="36"
                    value={formData.type.months || 1}
                    onChange={(e) => updateFormData({
                      type: {
                        ...formData.type,
                        months: parseInt(e.target.value) || 1
                      }
                    })}
                    className="w-24"
                  />
                  <span className="text-gray-500">months</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center mb-3">
              <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
              Pricing
            </Label>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <Label htmlFor="price" className="font-medium">Price</Label>
              <div className="flex items-center mt-2">
                <span className="bg-gray-200 flex items-center justify-center h-10 px-3 rounded-l-md">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => updateFormData({
                    price: parseFloat(e.target.value) || 0
                  })}
                  className="rounded-l-none"
                  placeholder="0.00"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Set a competitive price for your listing type and metrics.
              </p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <Label htmlFor="offer-rate" className="font-medium">Offer Discount</Label>
              <div className="flex items-center mt-2">
                <Input
                  id="offer-rate"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.offerRate || ''}
                  onChange={(e) => updateFormData({
                    offerRate: parseFloat(e.target.value) || 0
                  })}
                  className="w-24"
                />
                <span className="ml-2 text-gray-500">%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Optional discount for bulk orders (leave empty for no discount).
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center mb-3">
              <Send className="h-5 w-5 text-indigo-600 mr-2" />
              Content Details
            </Label>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <Label htmlFor="content-writer" className="font-medium">Who Provides the Content</Label>
              <Select
                value={formData.type.contentWriter || ''}
                onValueChange={handleContentWriterChange}
              >
                <SelectTrigger id="content-writer" className="mt-2">
                  <SelectValue placeholder="Select who writes the content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer Provides Content</SelectItem>
                  <SelectItem value="publisher">You Provide Content</SelectItem>
                  <SelectItem value="both">Either Option Available</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Specify who will be responsible for creating the content.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="word-count" className="font-medium">Word Count</Label>
                <Input
                  id="word-count"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.type.wordCount || ''}
                  onChange={(e) => updateFormData({
                    type: {
                      ...formData.type,
                      wordCount: parseInt(e.target.value) || 0
                    }
                  })}
                  className="mt-2"
                  placeholder="e.g., 1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For guest posts
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="working-days" className="font-medium">
                  <div className="flex items-center">
                    <GanttChart className="h-4 w-4 text-indigo-600 mr-1" />
                    Turnaround
                  </div>
                </Label>
                <div className="flex items-center mt-2">
                  <Input
                    id="working-days"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.type.workingDays || ''}
                    onChange={(e) => updateFormData({
                      type: {
                        ...formData.type,
                        workingDays: parseInt(e.target.value) || 1
                      }
                    })}
                    className="w-20"
                  />
                  <span className="ml-2 text-gray-500">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 