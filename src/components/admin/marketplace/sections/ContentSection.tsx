'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Listing } from '@/types/listing';
import { Control } from 'react-hook-form';

interface ContentSectionProps {
  formData: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  updateFormData: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
  control: Control<any>;
}

export default function ContentSection({ formData, updateFormData, control }: ContentSectionProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Content Details</CardTitle>
        <CardDescription>
          Configure the content requirements for this listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="type.wordCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 500"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="type.workingDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time (days)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="e.g. 3"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="type.contentWriter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Writer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Who will write the content?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="both">Both options available</SelectItem>
                    <SelectItem value="buyer">Buyer provides content</SelectItem>
                    <SelectItem value="publisher">Publisher writes content</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={control}
            name="language.primary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="language.native"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Native Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select native language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="language.extra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Language (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select extra language (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Accepted Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['casino', 'finance', 'erotic', 'dating', 'crypto', 'cbd', 'medicine'].map((niche) => (
              <FormField
                key={niche}
                control={control}
                name={`acceptedContent.${niche}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-muted/50 p-3 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value === 'accepted'}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? 'accepted' : 'not-accepted');
                        }}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel className="capitalize">{niche}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 