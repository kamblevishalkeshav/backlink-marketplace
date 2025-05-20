export interface Listing {
  id: number | string;
  website: string;
  domainAuthority: number;
  domainRating: number;
  traffic: string;
  category: string;
  price: string;
  description: string;
  indexing: string;
  language: string;
  createdAt?: string;
  updatedAt?: string;
  publisherId?: string;
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