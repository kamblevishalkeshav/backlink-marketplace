// Define types for editable content

export type SectionType = 
  | 'HERO'
  | 'FEATURES' 
  | 'LOGO_CAROUSEL' 
  | 'MEDIA_BACKLINKS'
  | 'HOW_IT_WORKS'
  | 'ANALYTICS_DASHBOARD'
  | 'TESTIMONIALS'
  | 'FAQ'
  | 'CTA'
  | 'CUSTOM';

export type AssetType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

// Base interface for all section types
export interface BaseSection {
  id: string;
  name: string;
  type: SectionType;
  order: number;
}

// Hero section content
export interface HeroSection extends BaseSection {
  type: 'HERO';
  content: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: string;
    statsItems?: Array<{
      label: string;
      value: string;
    }>;
  };
}

// Logo carousel section content
export interface LogoCarouselSection extends BaseSection {
  type: 'LOGO_CAROUSEL';
  content: {
    heading?: string;
    subheading?: string;
    logos: Array<{
      id: string;
      name: string;
      imageUrl: string;
      link?: string;
    }>;
  };
}

// Features section content
export interface FeaturesSection extends BaseSection {
  type: 'FEATURES';
  content: {
    heading: string;
    subheading?: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      iconName?: string;
      link?: string;
    }>;
  };
}

// Media backlinks section content
export interface MediaBacklinksSection extends BaseSection {
  type: 'MEDIA_BACKLINKS';
  content: {
    heading: string;
    subheading?: string;
    items: Array<{
      id: string;
      title: string;
      imageUrl: string;
      link?: string;
    }>;
  };
}

// How it works section content
export interface HowItWorksSection extends BaseSection {
  type: 'HOW_IT_WORKS';
  content: {
    heading: string;
    subheading?: string;
    steps: Array<{
      id: string;
      step: string;
      title: string;
      description: string;
      iconName: string;
      color: string;
      gradient: string;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
}

// Analytics dashboard section content
export interface AnalyticsDashboardSection extends BaseSection {
  type: 'ANALYTICS_DASHBOARD';
  content: {
    heading: string;
    subheading?: string;
    imageUrl: string;
    features?: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

// Testimonials section content
export interface TestimonialsSection extends BaseSection {
  type: 'TESTIMONIALS';
  content: {
    heading: string;
    subheading?: string;
    testimonials: Array<{
      id: string;
      quote: string;
      author: string;
      role?: string;
      company?: string;
      avatarUrl?: string;
      rating?: number;
    }>;
  };
}

// FAQ section content
export interface FAQSection extends BaseSection {
  type: 'FAQ';
  content: {
    heading: string;
    subheading?: string;
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
}

// CTA section content
export interface CTASection extends BaseSection {
  type: 'CTA';
  content: {
    heading: string;
    subheading?: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
}

// Custom section content
export interface CustomSection extends BaseSection {
  type: 'CUSTOM';
  content: {
    html: string;
  };
}

// Union type for all section types
export type PageSection = 
  | HeroSection
  | LogoCarouselSection
  | FeaturesSection
  | MediaBacklinksSection
  | HowItWorksSection
  | AnalyticsDashboardSection
  | TestimonialsSection
  | FAQSection
  | CTASection
  | CustomSection;

// Page type
export interface Page {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  sections: PageSection[];
  createdAt: string;
  updatedAt: string;
}

// Asset type
export interface Asset {
  id: string;
  name: string;
  url: string;
  type: AssetType;
  size: number;
  createdAt: string;
  updatedAt: string;
} 