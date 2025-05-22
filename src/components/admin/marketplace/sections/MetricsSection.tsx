'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Listing } from '@/types/listing';
import { BarChart2, Link2, Search } from 'lucide-react';
import Image from 'next/image';
import { Control } from 'react-hook-form';

interface MetricsSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
  control: Control<any>;
}

export default function MetricsSection({ formData, updateFormData, control }: MetricsSectionProps) {
  const getMetricColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-green-500";
    if (value >= 40) return "text-amber-500";
    if (value >= 20) return "text-amber-400";
    return "text-gray-500";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Metrics</CardTitle>
        <CardDescription>
          Provide key metrics for your website to help buyers understand its value.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <FormLabel htmlFor="dr" className="text-base">Domain Rating (DR)</FormLabel>
                </div>
                <span className={`text-xl font-bold ${getMetricColor(formData.metrics.dr.value)}`}>
                  {formData.metrics.dr.value}
                </span>
              </div>
              
              <FormField
                control={control}
                name="metrics.dr.value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        id="dr"
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="py-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center gap-2">
                <FormLabel htmlFor="dr-trend" className="text-sm">Trend</FormLabel>
                <FormField
                  control={control}
                  name="metrics.dr.percentage"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value || ''}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger id="dr-trend" className="w-32">
                            <SelectValue placeholder="Select trend" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="+5%">+5%</SelectItem>
                          <SelectItem value="+10%">+10%</SelectItem>
                          <SelectItem value="+15%">+15%</SelectItem>
                          <SelectItem value="0%">Stable (0%)</SelectItem>
                          <SelectItem value="-5%">-5%</SelectItem>
                          <SelectItem value="-10%">-10%</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  <FormLabel htmlFor="da" className="text-base">Domain Authority (DA)</FormLabel>
                </div>
                <span className={`text-xl font-bold ${getMetricColor(formData.metrics.da)}`}>
                  {formData.metrics.da}
                </span>
              </div>
              
              <FormField
                control={control}
                name="metrics.da"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        id="da"
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="py-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                  <FormLabel htmlFor="as" className="text-base">Authority Score (AS)</FormLabel>
                </div>
                <span className={`text-xl font-bold ${getMetricColor(formData.metrics.as)}`}>
                  {formData.metrics.as}
                </span>
              </div>
              
              <FormField
                control={control}
                name="metrics.as"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        id="as"
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="py-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Numeric metrics with icons */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                <FormLabel htmlFor="traffic" className="text-base font-medium">
                  Monthly Traffic
                </FormLabel>
              </div>
              
              <FormField
                control={control}
                name="metrics.traffic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="traffic"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="e.g., 15000"
                        className="w-full"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <p className="text-xs text-gray-500 mt-1">
                Estimated monthly visitors
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Search className="h-5 w-5 text-indigo-600 mr-2" />
                <FormLabel htmlFor="keywords" className="text-base font-medium">
                  Ranking Keywords
                </FormLabel>
              </div>
              
              <FormField
                control={control}
                name="metrics.keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="keywords"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="e.g., 2500"
                        className="w-full"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <p className="text-xs text-gray-500 mt-1">
                Number of keywords the site ranks for
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Link2 className="h-5 w-5 text-indigo-600 mr-2" />
                <FormLabel htmlFor="refDomains" className="text-base font-medium">
                  Referring Domains
                </FormLabel>
              </div>
              
              <FormField
                control={control}
                name="metrics.refDomains"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="refDomains"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="e.g., 120"
                        className="w-full"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <p className="text-xs text-gray-500 mt-1">
                Number of unique domains linking to the site
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 