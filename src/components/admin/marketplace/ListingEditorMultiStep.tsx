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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Listing } from '@/types/listing';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Define the steps with their components
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
  
  // Initialize form for react-hook-form components with proper nesting
  const methods = useForm({
    defaultValues: formData,
    mode: "onChange"
  });
  
  // Update form when formData changes
  useEffect(() => {
    methods.reset(formData);
  }, [formData, methods]);
  
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
          methods.reset(parsedData);
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
  }, [initialData, isEditMode, methods]);
  
  // Calculate progress based on filled fields
  useEffect(() => {
    const calculateProgress = () => {
      const requiredFields = [
        !!formData.website?.domain,
        !!formData.price,
        !!formData.type?.listingType,
        !!formData.language?.primary,
        !!formData.metrics?.da,
        !!formData.metrics?.dr?.value,
        formData.niches?.length > 0,
      ];
      
      const filledFields = requiredFields.filter(Boolean).length;
      const progressValue = Math.round((filledFields / requiredFields.length) * 100);
      setProgress(progressValue);
    };
    
    calculateProgress();
  }, [formData]);
  
  const updateFormData = (newData: Partial<Omit<Listing, 'id' | 'status' | 'createdAt'>>) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        ...newData,
      };
      
      // Update the form with the new values
      methods.reset(updated, { keepValues: true });
      
      return updated;
    });
  };
  
  const handleNext = () => {
    const currentData = methods.getValues();
    setFormData(currentData);
    
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    const currentData = methods.getValues();
    setFormData(currentData);
    
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };
  
  const handleTabChange = (value: string) => {
    const currentData = methods.getValues();
    setFormData(currentData);
    
    const index = steps.findIndex(step => step.id === value);
    if (index !== -1) {
      setActiveStep(index);
    }
  };
  
  const handleSaveDraft = () => {
    const currentData = methods.getValues();
    setFormData(currentData);
    localStorage.setItem('listing-draft', JSON.stringify(currentData));
    toast({
      title: "Draft saved",
      description: "Your listing draft has been saved.",
      duration: 3000,
    });
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting form submission process');
      const currentData = methods.getValues();
      setFormData(currentData);
      console.log('Form data:', currentData);
      
      // Make an API call to create or update the listing
      const response = await fetch(isEditMode ? `/api/listings/${listingId}` : '/api/listings', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      
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
        
        <FormProvider {...methods}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                {activeStep === 0 && (
                  <BasicInfoSection 
                    formData={formData} 
                    updateFormData={updateFormData}
                    control={methods.control}
                  />
                )}
                
                {activeStep === 1 && (
                  <ContentSection 
                    formData={formData} 
                    updateFormData={updateFormData}
                    control={methods.control}
                  />
                )}
                
                {activeStep === 2 && (
                  <MetricsSection 
                    formData={formData} 
                    updateFormData={updateFormData}
                    control={methods.control}
                  />
                )}
                
                {activeStep === 3 && (
                  <TrafficSection 
                    control={methods.control}
                    countryTraffic={formData.metrics.countryTraffic || []}
                    onAddCountry={() => {
                      // Get current form data
                      const currentData = methods.getValues();
                      const currentTraffic = [...(currentData.metrics?.countryTraffic || [])];
                      
                      // Add a new country
                      currentTraffic.push({
                        countryCode: '',
                        percentage: 0,
                        traffic: 0
                      });
                      
                      // Update form data
                      updateFormData({
                        metrics: {
                          ...currentData.metrics,
                          countryTraffic: currentTraffic
                        }
                      });
                    }}
                    onRemoveCountry={(index) => {
                      const currentData = methods.getValues();
                      const currentTraffic = [...(currentData.metrics?.countryTraffic || [])];
                      
                      if (currentTraffic.length > 1) {
                        currentTraffic.splice(index, 1);
                        
                        updateFormData({
                          metrics: {
                            ...currentData.metrics,
                            countryTraffic: currentTraffic
                          }
                        });
                      }
                    }}
                    onCountryChange={(index, country) => {
                      const currentData = methods.getValues();
                      const currentTraffic = [...(currentData.metrics?.countryTraffic || [])];
                      
                      if (currentTraffic[index]) {
                        currentTraffic[index].countryCode = country;
                        
                        updateFormData({
                          metrics: {
                            ...currentData.metrics,
                            countryTraffic: currentTraffic
                          }
                        });
                      }
                    }}
                  />
                )}
                
                {activeStep === 4 && (
                  <NichesSection 
                    control={methods.control}
                    niches={formData.niches || []}
                    onAddNiche={(niche) => {
                      const currentData = methods.getValues();
                      const currentNiches = [...(currentData.niches || [])];
                      
                      if (!currentNiches.includes(niche)) {
                        currentNiches.push(niche);
                        
                        updateFormData({
                          niches: currentNiches
                        });
                      }
                    }}
                    onRemoveNiche={(niche) => {
                      const currentData = methods.getValues();
                      const currentNiches = [...(currentData.niches || [])];
                      
                      const index = currentNiches.indexOf(niche);
                      if (index !== -1) {
                        currentNiches.splice(index, 1);
                        
                        updateFormData({
                          niches: currentNiches
                        });
                      }
                    }}
                  />
                )}
                
                {activeStep === 5 && (
                  <SubmitSection 
                    formData={formData} 
                    updateFormData={updateFormData}
                    control={methods.control}
                  />
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </FormProvider>
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