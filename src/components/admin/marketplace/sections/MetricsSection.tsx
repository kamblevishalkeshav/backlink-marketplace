'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Listing } from '@/types/listing';
import { BarChart2, Globe, Link2, Search } from 'lucide-react';
import Image from 'next/image';

interface MetricsSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
}

export default function MetricsSection({ formData, updateFormData }: MetricsSectionProps) {
  
  const handleDrChange = (value: number) => {
    updateFormData({
      metrics: {
        ...formData.metrics,
        dr: {
          ...formData.metrics.dr,
          value
        }
      }
    });
  };
  
  const handleDrPercentageChange = (percentage: string) => {
    updateFormData({
      metrics: {
        ...formData.metrics,
        dr: {
          ...formData.metrics.dr,
          percentage
        }
      }
    });
  };
  
  const handleMetricsChange = (field: string, value: number) => {
    updateFormData({
      metrics: {
        ...formData.metrics,
        [field]: value
      }
    });
  };
  
  const getMetricColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-green-500";
    if (value >= 40) return "text-amber-500";
    if (value >= 20) return "text-amber-400";
    return "text-gray-500";
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Website Metrics</h2>
        <p className="text-gray-500">
          Provide key metrics for your website to help buyers understand its value.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Domain Rating (DR) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-20 h-8">
                  <Image 
                    src="/images/seo-logos/ahrefs-logo.svg" 
                    alt="Ahrefs"
                    width={80}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <Label htmlFor="dr" className="text-base">Domain Rating (DR)</Label>
              </div>
              <span className={`text-xl font-bold ${getMetricColor(formData.metrics.dr.value)}`}>
                {formData.metrics.dr.value}
              </span>
            </div>
            <Slider
              id="dr"
              min={0}
              max={100}
              step={1}
              value={[formData.metrics.dr.value]}
              onValueChange={(values) => handleDrChange(values[0])}
              className="py-4"
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="dr-trend" className="text-sm">Trend</Label>
              <Select
                value={formData.metrics.dr.percentage || ''}
                onValueChange={handleDrPercentageChange}
              >
                <SelectTrigger id="dr-trend" className="w-32">
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+5%">+5%</SelectItem>
                  <SelectItem value="+10%">+10%</SelectItem>
                  <SelectItem value="+15%">+15%</SelectItem>
                  <SelectItem value="0%">Stable (0%)</SelectItem>
                  <SelectItem value="-5%">-5%</SelectItem>
                  <SelectItem value="-10%">-10%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Domain Authority (DA) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-20 h-8">
                  <Image 
                    src="/images/seo-logos/moz-logo.svg" 
                    alt="Moz" 
                    width={80}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <Label htmlFor="da" className="text-base">Domain Authority (DA)</Label>
              </div>
              <span className={`text-xl font-bold ${getMetricColor(formData.metrics.da)}`}>
                {formData.metrics.da}
              </span>
            </div>
            <Slider
              id="da"
              min={0}
              max={100}
              step={1}
              value={[formData.metrics.da]}
              onValueChange={(values) => handleMetricsChange('da', values[0])}
              className="py-4"
            />
          </div>
          
          {/* Authority Score (AS) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-20 h-8">
                  <Image 
                    src="/images/seo-logos/semrush-logo.svg" 
                    alt="Semrush" 
                    width={80}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <Label htmlFor="as" className="text-base">Authority Score (AS)</Label>
              </div>
              <span className={`text-xl font-bold ${getMetricColor(formData.metrics.as)}`}>
                {formData.metrics.as}
              </span>
            </div>
            <Slider
              id="as"
              min={0}
              max={100}
              step={1}
              value={[formData.metrics.as]}
              onValueChange={(values) => handleMetricsChange('as', values[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Numeric metrics with icons */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
              <Label htmlFor="traffic" className="text-base font-medium">
                Monthly Traffic
              </Label>
            </div>
            <Input
              id="traffic"
              type="number"
              value={formData.metrics.traffic || ''}
              onChange={(e) => handleMetricsChange('traffic', parseInt(e.target.value) || 0)}
              placeholder="e.g., 15000"
              className="w-full"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Estimated monthly visitors
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Search className="h-5 w-5 text-indigo-600 mr-2" />
              <Label htmlFor="keywords" className="text-base font-medium">
                Ranking Keywords
              </Label>
            </div>
            <Input
              id="keywords"
              type="number"
              value={formData.metrics.keywords || ''}
              onChange={(e) => handleMetricsChange('keywords', parseInt(e.target.value) || 0)}
              placeholder="e.g., 2500"
              className="w-full"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of keywords the site ranks for
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Link2 className="h-5 w-5 text-indigo-600 mr-2" />
              <Label htmlFor="refDomains" className="text-base font-medium">
                Referring Domains
              </Label>
            </div>
            <Input
              id="refDomains"
              type="number"
              value={formData.metrics.refDomains || ''}
              onChange={(e) => handleMetricsChange('refDomains', parseInt(e.target.value) || 0)}
              placeholder="e.g., 120"
              className="w-full"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of unique domains linking to the site
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
              onValueChange={(value) => handleMetricsChange('countryCode', value)}
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
      </div>
    </div>
  );
} 