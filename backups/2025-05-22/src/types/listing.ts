export type ListingStatus = 'pending' | 'approved' | 'rejected';

export interface Listing {
  id: string;
  domain: string;
  category: string;
  da: number; // Domain Authority
  traffic: number;
  price: number;
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