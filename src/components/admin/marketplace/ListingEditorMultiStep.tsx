'use client';

import { DEFAULT_LISTING } from '@/components/admin/marketplace/constants';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Listing } from '@/types/listing';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Add interface for section component props
interface SectionProps {
  data: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  onChange: (data: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => void;
  isSubmitting: boolean;
}

// Section components
const BasicInfoSection = ({ data, onChange, isSubmitting }: SectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Basic Information</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Website Domain</label>
        <input 
          type="text" 
          value={data?.website?.domain || ''}
          onChange={(e) => onChange({ website: { ...data.website, domain: e.target.value } })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
          placeholder="example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <input 
          type="number" 
          value={data?.price || ''}
          onChange={(e) => onChange({ price: parseInt(e.target.value) })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
          placeholder="100"
        />
      </div>
    </div>
  </div>
);

const ContentSection = ({ data, onChange, isSubmitting }: SectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Content Details</h3>
    <div>
      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        value={data?.description || ''}
        onChange={(e) => onChange({ description: e.target.value })}
        disabled={isSubmitting}
        className="w-full p-2 border rounded min-h-32"
        placeholder="Describe this listing..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Listing Type</label>
      <select 
        value={data?.type?.listingType || ''}
        onChange={(e) => onChange({ type: { ...data.type, listingType: e.target.value } })}
        disabled={isSubmitting}
        className="w-full p-2 border rounded"
      >
        <option value="">Select type</option>
        <option value="guest-post">Guest Post</option>
        <option value="link-insertion">Link Insertion</option>
      </select>
    </div>
  </div>
);

const MetricsSection = ({ data, onChange, isSubmitting }: SectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Site Metrics</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Domain Authority (DA)</label>
        <input 
          type="number" 
          value={data?.metrics?.da || ''}
          onChange={(e) => onChange({ metrics: { ...data.metrics, da: parseInt(e.target.value) } })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
          placeholder="30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Domain Rating (DR)</label>
        <input 
          type="number" 
          value={data?.metrics?.dr?.value || ''}
          onChange={(e) => onChange({ 
            metrics: { 
              ...data.metrics, 
              dr: { 
                ...data.metrics.dr,
                value: parseInt(e.target.value) 
              } 
            } 
          })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
          placeholder="40"
        />
      </div>
    </div>
  </div>
);

const TrafficSection = ({ data, onChange, isSubmitting }: SectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Traffic Information</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Traffic</label>
        <input 
          type="number" 
          value={data?.traffic?.monthly || ''}
          onChange={(e) => onChange({ traffic: { ...data.traffic, monthly: parseInt(e.target.value) } })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
          placeholder="10000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Primary Language</label>
        <select 
          value={data?.language?.primary || ''}
          onChange={(e) => onChange({ language: { ...data.language, primary: e.target.value } })}
          disabled={isSubmitting}
          className="w-full p-2 border rounded"
        >
          <option value="">Select language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  </div>
);

const NichesSection = ({ data, onChange, isSubmitting }: SectionProps) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleAddNiche = () => {
    if (inputValue && !data.niches.includes(inputValue)) {
      const updatedNiches = [...data.niches, inputValue];
      onChange({ niches: updatedNiches });
      setInputValue('');
    }
  };
  
  const handleRemoveNiche = (niche: string) => {
    const updatedNiches = data.niches.filter(n => n !== niche);
    onChange({ niches: updatedNiches });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddNiche();
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Niches & Categories</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Add Niches (press Enter or comma to add)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isSubmitting}
            className="flex-1 p-2 border rounded"
            placeholder="e.g. Technology, Marketing"
          />
          <Button 
            type="button" 
            onClick={handleAddNiche}
            disabled={isSubmitting || !inputValue}
            variant="outline"
          >
            Add
          </Button>
        </div>
      </div>
      
      {data.niches.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {data.niches.map((niche) => (
            <div key={niche} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
              <span>{niche}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveNiche(niche)}
                disabled={isSubmitting}
                className="ml-2 text-primary hover:text-primary/80"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SubmitSection = ({ data }: Omit<SectionProps, 'onChange' | 'isSubmitting'>) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Review & Submit</h3>
    <div className="bg-gray-50 p-4 rounded space-y-4">
      <div>
        <h4 className="text-md font-medium">Website</h4>
        <p>{data?.website?.domain || 'Not specified'}</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Listing Type</h4>
        <p>{data?.type?.listingType || 'Not specified'}</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Price</h4>
        <p>${data?.price || '0'}</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Metrics</h4>
        <p>DA: {data?.metrics?.da || 'N/A'}, DR: {data?.metrics?.dr?.value || 'N/A'}</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Traffic</h4>
        <p>{data?.traffic?.monthly?.toLocaleString() || '0'} monthly visitors</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Language</h4>
        <p>{data?.language?.primary || 'Not specified'}</p>
      </div>
      <div>
        <h4 className="text-md font-medium">Niches</h4>
        <p>{data?.niches?.join(', ') || 'None selected'}</p>
      </div>
    </div>
  </div>
);

// Define the steps
const steps = [
  { id: 'basic-info', label: 'Basic Info', icon: '📝', component: BasicInfoSection },
  { id: 'content', label: 'Content', icon: '📄', component: ContentSection },
  { id: 'metrics', label: 'Metrics', icon: '📊', component: MetricsSection },
  { id: 'traffic', label: 'Traffic', icon: '🌐', component: TrafficSection },
  { id: 'niches', label: 'Niches', icon: '🏷️', component: NichesSection },
  { id: 'submit', label: 'Finalize', icon: '✅', component: SubmitSection },
];

export default function ListingEditorMultiStep({ initialData, listingId }: {
  initialData?: Omit<Listing, 'id' | 'status' | 'createdAt'>;
  listingId?: string;
}) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Omit<Listing, 'id' | 'status' | 'createdAt'>>(
    initialData || DEFAULT_LISTING
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const isEditMode = !!listingId;
  
  // Auto-save to localStorage
  useEffect(() => {
    // Only save drafts for new listings, not when editing
    if (!isEditMode) {
      const saveTimeout = setTimeout(() => {
        localStorage.setItem('listing-draft', JSON.stringify(formData));
      }, 1000);
      
      return () => clearTimeout(saveTimeout);
    }
  }, [formData, isEditMode]);
  
  // Load from localStorage on initial render
  useEffect(() => {
    if (!initialData && !isEditMode) {
      const savedDraft = localStorage.getItem('listing-draft');
      if (savedDraft) {
        try {
          const parsedData = JSON.parse(savedDraft);
          setFormData(parsedData);
          toast({
            title: "Draft loaded",
            description: "Your previous draft has been loaded.",
            duration: 3000,
          });
        } catch (error) {
          console.error('Error parsing saved draft:', error);
        }
      }
    }
  }, [initialData, isEditMode]);
  
  // Calculate progress based on filled fields
  useEffect(() => {
    const calculateProgress = () => {
      const requiredFields = [
        !!formData.website.domain,
        !!formData.price,
        !!formData.type.listingType,
        !!formData.language.primary,
        !!formData.metrics.da,
        !!formData.metrics.dr.value,
        formData.niches.length > 0,
      ];
      
      const filledFields = requiredFields.filter(Boolean).length;
      const progressValue = Math.round((filledFields / requiredFields.length) * 100);
      setProgress(progressValue);
    };
    
    calculateProgress();
  }, [formData]);
  
  const updateFormData = (sectionData: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => {
    setFormData(prev => ({
      ...prev,
      ...sectionData,
    }));
  };
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };
  
  const handleTabChange = (value: string) => {
    const index = steps.findIndex(step => step.id === value);
    if (index !== -1) {
      setActiveStep(index);
    }
  };
  
  const handleSaveDraft = () => {
    localStorage.setItem('listing-draft', JSON.stringify(formData));
    toast({
      title: "Draft saved",
      description: "Your listing draft has been saved.",
      duration: 3000,
    });
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Transform the form data to match the API's expected structure
      const apiData = {
        domain: formData.website.domain,
        price: formData.price,
        offerRate: formData.offerRate || null,
        tags: formData.website.tags || [],
        listingType: formData.type.listingType,
        permanent: formData.type.permanent,
        months: formData.type.permanent ? null : formData.type.months,
        wordCount: formData.type.wordCount || 500,
        workingDays: formData.type.workingDays || 3,
        contentWriter: formData.type.contentWriter || 'BOTH',
        primaryLanguage: formData.language.primary,
        nativeLanguage: formData.language.native || formData.language.primary,
        extraLanguage: formData.language.extra,
        category: formData.category || 'General',
        countryCode: formData.metrics.countryCode || 'US',
        da: formData.metrics.da,
        drValue: formData.metrics.dr.value,
        drPercentage: formData.metrics.dr.percentage || '+0%',
        as: formData.metrics.as || 0,
        traffic: formData.traffic?.monthly || formData.metrics.traffic || 0,
        keywords: formData.metrics.keywords || 0,
        refDomains: formData.metrics.refDomains || 0,
        niches: formData.niches,
        publisherNote: formData.publisherNote || '',
        acceptedContent: formData.acceptedContent || {
          casino: 'NOT_ACCEPTED',
          finance: 'NOT_ACCEPTED',
          erotic: 'NOT_ACCEPTED',
          dating: 'NOT_ACCEPTED',
          crypto: 'NOT_ACCEPTED',
          cbd: 'NOT_ACCEPTED',
          medicine: 'NOT_ACCEPTED'
        },
        countryTraffic: formData.metrics.countryTraffic || []
      };

      console.log('Submitting data:', apiData);
      
      // Make an API call to create or update the listing
      const response = await fetch(isEditMode ? `/api/listings/${listingId}` : '/api/listings', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      
      // Parse the response but we don't need to use it
      await response.json();
      
      if (isEditMode) {
        toast({
          title: "Listing updated successfully!",
          description: "Your changes have been saved.",
          variant: "default",
          duration: 5000,
        });
      } else {
        // Clear draft from localStorage
        localStorage.removeItem('listing-draft');
        
        // Show success message with confetti for new listings
        toast({
          title: "Listing created successfully!",
          description: "Your listing has been created and is now pending approval.",
          variant: "default",
          duration: 5000,
        });
        
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Redirect to listings page after a brief delay
      setTimeout(() => {
        router.push('/admin/marketplace/listings');
        router.refresh(); // Refresh the page to get the updated data
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        title: "Error",
        description: `There was an error ${isEditMode ? "updating" : "creating"} your listing. Please try again.`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const CurrentStepComponent = steps[activeStep].component;
  
  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Step tabs */}
      <Tabs 
        defaultValue={steps[0].id} 
        value={steps[activeStep].id}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {steps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className="flex flex-col items-center py-2"
              disabled={isSubmitting}
            >
              <span className="text-xl mb-1">{step.icon}</span>
              <span className="text-xs whitespace-nowrap">{step.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6">
              <CurrentStepComponent 
                data={formData} 
                onChange={updateFormData} 
                isSubmitting={isSubmitting}
              />
            </Card>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={handlePrevious}
          disabled={activeStep === 0 || isSubmitting}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>{isEditMode ? 'Updating...' : 'Submitting...'}</span>
                </div>
              ) : (
                isEditMode ? 'Update Listing' : 'Submit Listing'
              )}
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 