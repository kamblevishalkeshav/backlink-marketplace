export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';

export interface Order {
  id: string;
  listingId: number | string;
  userId: string;
  publisherId: string;
  website: string;
  anchorText: string;
  targetUrl: string;
  publishingNotes?: string;
  status: OrderStatus;
  price: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  contentRequirements?: string;
  publishedUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFilters {
  status?: OrderStatus | OrderStatus[];
  fromDate?: string;
  toDate?: string;
  search?: string;
  sort?: 'newest' | 'oldest' | 'priceAsc' | 'priceDesc';
}

export interface OrderResponse {
  data: Order[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CreateOrderInput {
  listingId: number | string;
  anchorText: string;
  targetUrl: string;
  contentRequirements?: string;
} 