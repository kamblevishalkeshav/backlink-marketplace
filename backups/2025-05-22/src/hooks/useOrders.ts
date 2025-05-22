'use client';

import { useCallback, useState } from 'react';
import { Listing } from './useListings';

export interface OrderContent {
  targetURL: string;
  anchorText: string;
  content: string;
  contentType: 'provide' | 'publisher';
}

export interface Order {
  id: number;
  listingId: number;
  listing?: Listing;
  status: 'pending' | 'in_review' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';
  dateCreated: string;
  dateUpdated: string;
  totalPrice: number;
  content: OrderContent;
  liveURL?: string;
  feedback?: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock orders data - in a real app, this would come from an API
  const mockOrders: Order[] = [
    {
      id: 1001,
      listingId: 1,
      status: 'completed',
      dateCreated: '2023-10-15T10:30:00Z',
      dateUpdated: '2023-10-18T14:20:00Z',
      totalPrice: 120,
      content: {
        targetURL: 'https://example.com/seo-guide',
        anchorText: 'comprehensive SEO guide',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        contentType: 'provide'
      },
      liveURL: 'https://healthblog.com/top-seo-strategies-2023'
    },
    {
      id: 1002,
      listingId: 3,
      status: 'in_progress',
      dateCreated: '2023-10-20T15:45:00Z',
      dateUpdated: '2023-10-20T15:45:00Z',
      totalPrice: 230, // Base + content writing fee
      content: {
        targetURL: 'https://example.com/investment-guide',
        anchorText: 'investment strategies for beginners',
        content: '',
        contentType: 'publisher'
      }
    },
    {
      id: 1003,
      listingId: 5,
      status: 'pending',
      dateCreated: '2023-10-22T09:15:00Z',
      dateUpdated: '2023-10-22T09:15:00Z',
      totalPrice: 145,
      content: {
        targetURL: 'https://example.com/cooking-tools',
        anchorText: 'essential cooking tools',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        contentType: 'provide'
      }
    }
  ];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/orders');
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrders(mockOrders);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id: number | string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch(`/api/orders/${id}`);
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const order = mockOrders.find(o => o.id === Number(id));
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      return order;
    } catch (err) {
      setError('Failed to fetch order details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (listingId: number, content: OrderContent, totalPrice: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ listingId, content, totalPrice })
      // });
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate a new order creation
      const newOrder: Order = {
        id: Math.floor(Math.random() * 9000) + 1000, // Random ID for demo
        listingId,
        status: 'pending',
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        totalPrice,
        content
      };
      
      setOrders(prev => [...prev, newOrder]);
      
      return newOrder;
    } catch (err) {
      setError('Failed to create order');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your backend
      // const response = await fetch(`/api/orders/${id}/cancel`, {
      //   method: 'POST'
      // });
      // const data = await response.json();
      
      // Mock API response delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === id 
          ? { ...order, status: 'cancelled', dateUpdated: new Date().toISOString() } 
          : order
      ));
      
      return true;
    } catch (err) {
      setError('Failed to cancel order');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelOrder
  };
} 