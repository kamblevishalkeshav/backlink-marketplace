'use client';

import { DEFAULT_LISTING } from '@/components/admin/marketplace/constants';
import BasicInfoSection from '@/components/admin/marketplace/sections/BasicInfoSection';
import ContentSection from '@/components/admin/marketplace/sections/ContentSection';
import MetricsSection from '@/components/admin/marketplace/sections/MetricsSection';
import NichesSection from '@/components/admin/marketplace/sections/NichesSection';
import SubmitSection from '@/components/admin/marketplace/sections/SubmitSection';
import TrafficSection from '@/components/admin/marketplace/sections/TrafficSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Listing } from '@/types/listing';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      // Make an API call to create or update the listing
      const response = await fetch(isEditMode ? `/api/listings/${listingId}` : '/api/listings', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
  };
  
  const CurrentStepComponent = steps[activeStep].component;
  
  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Navigation Tabs */}
      <Tabs 
        value={steps[activeStep].id}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full md:w-fit grid grid-cols-3 md:flex md:flex-row gap-1">
          {steps.map((step, index) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              disabled={isSubmitting}
            >
              <span className="hidden md:inline">{step.icon}</span>
              <span className="md:hidden">{index + 1}</span>
              <span className="hidden md:inline">{step.label}</span>
              {index < activeStep && (
                <span className="h-2 w-2 rounded-full bg-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Form content with animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 mt-6">
              <TabsContent value={steps[activeStep].id} forceMount>
                <CurrentStepComponent 
                  formData={formData} 
                  updateFormData={updateFormData}
                />
              </TabsContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <div>
          {activeStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          
          {activeStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Listing
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 