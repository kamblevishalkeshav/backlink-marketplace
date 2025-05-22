'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, AlertTriangle, CheckCircle2, Upload } from 'lucide-react';
import Papa from 'papaparse';
import { useState } from 'react';

type ImportStatus = 'idle' | 'parsing' | 'validating' | 'importing' | 'success' | 'error';

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

const ListingImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    total: number;
    imported: number;
    errors: ValidationError[];
  }>({
    total: 0,
    imported: 0,
    errors: [],
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv') || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
        setStatus('idle');
        setResults({ total: 0, imported: 0, errors: [] });
      } else {
        toast({
          title: 'Invalid file format',
          description: 'Please upload a CSV or Excel file',
          variant: 'destructive',
        });
      }
    }
  };

  const validateRow = (row: Record<string, string>, index: number): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    // Required fields
    const requiredFields = [
      'domain', 'price', 'listing_type', 'is_permanent', 'word_count',
      'working_days', 'content_writer', 'primary_language', 'native_language',
      'category', 'country_code', 'da', 'dr_value', 'dr_percentage', 
      'as_value', 'traffic', 'keywords', 'ref_domains', 'niches'
    ];

    requiredFields.forEach(field => {
      if (!row[field]) {
        errors.push({
          row: index + 1,
          field,
          message: `${field} is required`,
        });
      }
    });
    
    // Type validations
    if (row.price && isNaN(Number(row.price))) {
      errors.push({
        row: index + 1,
        field: 'price',
        message: 'Price must be a number',
      });
    }
    
    if (row.offer_rate && (isNaN(Number(row.offer_rate)) || Number(row.offer_rate) < 0 || Number(row.offer_rate) > 100)) {
      errors.push({
        row: index + 1,
        field: 'offer_rate',
        message: 'Offer rate must be a number between 0 and 100',
      });
    }
    
    if (row.listing_type && !['guest-post', 'homepage-link', 'innerpage-link', 'sitewide-link'].includes(row.listing_type)) {
      errors.push({
        row: index + 1,
        field: 'listing_type',
        message: 'Invalid listing type',
      });
    }
    
    if (row.is_permanent && !['TRUE', 'FALSE', 'true', 'false'].includes(row.is_permanent)) {
      errors.push({
        row: index + 1,
        field: 'is_permanent',
        message: 'is_permanent must be TRUE or FALSE',
      });
    }
    
    // Check if months is provided when not permanent
    if ((row.is_permanent === 'FALSE' || row.is_permanent === 'false') && !row.months) {
      errors.push({
        row: index + 1,
        field: 'months',
        message: 'Months is required when listing is not permanent',
      });
    }
    
    // Validate content_writer field
    if (row.content_writer && !['buyer', 'publisher', 'both', 'you'].includes(row.content_writer.toLowerCase())) {
      errors.push({
        row: index + 1,
        field: 'content_writer',
        message: 'content_writer must be one of: buyer, publisher, both, you',
      });
    }
    
    return errors;
  };

  const processCSV = async (csvData: string[][]) => {
    setStatus('parsing');
    setProgress(20);
    
    // Convert array data to objects with headers
    const headers = csvData[0];
    const rows = csvData.slice(1).map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
    
    setProgress(40);
    setStatus('validating');
    
    // Validate all rows
    let allErrors: ValidationError[] = [];
    rows.forEach((row, index) => {
      const rowErrors = validateRow(row, index);
      allErrors = [...allErrors, ...rowErrors];
    });
    
    setProgress(60);
    
    if (allErrors.length > 0) {
      setResults({
        total: rows.length,
        imported: 0,
        errors: allErrors,
      });
      setStatus('error');
      return;
    }
    
    setStatus('importing');
    setProgress(80);
    
    // Import valid rows
    let imported = 0;
    const importErrors: ValidationError[] = [];
    
    for (let i = 0; i < rows.length; i++) {
      try {
        const row = rows[i];
        
        // Transform the row data to match the API structure
        const transformedData = {
          price: Number(row.price),
          offerRate: row.offer_rate ? Number(row.offer_rate) : 0,
          description: row.publisher_note || '',
          website: {
            domain: row.domain,
            verified: true,
            tags: row.niches.split(',').map(tag => tag.trim()),
          },
          type: {
            listingType: row.listing_type as any,
            permanent: row.is_permanent === 'TRUE' || row.is_permanent === 'true',
            months: row.months ? Number(row.months) : 0,
            wordCount: Number(row.word_count),
            workingDays: Number(row.working_days),
            contentWriter: row.content_writer.toLowerCase(),
          },
          language: {
            primary: row.primary_language,
            native: row.native_language,
            extra: row.extra_language || null,
          },
          metrics: {
            countryCode: row.country_code,
            category: row.category,
            da: Number(row.da),
            dr: {
              value: Number(row.dr_value),
              percentage: row.dr_percentage,
            },
            as: Number(row.as_value),
            traffic: Number(row.traffic),
            keywords: Number(row.keywords),
            refDomains: Number(row.ref_domains),
          },
          countryTraffic: [
            ...(row.country1_code ? [{
              countryCode: row.country1_code,
              percentage: Number(row.country1_percentage),
              traffic: Number(row.country1_traffic),
            }] : []),
            ...(row.country2_code ? [{
              countryCode: row.country2_code,
              percentage: Number(row.country2_percentage),
              traffic: Number(row.country2_traffic),
            }] : []),
            ...(row.country3_code ? [{
              countryCode: row.country3_code,
              percentage: Number(row.country3_percentage),
              traffic: Number(row.country3_traffic),
            }] : []),
            ...(row.country4_code ? [{
              countryCode: row.country4_code,
              percentage: Number(row.country4_percentage),
              traffic: Number(row.country4_traffic),
            }] : []),
            ...(row.country5_code ? [{
              countryCode: row.country5_code,
              percentage: Number(row.country5_percentage),
              traffic: Number(row.country5_traffic),
            }] : []),
          ],
          niches: row.niches.split(',').map(tag => tag.trim()),
          acceptedContent: {
            casino: row.accept_casino || 'not-accepted',
            finance: row.accept_finance || 'not-accepted',
            erotic: row.accept_erotic || 'prohibited',
            dating: row.accept_dating || 'not-accepted',
            crypto: row.accept_crypto || 'not-accepted',
            cbd: row.accept_cbd || 'not-accepted',
            medicine: row.accept_medicine || 'not-accepted',
          },
          publisherNote: row.publisher_note || '',
        };
        
        // Make API call to create listing
        const response = await fetch('/api/listings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to import row ${i + 1}: ${await response.text()}`);
        }
        
        imported++;
        setProgress(80 + (imported / rows.length) * 20);
      } catch (error) {
        console.error('Import error:', error);
        importErrors.push({
          row: i + 1,
          field: 'general',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    
    setResults({
      total: rows.length,
      imported,
      errors: importErrors,
    });
    
    setProgress(100);
    setStatus(importErrors.length === 0 ? 'success' : 'error');
  };

  const handleImport = async () => {
    if (!file) return;
    
    setStatus('parsing');
    setProgress(10);
    
    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        complete: (results) => {
          processCSV(results.data as string[][]);
        },
        error: (error) => {
          toast({
            title: 'Error parsing CSV',
            description: error.message,
            variant: 'destructive',
          });
          setStatus('error');
        }
      });
    } else {
      // Handle Excel files if needed
      toast({
        title: 'File format not supported',
        description: 'Currently only CSV files are supported for import',
        variant: 'destructive',
      });
      setStatus('error');
    }
  };
  
  const downloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/listing_import_template.csv'; // This file should be placed in the public folder
    link.download = 'listing_import_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Import Listings</CardTitle>
        <CardDescription>
          Upload a CSV file to bulk import listings. 
          <Button 
            variant="link" 
            className="px-0 py-0 h-auto font-normal text-sm underline"
            onClick={downloadTemplate}
          >
            Download template
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label 
              htmlFor="file-upload" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  CSV or Excel file (max. 1000 listings)
                </p>
              </div>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".csv,.xlsx" 
                onChange={handleFileChange}
                disabled={status !== 'idle' && status !== 'error' && status !== 'success'}
              />
            </label>
          </div>
          
          {file && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium">Selected file:</span>
              <span>{file.name}</span>
              <span className="text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
            </div>
          )}
          
          {status !== 'idle' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{status}</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {status === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Import successful</AlertTitle>
              <AlertDescription className="text-green-700">
                Successfully imported {results.imported} out of {results.total} listings.
              </AlertDescription>
            </Alert>
          )}
          
          {status === 'error' && results.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Import failed</AlertTitle>
              <AlertDescription>
                {results.imported > 0 && (
                  <p className="mb-2">
                    Partially imported: {results.imported} out of {results.total} listings.
                  </p>
                )}
                <p className="font-semibold mb-1">Errors:</p>
                <ul className="text-sm list-disc pl-5 space-y-1 max-h-40 overflow-y-auto">
                  {results.errors.slice(0, 10).map((error, index) => (
                    <li key={index}>
                      Row {error.row}: {error.field} - {error.message}
                    </li>
                  ))}
                  {results.errors.length > 10 && (
                    <li className="font-medium">
                      ...and {results.errors.length - 10} more errors
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {file && status === 'idle' && (
            <Alert variant="default" className="bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Before you import</AlertTitle>
              <AlertDescription className="text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure all required fields are filled</li>
                  <li>Check that the data format matches the template</li>
                  <li>Make sure the domain names are unique</li>
                  <li>Backup your data before importing large files</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setFile(null);
            setStatus('idle');
            setResults({ total: 0, imported: 0, errors: [] });
          }}
          disabled={!file || (status !== 'idle' && status !== 'error' && status !== 'success')}
        >
          Reset
        </Button>
        <Button 
          onClick={handleImport} 
          disabled={!file || (status !== 'idle' && status !== 'error' && status !== 'success')}
        >
          Import Listings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingImport; 