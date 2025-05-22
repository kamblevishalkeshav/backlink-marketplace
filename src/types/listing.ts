export type ListingStatus = 'pending' | 'approved' | 'rejected';
export type ContentWriterType = 'both' | 'you' | 'publisher';
export type ListingType = 'guest-post' | 'homepage-link' | 'innerpage-link' | 'sitewide-link';
export type ContentAcceptanceStatus = 'accepted' | 'not-accepted' | 'prohibited';

export interface CountryTraffic {
  countryCode: string;
  percentage: number;
  traffic: number;
}

export interface Listing {
  id: string;
  price: number;
  offerRate?: number; // Optional discount rate
  isFavorite?: boolean;
  website: {
    domain: string;
    verified: boolean;
    tags?: string[];
  };
  type: {
    listingType: ListingType;
    permanent: boolean;
    months?: number;
    wordCount: number;
    workingDays: number;
    contentWriter: ContentWriterType;
  };
  approx: {
    workingDays: number;
    wordCount?: number;
  };
  language: {
    primary: string;
    native: string;
    extra?: string;
  };
  category: string;
  metrics: {
    countryCode: string;
    countryTraffic?: CountryTraffic[]; // Up to 5 country traffic entries
    dr: {
      value: number;
      percentage: string;
    };
    da: number;
    as: number; // Authority Score
    traffic: number;
    keywords: number;
    refDomains: number;
  };
  niches: string[];
  acceptedContent?: {
    casino?: ContentAcceptanceStatus;
    finance?: ContentAcceptanceStatus;
    erotic?: ContentAcceptanceStatus;
    dating?: ContentAcceptanceStatus;
    crypto?: ContentAcceptanceStatus;
    cbd?: ContentAcceptanceStatus;
    medicine?: ContentAcceptanceStatus;
  };
  publisherNote?: string;
  status: ListingStatus;
  createdAt: string; // ISO date
}

export type ListingFilters = {
  minDA?: number;
  maxDA?: number;
  minDR?: number;
  maxDR?: number;
  minTraffic?: number;
  categories?: string[];
  priceMin?: number;
  priceMax?: number;
  languages?: string[];
  search?: string;
  sort?: 'priceAsc' | 'priceDesc' | 'daAsc' | 'daDesc' | 'drAsc' | 'drDesc' | 'newest';
};

export interface ListingResponse {
  data: Listing[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
} 