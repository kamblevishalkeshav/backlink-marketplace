export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'customer' | 'publisher' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  company?: string;
  bio?: string;
  website?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  walletBalance: number;
}

export interface PublisherProfile extends UserProfile {
  publisherRating: number;
  totalListings: number;
  completedOrders: number;
  responseTime: string;
}

export interface Customer extends UserProfile {
  totalOrders: number;
  totalSpent: number;
} 