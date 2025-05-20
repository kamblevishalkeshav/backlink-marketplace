'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/Select';
import { Textarea } from '@/components/common/Textarea';
import { OrderContent, useOrders } from '@/hooks/useOrders';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type OrderFormProps = {
  listingId: number;
  price: number;
  onCancel: () => void;
};

export default function OrderForm({ listingId, price, onCancel }: OrderFormProps) {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { createOrder, loading, error } = useOrders();
  const [formData, setFormData] = useState<OrderContent>({
    targetURL: '',
    anchorText: '',
    content: '',
    contentType: 'provide',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentTypeChange = (value: 'provide' | 'publisher') => {
    setFormData((prev) => ({ ...prev, contentType: value }));
  };

  const validateStep1 = () => {
    return formData.targetURL && formData.anchorText;
  };

  const validateStep2 = () => {
    if (formData.contentType === 'provide') {
      return formData.content.length >= 100;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    // Calculate total price based on content type
    const totalPrice = formData.contentType === 'publisher' ? price + 50 : price;
    
    // Create order
    const result = await createOrder(listingId, formData, totalPrice);
    
    if (result) {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-primary">Order Placed Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          Your order has been submitted. You&apos;ll receive confirmation soon.
        </p>
        <Button variant="outline" onClick={onCancel} className="border-secondary text-secondary hover:bg-secondary/10">
          Back to Listing
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error placing order</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="targetURL">Target URL</Label>
            <Input
              id="targetURL"
              name="targetURL"
              placeholder="https://your-website.com/page"
              value={formData.targetURL}
              onChange={handleChange}
              required
              className="border-muted focus:border-accent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              The page you want the backlink to point to
            </p>
          </div>
          
          <div>
            <Label htmlFor="anchorText">Anchor Text</Label>
            <Input
              id="anchorText"
              name="anchorText"
              placeholder="e.g. Best SEO Services"
              value={formData.anchorText}
              onChange={handleChange}
              required
              className="border-muted focus:border-accent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              The clickable text for your backlink
            </p>
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel} className="border-secondary text-secondary hover:bg-secondary/10">
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleNextStep}
              disabled={!validateStep1()}
              className="bg-primary hover:bg-secondary transition-colors"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Option</Label>
            <Select 
              value={formData.contentType} 
              onValueChange={(value) => handleContentTypeChange(value as 'provide' | 'publisher')}
            >
              <SelectTrigger className="border-muted">
                <SelectValue placeholder="Select content option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="provide">I&apos;ll provide the content</SelectItem>
                <SelectItem value="publisher">Publisher writes the content (+$50)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.contentType === 'provide' && (
            <div>
              <Label htmlFor="content">Your Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write or paste your content here. Minimum 500 words."
                value={formData.content}
                onChange={handleChange}
                rows={6}
                required
                className="border-muted focus:border-accent"
              />
              {formData.content && formData.content.length < 100 && (
                <div className="flex items-center mt-2 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Content is too short. Minimum 500 words required.
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Base Price</span>
              <span className="text-primary">${price}</span>
            </div>
            {formData.contentType === 'publisher' && (
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Content Creation</span>
                <span className="text-secondary">+$50</span>
              </div>
            )}
            <div className="pt-2 border-t border-accent/20 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-primary">${formData.contentType === 'publisher' ? price + 50 : price}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevStep} className="border-secondary text-secondary hover:bg-secondary/10">
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading || !validateStep2()}
              className="bg-primary hover:bg-secondary transition-colors"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
} 