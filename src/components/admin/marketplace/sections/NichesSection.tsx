'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Control } from 'react-hook-form';

type NichesSectionProps = {
  control: Control<any>;
  niches: string[];
  onAddNiche: (niche: string) => void;
  onRemoveNiche: (niche: string) => void;
};

const NichesSection = ({ control, niches, onAddNiche, onRemoveNiche }: NichesSectionProps) => {
  const [newNiche, setNewNiche] = useState('');

  const handleAddNiche = () => {
    if (newNiche.trim()) {
      onAddNiche(newNiche.trim());
      setNewNiche('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Niches & Topics</CardTitle>
        <CardDescription>
          Specify the main niches and topics that your website covers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FormField
            control={control}
            name="niches"
            render={() => (
              <FormItem>
                <FormLabel>Website Niches</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[100px] p-2 border rounded-md">
                    {niches.length === 0 && (
                      <p className="text-sm text-muted-foreground p-2">No niches added yet. Add some below.</p>
                    )}
                    
                    {niches.map((niche) => (
                      <Badge key={niche} variant="secondary" className="flex items-center gap-1 text-sm">
                        {niche}
                        <button
                          type="button"
                          onClick={() => onRemoveNiche(niche)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {niche}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a niche (e.g., Technology, Health, Finance)"
              value={newNiche}
              onChange={(e) => setNewNiche(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddNiche();
                }
              }}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddNiche} disabled={!newNiche.trim()}>
              Add
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Popular niches: Tech, Finance, Health, Education, Travel, Business</p>
            <p>Be specific to help buyers find your listing more easily</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NichesSection; 