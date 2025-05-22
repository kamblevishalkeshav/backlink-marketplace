"use client";

import { Section } from "@/components/ui/section-manager";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

interface SectionPreviewProps {
  section: Section;
  className?: string;
}

export function SectionPreview({ section, className }: SectionPreviewProps) {
  const content = section.content || {};
  
  // Helper function to render various section types
  const renderSection = () => {
    if (!section.isVisible) {
      return (
        <div className="p-8 border border-dashed rounded-md text-center opacity-60">
          <p className="text-muted-foreground">This section is hidden</p>
          <p className="text-sm text-muted-foreground mt-1">It will not be displayed on the live site</p>
        </div>
      );
    }
    
    switch (section.type) {
      case "HERO":
        return renderHeroSection();
      case "TEXT":
        return renderTextSection();
      case "FEATURES":
        return renderFeaturesSection();
      case "TESTIMONIALS":
        return renderTestimonialsSection();
      case "CTA":
        return renderCtaSection();
      case "IMAGE":
        return renderImageSection();
      case "PRICING":
        return renderPricingSection();
      default:
        return (
          <div className="p-8 border border-dashed rounded-md text-center">
            <p className="text-muted-foreground">Preview not available for {section.type} sections</p>
          </div>
        );
    }
  };
  
  // Render a hero section
  const renderHeroSection = () => {
    const { heading, subheading, ctaText, ctaLink, backgroundImage } = content;
    
    return (
      <div 
        className="relative w-full p-8 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/30 z-0" />
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading || 'Hero Heading'}</h2>
          {subheading && (
            <div 
              className="text-lg md:text-xl mb-6 opacity-90"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
          {ctaText && (
            <button
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Render a text section
  const renderTextSection = () => {
    const { title, text, alignment } = content;
    
    return (
      <div 
        className="w-full p-8 rounded-lg"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
          textAlign: alignment as any || 'left',
        }}
      >
        {title && (
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
        )}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: text || 'Text content goes here' }}
        />
      </div>
    );
  };
  
  // Render a features section
  const renderFeaturesSection = () => {
    const { heading, subheading, features = [] } = content;
    
    return (
      <div 
        className="w-full p-8 rounded-lg"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading || 'Features Heading'}</h2>
          {subheading && (
            <div 
              className="text-lg opacity-90"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.length > 0 ? features.map((feature: any, index: number) => (
            <div key={feature.id || index} className="p-4 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          )) : (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">Feature {index + 1}</h3>
                <p className="text-muted-foreground">Feature description goes here</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  // Render a testimonials section
  const renderTestimonialsSection = () => {
    const { heading, subheading, testimonials = [] } = content;
    
    return (
      <div 
        className="w-full p-8 rounded-lg"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading || 'Testimonials Heading'}</h2>
          {subheading && (
            <div 
              className="text-lg opacity-90"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.length > 0 ? testimonials.map((testimonial: any, index: number) => (
            <div key={testimonial.id || index} className="p-6 rounded-lg border">
              <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                {testimonial.avatarUrl && (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatarUrl}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  {testimonial.role && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : (
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="p-6 rounded-lg border">
                <blockquote className="text-lg italic mb-4">"This is a sample testimonial that showcases what a customer might say about your product or service."</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-muted mr-4" />
                  <div>
                    <div className="font-semibold">Sample Customer</div>
                    <div className="text-sm text-muted-foreground">Customer Role, Company</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  // Render a CTA section
  const renderCtaSection = () => {
    const { heading, subheading, ctaText, ctaLink, backgroundImage } = content;
    
    return (
      <div 
        className="relative w-full p-8 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center min-h-[200px]"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/30 z-0" />
        )}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading || 'CTA Heading'}</h2>
          {subheading && (
            <div 
              className="text-base md:text-lg mb-6 opacity-90"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
          {ctaText && (
            <button
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium"
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Render an image section
  const renderImageSection = () => {
    const { title, imageUrl, caption, altText } = content;
    
    return (
      <div 
        className="w-full p-6 rounded-lg"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
        }}
      >
        {title && (
          <h3 className="text-xl font-bold mb-4">{title}</h3>
        )}
        <div className="rounded-md overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={altText || title || 'Image'} 
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="bg-muted aspect-video w-full flex items-center justify-center">
              <p className="text-muted-foreground">No image selected</p>
            </div>
          )}
        </div>
        {caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center">{caption}</p>
        )}
      </div>
    );
  };
  
  // Render a pricing section
  const renderPricingSection = () => {
    const { heading, subheading, plans = [], layout = 'horizontal' } = content;
    
    return (
      <div 
        className="w-full p-8 rounded-lg"
        style={{ 
          backgroundColor: section.backgroundColor || '#ffffff',
          color: section.textColor || '#000000',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading || 'Pricing Plans'}</h2>
          {subheading && (
            <div 
              className="text-lg opacity-90"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </div>
        
        <div className={cn(
          "grid gap-6",
          layout === 'horizontal' ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"
        )}>
          {plans.length > 0 ? plans.map((plan: any, index: number) => (
            <div 
              key={plan.id || index} 
              className={cn(
                "p-6 rounded-lg border flex flex-col",
                layout === 'horizontal' ? "" : "flex-row items-start justify-between gap-8",
                plan.isPopular ? "ring-2 ring-primary" : ""
              )}
            >
              <div className={layout === 'horizontal' ? "" : "flex-1"}>
                {plan.isPopular && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4" style={{
                    backgroundColor: plan.accentColor || '#3b82f6',
                    color: '#ffffff'
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.interval && <span className="text-muted-foreground">{plan.interval}</span>}
                </div>
                {plan.description && (
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                )}
                <ul className="space-y-2 mb-8">
                  {plan.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0" style={{
                        color: plan.accentColor || '#3b82f6'
                      }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.ctaText && (
                <button 
                  className={cn(
                    "w-full px-4 py-2 rounded-md font-medium flex items-center justify-center mt-auto",
                    plan.isPopular ? "text-white" : "border"
                  )}
                  style={{
                    backgroundColor: plan.isPopular ? (plan.accentColor || '#3b82f6') : 'transparent',
                    borderColor: plan.accentColor || '#3b82f6',
                    color: plan.isPopular ? '#ffffff' : (plan.accentColor || '#3b82f6')
                  }}
                >
                  {plan.ctaText}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          )) : (
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-6 rounded-lg border",
                  index === 1 ? "ring-2 ring-primary" : ""
                )}
              >
                {index === 1 && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">Plan {index + 1}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">${19 + index * 10}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-4">Plan description goes here</p>
                <ul className="space-y-2 mb-8">
                  {Array.from({ length: 3 + index }).map((_, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                      <span>Feature {i + 1}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={cn(
                    "w-full px-4 py-2 rounded-md font-medium flex items-center justify-center",
                    index === 1 ? "bg-primary text-primary-foreground" : "border border-primary text-primary"
                  )}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-background", className)}>
      {renderSection()}
    </div>
  );
} 