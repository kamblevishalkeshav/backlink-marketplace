'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ContentAcceptanceStatus, Listing } from '@/types/listing';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

// Default empty listing for new entries
const DEFAULT_LISTING: Omit<Listing, 'id' | 'status' | 'createdAt'> = {
  price: 0,
  website: {
    domain: '',
    verified: false,
    tags: [],
  },
  type: {
    listingType: 'guest-post',
    permanent: true,
    months: 0,
    wordCount: 500,
    workingDays: 3,
    contentWriter: 'both',
  },
  approx: {
    workingDays: 3,
  },
  language: {
    primary: 'English',
    native: 'English',
  },
  category: '',
  metrics: {
    countryCode: 'US',
    countryTraffic: [],
    dr: {
      value: 0,
      percentage: '+0%',
    },
    da: 0,
    as: 0,
    traffic: 0,
    keywords: 0,
    refDomains: 0,
  },
  niches: [],
  acceptedContent: {
    casino: 'not-accepted',
    finance: 'not-accepted',
    erotic: 'not-accepted',
    dating: 'not-accepted',
    crypto: 'not-accepted',
    cbd: 'not-accepted',
    medicine: 'not-accepted',
  },
};

interface ListingFormProps {
  listing?: Listing;
  onSave: (listing: Omit<Listing, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function ListingForm({ listing, onSave, onCancel }: ListingFormProps) {
  const [formData, setFormData] = useState<Omit<Listing, 'id' | 'status' | 'createdAt'>>(
    DEFAULT_LISTING
  );
  const [tagInput, setTagInput] = useState('');
  const [nicheInput, setNicheInput] = useState('');
  const [countryInput, setCountryInput] = useState({
    code: '',
    percentage: 0,
  });

  // Initialize form data if editing an existing listing
  useEffect(() => {
    if (listing) {
      // Remove id, status, and createdAt as they will be handled elsewhere
      const { id, status, createdAt, ...restData } = listing;
      setFormData(restData);
    }
  }, [listing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');
      
      if (subChild) {
        // Handle deep nested properties like metrics.dr.value
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: {
              ...(formData[parent as keyof typeof formData] as any)[child],
              [subChild]: value,
            },
          },
        });
      } else {
        // Handle properties like website.domain
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: value,
          },
        });
      }
    } else {
      // Handle top-level properties
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    path: string
  ) => {
    const value = parseInt(e.target.value) || 0;
    
    if (path.includes('.')) {
      const [parent, child, subChild] = path.split('.');
      
      if (subChild) {
        // Handle deep nested properties
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: {
              ...(formData[parent as keyof typeof formData] as any)[child],
              [subChild]: value,
            },
          },
        });
      } else {
        // Handle properties like website.domain
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: value,
          },
        });
      }
    } else {
      // Handle top-level properties
      setFormData({
        ...formData,
        [path]: value,
      });
    }
  };

  const handleSwitchChange = (checked: boolean, path: string) => {
    if (path.includes('.')) {
      const [parent, child] = path.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [path]: checked,
      });
    }
  };

  const handleSelectChange = (value: string, path: string) => {
    if (path.includes('.')) {
      const [parent, child, subChild] = path.split('.');
      
      if (subChild) {
        // Handle properties like acceptedContent.casino
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: {
              ...(formData[parent as keyof typeof formData] as any)[child],
              [subChild]: value as ContentAcceptanceStatus,
            },
          },
        });
      } else {
        // Handle properties like type.contentWriter
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent as keyof typeof formData],
            [child]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [path]: value,
      });
    }
  };

  const addTag = () => {
    if (tagInput && !formData.website.tags?.includes(tagInput)) {
      setFormData({
        ...formData,
        website: {
          ...formData.website,
          tags: [...(formData.website.tags || []), tagInput],
        },
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      website: {
        ...formData.website,
        tags: formData.website.tags?.filter((t) => t !== tag) || [],
      },
    });
  };

  const addNiche = () => {
    if (nicheInput && !formData.niches.includes(nicheInput)) {
      setFormData({
        ...formData,
        niches: [...formData.niches, nicheInput],
      });
      setNicheInput('');
    }
  };

  const removeNiche = (niche: string) => {
    setFormData({
      ...formData,
      niches: formData.niches.filter((n) => n !== niche),
    });
  };

  const addCountryTraffic = () => {
    if (countryInput.code && countryInput.percentage > 0) {
      // Check if the country already exists
      const existingIndex = formData.metrics.countryTraffic?.findIndex(
        (c) => c.countryCode === countryInput.code
      );

      if (existingIndex !== undefined && existingIndex >= 0 && formData.metrics.countryTraffic) {
        // Update existing country
        const updatedCountries = [...(formData.metrics.countryTraffic || [])];
        updatedCountries[existingIndex] = {
          countryCode: countryInput.code,
          percentage: countryInput.percentage / 100,
          traffic: Math.round((countryInput.percentage / 100) * formData.metrics.traffic),
        };

        setFormData({
          ...formData,
          metrics: {
            ...formData.metrics,
            countryTraffic: updatedCountries,
          },
        });
      } else {
        // Add new country
        setFormData({
          ...formData,
          metrics: {
            ...formData.metrics,
            countryTraffic: [
              ...(formData.metrics.countryTraffic || []),
              {
                countryCode: countryInput.code,
                percentage: countryInput.percentage / 100,
                traffic: Math.round((countryInput.percentage / 100) * formData.metrics.traffic),
              },
            ],
          },
        });
      }

      setCountryInput({ code: '', percentage: 0 });
    }
  };

  const removeCountryTraffic = (code: string) => {
    setFormData({
      ...formData,
      metrics: {
        ...formData.metrics,
        countryTraffic: formData.metrics.countryTraffic?.filter(
          (c) => c.countryCode !== code
        ) || [],
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div>
            <Label htmlFor="website.domain">Domain</Label>
            <Input
              id="website.domain"
              name="website.domain"
              value={formData.website.domain}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="website.verified"
              checked={formData.website.verified}
              onCheckedChange={(checked) => handleSwitchChange(checked, 'website.verified')}
            />
            <Label htmlFor="website.verified">Verified Website</Label>
          </div>
          
          <div>
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={formData.price}
              onChange={(e) => handleNumberInputChange(e, 'price')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="offerRate">Discount Rate (%)</Label>
            <Input
              id="offerRate"
              type="number"
              min={0}
              max={100}
              value={formData.offerRate || 0}
              onChange={(e) => handleNumberInputChange(e, 'offerRate')}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Tags Section */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
              />
              <Button type="button" onClick={addTag} size="sm">
                Add
              </Button>
            </div>
            
            {formData.website.tags && formData.website.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.website.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto ml-1"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Content Type Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Content Type</h3>
          
          <div>
            <Label htmlFor="type.listingType">Listing Type</Label>
            <select
              id="type.listingType"
              value={formData.type.listingType}
              onChange={(e) => handleSelectChange(e.target.value, 'type.listingType')}
              className="w-full p-2 border rounded"
              required
            >
              <option value="guest-post">Guest Post</option>
              <option value="homepage-link">Homepage Link</option>
              <option value="innerpage-link">Innerpage Link</option>
              <option value="sitewide-link">Sitewide Link</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              id="type.permanent"
              checked={formData.type.permanent}
              onCheckedChange={(checked) => handleSwitchChange(checked, 'type.permanent')}
            />
            <Label htmlFor="type.permanent">Permanent Link</Label>
          </div>
          
          {!formData.type.permanent && (
            <div>
              <Label htmlFor="type.months">Months</Label>
              <Input
                id="type.months"
                type="number"
                min={1}
                value={formData.type.months || 1}
                onChange={(e) => handleNumberInputChange(e, 'type.months')}
                required={!formData.type.permanent}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="type.workingDays">Working Days</Label>
            <Input
              id="type.workingDays"
              type="number"
              min={1}
              value={formData.type.workingDays}
              onChange={(e) => handleNumberInputChange(e, 'type.workingDays')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type.wordCount">Word Count</Label>
            <Input
              id="type.wordCount"
              type="number"
              min={1}
              value={formData.type.wordCount}
              onChange={(e) => handleNumberInputChange(e, 'type.wordCount')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type.contentWriter">Content Writer</Label>
            <select
              id="type.contentWriter"
              value={formData.type.contentWriter}
              onChange={(e) => handleSelectChange(e.target.value, 'type.contentWriter')}
              className="w-full p-2 border rounded"
              required
            >
              <option value="both">Both</option>
              <option value="you">You</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="approx.workingDays">Approx. TAT (days)</Label>
            <Input
              id="approx.workingDays"
              type="number"
              min={1}
              value={formData.approx.workingDays}
              onChange={(e) => handleNumberInputChange(e, 'approx.workingDays')}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Language</h3>
          
          <div>
            <Label htmlFor="language.primary">Primary Language</Label>
            <Input
              id="language.primary"
              name="language.primary"
              value={formData.language.primary}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="language.native">Native Language</Label>
            <Input
              id="language.native"
              name="language.native"
              value={formData.language.native}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="language.extra">Additional Language Notes</Label>
            <Input
              id="language.extra"
              name="language.extra"
              value={formData.language.extra || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        {/* Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Metrics</h3>
          
          <div>
            <Label htmlFor="metrics.dr.value">Domain Rating (DR)</Label>
            <Input
              id="metrics.dr.value"
              type="number"
              min={0}
              max={100}
              value={formData.metrics.dr.value}
              onChange={(e) => handleNumberInputChange(e, 'metrics.dr.value')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.dr.percentage">DR Change</Label>
            <Input
              id="metrics.dr.percentage"
              name="metrics.dr.percentage"
              value={formData.metrics.dr.percentage}
              onChange={handleInputChange}
              placeholder="+5%"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.da">Domain Authority (DA)</Label>
            <Input
              id="metrics.da"
              type="number"
              min={0}
              max={100}
              value={formData.metrics.da}
              onChange={(e) => handleNumberInputChange(e, 'metrics.da')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.as">Authority Score (AS)</Label>
            <Input
              id="metrics.as"
              type="number"
              min={0}
              max={100}
              value={formData.metrics.as}
              onChange={(e) => handleNumberInputChange(e, 'metrics.as')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.traffic">Monthly Traffic</Label>
            <Input
              id="metrics.traffic"
              type="number"
              min={0}
              value={formData.metrics.traffic}
              onChange={(e) => handleNumberInputChange(e, 'metrics.traffic')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.keywords">Keywords</Label>
            <Input
              id="metrics.keywords"
              type="number"
              min={0}
              value={formData.metrics.keywords}
              onChange={(e) => handleNumberInputChange(e, 'metrics.keywords')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics.refDomains">Referring Domains</Label>
            <Input
              id="metrics.refDomains"
              type="number"
              min={0}
              value={formData.metrics.refDomains}
              onChange={(e) => handleNumberInputChange(e, 'metrics.refDomains')}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country Traffic */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Country Traffic</h3>
          
          <div>
            <Label htmlFor="metrics.countryCode">Primary Country</Label>
            <Input
              id="metrics.countryCode"
              name="metrics.countryCode"
              value={formData.metrics.countryCode}
              onChange={handleInputChange}
              placeholder="US"
              maxLength={2}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Traffic Distribution</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Country Code (e.g., US)"
                maxLength={2}
                value={countryInput.code}
                onChange={(e) => setCountryInput({ ...countryInput, code: e.target.value.toUpperCase() })}
                className="w-24"
              />
              <Input
                type="number"
                placeholder="Percentage"
                min={1}
                max={100}
                value={countryInput.percentage || ''}
                onChange={(e) => setCountryInput({ ...countryInput, percentage: parseInt(e.target.value) || 0 })}
              />
              <Button type="button" onClick={addCountryTraffic} size="sm">
                Add
              </Button>
            </div>
            
            {formData.metrics.countryTraffic && formData.metrics.countryTraffic.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.metrics.countryTraffic.map((country) => (
                  <div
                    key={country.countryCode}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>
                      {country.countryCode}: {(country.percentage * 100).toFixed(0)}% 
                      ({country.traffic.toLocaleString()} visits)
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={() => removeCountryTraffic(country.countryCode)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Niches */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Niches</h3>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add a niche"
                value={nicheInput}
                onChange={(e) => setNicheInput(e.target.value)}
              />
              <Button type="button" onClick={addNiche} size="sm">
                Add
              </Button>
            </div>
            
            {formData.niches.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.niches.map((niche) => (
                  <div
                    key={niche}
                    className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {niche}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto ml-1"
                      onClick={() => removeNiche(niche)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Accepted Content Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Accepted Content Types</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(formData.acceptedContent || {}).map(([key, value]) => (
            <div key={key} className="p-4 border rounded">
              <Label htmlFor={`acceptedContent.${key}`} className="capitalize">
                {key}
              </Label>
              <select
                id={`acceptedContent.${key}`}
                value={value}
                onChange={(e) => 
                  handleSelectChange(
                    e.target.value as ContentAcceptanceStatus, 
                    `acceptedContent.${key}`
                  )
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="accepted">Accepted</option>
                <option value="not-accepted">Not Accepted</option>
                <option value="prohibited">Prohibited</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      
      {/* Publisher Note */}
      <div>
        <Label htmlFor="publisherNote">Publisher Note</Label>
        <Textarea
          id="publisherNote"
          name="publisherNote"
          value={formData.publisherNote || ''}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Listing</Button>
      </div>
    </form>
  );
} 