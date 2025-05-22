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
import { Check, Globe, Plus, Tag, X } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';

interface BasicInfoSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
}

// Common website tags
const commonTags = [
  'Technology',
  'Health',
  'Finance',
  'Marketing',
  'Education',
  'News',
  'Blog',
  'E-commerce',
  'Portfolio',
  'Non-profit',
  'Government',
  'Entertainment'
];

export default function BasicInfoSection({ formData, updateFormData }: BasicInfoSectionProps) {
  const [tagInput, setTagInput] = useState('');
  
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };
  
  const addTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (!normalizedTag) return;
    
    // Don't add if it already exists
    if (formData.website.tags?.includes(normalizedTag)) return;
    
    updateFormData({
      website: {
        ...formData.website,
        tags: [...(formData.website.tags || []), normalizedTag]
      }
    });
    
    setTagInput('');
  };
  
  const removeTag = (tagToRemove: string) => {
    updateFormData({
      website: {
        ...formData.website,
        tags: formData.website.tags?.filter(tag => tag !== tagToRemove)
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-500">
          Provide essential details about your website.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <Label htmlFor="domain" className="text-base font-medium flex items-center">
              <Globe className="h-5 w-5 text-indigo-600 mr-2" />
              Website Domain
            </Label>
            <div className="mt-2">
              <Input
                id="domain"
                placeholder="example.com"
                value={formData.website.domain}
                onChange={(e) => updateFormData({
                  website: {
                    ...formData.website,
                    domain: e.target.value
                  }
                })}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your website domain without http:// or www.
              </p>
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium flex items-center">
              <Tag className="h-5 w-5 text-indigo-600 mr-2" />
              Website Tags
            </Label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {formData.website.tags && formData.website.tags.length > 0 ? (
                  formData.website.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No tags added yet</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => addTag(tagInput)}
                  disabled={!tagInput.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Popular tags:</p>
                <div className="flex flex-wrap gap-1.5">
                  {commonTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className={`cursor-pointer ${
                        formData.website.tags?.includes(tag.toLowerCase()) 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                          : ''
                      }`}
                      onClick={() => addTag(tag)}
                    >
                      {formData.website.tags?.includes(tag.toLowerCase()) && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-5">
          <div>
            <Label htmlFor="primary-language" className="text-base font-medium">
              Primary Language
            </Label>
            <Select
              value={formData.language.primary}
              onValueChange={(value) => updateFormData({
                language: {
                  ...formData.language,
                  primary: value
                }
              })}
            >
              <SelectTrigger id="primary-language" className="w-full mt-2">
                <SelectValue placeholder="Select primary language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="native-language" className="text-base font-medium">
              Is the site written by native speakers?
            </Label>
            <Select
              value={formData.language.native}
              onValueChange={(value) => updateFormData({
                language: {
                  ...formData.language,
                  native: value
                }
              })}
            >
              <SelectTrigger id="native-language" className="w-full mt-2">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, native speakers</SelectItem>
                <SelectItem value="no">No, non-native speakers</SelectItem>
                <SelectItem value="mixed">Mixed (native and non-native)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category" className="text-base font-medium">
              Website Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateFormData({ category: value })}
            >
              <SelectTrigger id="category" className="w-full mt-2">
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health & Fitness</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food & Cooking</SelectItem>
                <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="news">News & Media</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="arts">Arts & Culture</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
} 