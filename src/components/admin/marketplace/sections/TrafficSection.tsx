'use client';

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
import { BarChart3, Globe, Trash2 } from 'lucide-react';

interface TrafficSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
}

export default function TrafficSection({ formData, updateFormData }: TrafficSectionProps) {
  const handleAddCountry = () => {
    if (!formData.metrics.countryTraffic) {
      updateFormData({
        metrics: {
          ...formData.metrics,
          countryTraffic: [{ countryCode: '', percentage: 0 }]
        }
      });
      return;
    }
    
    if (formData.metrics.countryTraffic.length < 5) {
      updateFormData({
        metrics: {
          ...formData.metrics,
          countryTraffic: [
            ...formData.metrics.countryTraffic,
            { countryCode: '', percentage: 0 }
          ]
        }
      });
    }
  };
  
  const handleRemoveCountry = (index: number) => {
    if (formData.metrics.countryTraffic) {
      const updatedCountries = [...formData.metrics.countryTraffic];
      updatedCountries.splice(index, 1);
      
      updateFormData({
        metrics: {
          ...formData.metrics,
          countryTraffic: updatedCountries
        }
      });
    }
  };
  
  const handleCountryChange = (index: number, field: 'countryCode' | 'percentage', value: string | number) => {
    if (formData.metrics.countryTraffic) {
      const updatedCountries = [...formData.metrics.countryTraffic];
      updatedCountries[index] = {
        ...updatedCountries[index],
        [field]: value
      };
      
      updateFormData({
        metrics: {
          ...formData.metrics,
          countryTraffic: updatedCountries
        }
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Traffic Distribution</h2>
        <p className="text-gray-500">
          Provide details about your website&apos;s traffic sources and audience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BarChart3 className="h-5 w-5 text-indigo-600 mr-2" />
            <Label htmlFor="traffic" className="text-base font-medium">
              Monthly Traffic
            </Label>
          </div>
          <Input
            id="traffic"
            type="number"
            value={formData.metrics.traffic || ''}
            onChange={(e) => updateFormData({
              metrics: {
                ...formData.metrics,
                traffic: parseInt(e.target.value) || 0
              }
            })}
            placeholder="e.g., 15000"
            className="w-full"
            min="0"
          />
          <p className="text-xs text-gray-500 mt-1">
            Estimated monthly visitors based on analytics
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Globe className="h-5 w-5 text-indigo-600 mr-2" />
            <Label htmlFor="countryCode" className="text-base font-medium">
              Primary Country
            </Label>
          </div>
          <Select
            value={formData.metrics.countryCode || ''}
            onValueChange={(value) => updateFormData({
              metrics: {
                ...formData.metrics,
                countryCode: value
              }
            })}
          >
            <SelectTrigger id="countryCode" className="w-full">
              <SelectValue placeholder="Select primary country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
              <SelectItem value="DE">Germany</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="ES">Spain</SelectItem>
              <SelectItem value="IT">Italy</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="JP">Japan</SelectItem>
              <SelectItem value="BR">Brazil</SelectItem>
              <SelectItem value="Global">Global (No specific country)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Country with majority of the traffic
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Globe className="h-5 w-5 text-indigo-600 mr-2" />
            Country Distribution
          </h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddCountry}
            disabled={formData.metrics.countryTraffic?.length === 5}
          >
            Add Country
          </Button>
        </div>
        
        <div className="space-y-4">
          {!formData.metrics.countryTraffic || formData.metrics.countryTraffic.length === 0 && (
            <p className="text-sm text-gray-500">Add country traffic distributions to highlight your site&apos;s global reach.</p>
          )}
          
          {formData.metrics.countryTraffic?.map((country, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 items-center">
              <div className="col-span-2">
                <Label htmlFor={`country-${index}`} className="sr-only">Country</Label>
                <Select
                  value={country.countryCode}
                  onValueChange={(value) => handleCountryChange(index, 'countryCode', value)}
                >
                  <SelectTrigger id={`country-${index}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor={`percentage-${index}`} className="sr-only">Percentage</Label>
                <Input
                  id={`percentage-${index}`}
                  type="number"
                  min="1"
                  max="100"
                  value={country.percentage || ''}
                  onChange={(e) => handleCountryChange(index, 'percentage', parseInt(e.target.value) || 0)}
                  placeholder="% of traffic"
                />
              </div>
              
              <div className="col-span-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveCountry(index)}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {formData.metrics.countryTraffic && formData.metrics.countryTraffic.length > 0 && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Traffic Distribution</span>
              <span>Total: {formData.metrics.countryTraffic?.reduce((sum, item) => sum + (item.percentage || 0), 0)}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              {formData.metrics.countryTraffic?.map((country, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
                return (
                  <div 
                    key={index}
                    className={`h-full float-left ${colors[index % colors.length]}`}
                    style={{ width: `${country.percentage || 0}%` }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 