'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Listing } from '@/types/listing';
import { AlertCircle, CheckCircle, DollarSign, Globe, LinkIcon, TagIcon } from 'lucide-react';
import { Control } from 'react-hook-form';

interface SubmitSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
  control: Control<Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>>;
}

export default function SubmitSection({ formData, updateFormData, control }: SubmitSectionProps) {
  // Calculate estimated monthly revenue
  const estimatedRevenue = Math.round(formData.price * 0.7); // 70% of listing price goes to publisher
  
  const getStatusColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-gray-600';
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Listing</h2>
        <p className="text-gray-500">
          Review your listing details before submission. Once submitted, your listing will be reviewed by our team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview Card */}
        <Card className="p-6 bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <LinkIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{formData.website.domain}</h3>
                <div className="flex items-center mt-1">
                  {formData.website.verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mr-2">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {formData.type.listingType.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-indigo-600">${formData.price}</div>
              {formData.offerRate && (
                <Badge className="bg-green-100 text-green-700 mt-1">
                  {formData.offerRate}% OFF
                </Badge>
              )}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
              <p className="font-medium">{formData.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Language</h4>
              <p className="font-medium">{formData.language.primary}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Content Type</h4>
              <p className="font-medium capitalize">
                {formData.type.permanent 
                  ? 'Permanent' 
                  : `${formData.type.months} month${formData.type.months !== 1 ? 's' : ''}`}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Content Writer</h4>
              <p className="font-medium capitalize">
                {formData.type.contentWriter === 'buyer' 
                  ? 'Buyer provides' 
                  : formData.type.contentWriter === 'publisher' 
                    ? 'Publisher writes' 
                    : 'Either option'}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Metrics</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500">DA</div>
                <div className={`text-xl font-bold ${getStatusColor(formData.metrics.da, 100)}`}>
                  {formData.metrics.da}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500">DR</div>
                <div className={`text-xl font-bold ${getStatusColor(formData.metrics.dr.value, 100)}`}>
                  {formData.metrics.dr.value}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500">Traffic</div>
                <div className="text-xl font-bold text-indigo-600">
                  {(formData.metrics.traffic/1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Niches</h4>
            <div className="flex flex-wrap gap-2">
              {formData.niches.map((niche, index) => (
                <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700">
                  {niche}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Estimated Monthly Revenue</div>
                <div className="text-lg font-bold text-green-600">${estimatedRevenue}</div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Stats & Terms */}
        <div className="space-y-6">
          <Card className="p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Listing Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Traffic Rank</span>
                </div>
                <Badge className="bg-indigo-50 text-indigo-700">
                  Top {formData.metrics.traffic > 50000 ? '10%' : '25%'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Niche Category</span>
                </div>
                <Badge className="bg-indigo-50 text-indigo-700">
                  {formData.category}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Price Range</span>
                </div>
                <Badge className={`${
                  formData.price < 100 
                    ? 'bg-green-50 text-green-700' 
                    : formData.price < 250 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'bg-red-50 text-red-700'
                }`}>
                  {formData.price < 100 
                    ? 'Budget' 
                    : formData.price < 250 
                      ? 'Standard' 
                      : 'Premium'}
                </Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border border-gray-100">
            <div className="flex items-start mb-4">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold">Before You Submit</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Please ensure all information is accurate. Listings with incorrect information may be rejected.
                </p>
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              <FormField
                control={control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2">
                    <FormControl>
                      <Checkbox 
                        id="terms"
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                      </FormLabel>
                      <p className="text-sm text-gray-500">
                        By submitting, you confirm all information is accurate and meets our quality standards.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="notificationsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Switch 
                        id="notifications"
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="notifications">Receive email notifications for this listing</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 