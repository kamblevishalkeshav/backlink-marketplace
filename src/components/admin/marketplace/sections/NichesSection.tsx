'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Listing } from '@/types/listing';
import { CheckCircle2, Tag, X } from 'lucide-react';
import { useState } from 'react';

interface NichesSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
}

// Common niches for websites
const commonNiches = [
  'Technology',
  'Health',
  'Finance',
  'Travel',
  'Food',
  'Fashion',
  'Entertainment',
  'Education',
  'Sports',
  'Business',
  'Marketing',
  'Lifestyle',
  'Science',
  'Home & Garden',
  'Parenting',
  'Automotive',
  'Real Estate',
  'Art & Design',
  'Gaming',
  'Beauty',
];

export default function NichesSection({ formData, updateFormData }: NichesSectionProps) {
  const [customNiche, setCustomNiche] = useState('');
  
  const handleAddNiche = (niche: string) => {
    if (!niche || formData.niches.includes(niche)) return;
    
    updateFormData({
      niches: [...formData.niches, niche]
    });
    
    setCustomNiche('');
  };
  
  const handleRemoveNiche = (niche: string) => {
    updateFormData({
      niches: formData.niches.filter(n => n !== niche)
    });
  };
  
  const handleAcceptanceChange = (niche: string, status: 'accepted' | 'not-accepted' | 'prohibited') => {
    updateFormData({
      acceptedContent: {
        ...formData.acceptedContent,
        [niche]: status
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Website Niches</h2>
        <p className="text-gray-500">
          Select the niches that best describe your website and specify what content you accept.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center">
              <Tag className="h-5 w-5 text-indigo-600 mr-2" />
              Website Niches
            </h3>
            <span className="text-sm text-gray-500">
              {formData.niches.length} selected
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.niches.length > 0 ? (
              formData.niches.map((niche) => (
                <Badge key={niche} variant="secondary" className="px-3 py-1 text-sm">
                  {niche}
                  <button
                    onClick={() => handleRemoveNiche(niche)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No niches selected yet. Add some to improve your listing visibility.</p>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="common-niches" className="text-sm font-medium">
                Select from common niches
              </Label>
              <Select
                onValueChange={(value) => handleAddNiche(value)}
                value=""
              >
                <SelectTrigger id="common-niches" className="w-full">
                  <SelectValue placeholder="Select a niche" />
                </SelectTrigger>
                <SelectContent>
                  {commonNiches.map((niche) => (
                    <SelectItem 
                      key={niche} 
                      value={niche}
                      disabled={formData.niches.includes(niche)}
                    >
                      {niche}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="custom-niche" className="text-sm font-medium">
                Or add a custom niche
              </Label>
              <div className="flex gap-2">
                <Input
                  id="custom-niche"
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  placeholder="Enter a custom niche"
                  className="flex-1"
                />
                <Button
                  onClick={() => handleAddNiche(customNiche)}
                  disabled={!customNiche || formData.niches.includes(customNiche)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium">Accepted Content</h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Specify what types of content you accept on your website. This helps to match you with relevant buyers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['casino', 'finance', 'erotic', 'dating', 'crypto', 'cbd', 'medicine'] as const).map((niche) => (
              <div key={niche} className="space-y-2 bg-gray-50 p-3 rounded-lg">
                <Label htmlFor={`niche-${niche}`} className="text-sm font-medium capitalize flex items-center">
                  <span className="w-2 h-2 rounded-full mr-1.5 bg-indigo-400"></span>
                  {niche}
                </Label>
                <Select
                  value={formData.acceptedContent?.[niche] || 'not-accepted'}
                  onValueChange={(value) => handleAcceptanceChange(niche, value as 'accepted' | 'not-accepted' | 'prohibited')}
                >
                  <SelectTrigger id={`niche-${niche}`} className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="not-accepted">Not Accepted</SelectItem>
                    <SelectItem value="prohibited">Prohibited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg mt-6">
            <h4 className="text-sm font-medium mb-2">What These Settings Mean</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 font-medium mr-2">Accepted:</span>
                <span>You welcome this type of content on your website.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 font-medium mr-2">Not Accepted:</span>
                <span>You don&apos;t typically publish this content but may consider it case-by-case.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-medium mr-2">Prohibited:</span>
                <span>You absolutely do not accept this type of content under any circumstances.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 