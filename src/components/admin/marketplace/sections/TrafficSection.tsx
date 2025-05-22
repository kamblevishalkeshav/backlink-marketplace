'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Control } from 'react-hook-form';
import CountrySelect from '../../common/CountrySelect';

type TrafficDataItem = {
  countryCode: string;
  percentage: number;
  traffic: number;
};

type TrafficSectionProps = {
  control: Control<any>;
  countryTraffic: TrafficDataItem[];
  onAddCountry: () => void;
  onRemoveCountry: (index: number) => void;
  onCountryChange: (index: number, country: string) => void;
};

const TrafficSection = ({ 
  control, 
  countryTraffic, 
  onAddCountry, 
  onRemoveCountry,
  onCountryChange
}: TrafficSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Distribution</CardTitle>
        <CardDescription>
          Configure the country traffic distribution for this listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {countryTraffic.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pb-4 border-b">
              <FormField
                control={control}
                name={`countryTraffic.${index}.countryCode`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country {index + 1}</FormLabel>
                    <FormControl>
                      <CountrySelect
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          onCountryChange(index, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`countryTraffic.${index}.percentage`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traffic Percentage</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`countryTraffic.${index}.traffic`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Traffic</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveCountry(index)}
                  disabled={countryTraffic.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={onAddCountry}
            disabled={countryTraffic.length >= 5}
            className="w-full"
          >
            Add Country
          </Button>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Total percentage: {countryTraffic.reduce((acc, item) => acc + (item.percentage || 0), 0)}%</p>
            <p>Total traffic: {countryTraffic.reduce((acc, item) => acc + (item.traffic || 0), 0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSection; 