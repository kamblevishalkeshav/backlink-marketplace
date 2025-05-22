export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO date
  listingsCount?: number;
} 

export interface Region {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  regionId?: string; // Optional, for grouping
}

export interface SensitiveNiche {
  id: string;
  name: string;
  description?: string;
} 