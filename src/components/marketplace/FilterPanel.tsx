import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/Select';
import { Slider } from '@/components/common/Slider';
import { Filter, X } from 'lucide-react';
import React, { useState } from 'react';

interface FilterPanelProps {
  onFilter: (filters: FilterValues) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterValues {
  minDA: number;
  maxDA: number;
  minDR: number;
  maxDR: number;
  category: string;
  minPrice: number;
  maxPrice: number;
}

const initialFilters: FilterValues = {
  minDA: 0,
  maxDA: 100,
  minDR: 0,
  maxDR: 100,
  category: '',
  minPrice: 0,
  maxPrice: 500,
};

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter, isOpen, onClose }) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Health', label: 'Health' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Food', label: 'Food' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Education', label: 'Education' },
    { value: 'Business', label: 'Business' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name.startsWith('min') || name.startsWith('max') ? Number(value) : value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleDAChange = (values: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      minDA: values[0],
      maxDA: values[1]
    }));
  };

  const handleDRChange = (values: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      minDR: values[0],
      maxDR: values[1]
    }));
  };

  const handlePriceChange = (values: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilter(initialFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-40 lg:relative lg:inset-auto lg:bg-transparent">
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background p-6 shadow-lg z-50 overflow-auto lg:relative lg:right-auto lg:top-auto lg:bottom-auto lg:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Filter Listings</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Domain Authority (DA)</Label>
            <div className="pt-2 px-2">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[filters.minDA, filters.maxDA]}
                onValueChange={handleDAChange}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Input
                type="number"
                name="minDA"
                value={filters.minDA}
                onChange={handleInputChange}
                min={0}
                max={filters.maxDA}
                className="w-20"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                name="maxDA"
                value={filters.maxDA}
                onChange={handleInputChange}
                min={filters.minDA}
                max={100}
                className="w-20"
              />
            </div>
          </div>

          <div>
            <Label>Domain Rating (DR)</Label>
            <div className="pt-2 px-2">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[filters.minDR, filters.maxDR]}
                onValueChange={handleDRChange}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Input
                type="number"
                name="minDR"
                value={filters.minDR}
                onChange={handleInputChange}
                min={0}
                max={filters.maxDR}
                className="w-20"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                name="maxDR"
                value={filters.maxDR}
                onChange={handleInputChange}
                min={filters.minDR}
                max={100}
                className="w-20"
              />
            </div>
          </div>

          <div>
            <Label>Price Range ($)</Label>
            <div className="pt-2 px-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                min={0}
                max={filters.maxPrice}
                className="w-20"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                min={filters.minPrice}
                max={500}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-4">
            <Button onClick={applyFilters} className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 