'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Listing, ListingStatus } from '@/types/listing';
import { CheckCircle, Edit, Loader2, Plus, Trash, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ListingFormModal from './ListingFormModal';

export default function ListingTable() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | ListingStatus>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  // Fetch listings from API
  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/listings');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      setListings(data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load listings. Please try again.",
        variant: "destructive",
      });
      // Fall back to empty array
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch = l.website.domain.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status ? l.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }, [listings, search, status]);

  const handleApprove = async (id: string) => {
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      const response = await fetch(`/api/admin/listings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve listing');
      }

      // Update locally
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'approved' } : l)));
      toast({
        title: "Success",
        description: "Listing has been approved.",
      });
    } catch (error) {
      console.error('Error approving listing:', error);
      toast({
        title: "Error",
        description: "Failed to approve listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const handleReject = async (id: string) => {
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      const response = await fetch(`/api/admin/listings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reject listing');
      }

      // Update locally
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'rejected' } : l)));
      toast({
        title: "Success",
        description: "Listing has been rejected.",
      });
    } catch (error) {
      console.error('Error rejecting listing:', error);
      toast({
        title: "Error",
        description: "Failed to reject listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing? This action cannot be undone.')) return;
    
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete listing');
      }

      // Remove from local state
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast({
        title: "Success",
        description: "Listing has been deleted.",
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const handleSave = async (listingData: Omit<Listing, 'id' | 'status' | 'createdAt'>) => {
    if (editingListing) {
      // Editing existing listing
      try {
        const response = await fetch(`/api/listings/${editingListing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listingData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to update listing');
        }

        const updatedListing = await response.json();
        setListings(prev => prev.map(l => l.id === editingListing.id ? updatedListing : l));
        toast({
          title: "Success",
          description: "Listing has been updated.",
        });
        setShowEditModal(false);
        setEditingListing(null);
      } catch (error) {
        console.error('Error updating listing:', error);
        toast({
          title: "Error",
          description: "Failed to update listing. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Redirect to the multi-step form for creating new listings
      router.push('/admin/marketplace/create');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Filters and Add Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-2/3">
              <Input
                placeholder="Search domains..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/2"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as '' | ListingStatus)}
                className="border rounded px-3 py-2 w-full sm:w-1/2 bg-white"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <Button 
              className="self-start flex items-center gap-1"
              onClick={() => router.push('/admin/marketplace/create')}
            >
              <Plus size={16} />
              Add Listing
            </Button>
          </div>

          {/* Listings Table */}
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border-b">Website</th>
                  <th className="text-left p-3 border-b">Type</th>
                  <th className="text-left p-3 border-b">Price</th>
                  <th className="text-center p-3 border-b">DR</th>
                  <th className="text-center p-3 border-b">DA</th>
                  <th className="text-left p-3 border-b">Status</th>
                  <th className="text-center p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-gray-500">
                      No listings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 border-b">
                      <td className="p-3">
                        <div className="font-medium">{listing.website.domain}</div>
                        <div className="text-sm text-gray-500">{listing.niches.join(', ')}</div>
                      </td>
                      <td className="p-3">
                        <div>{listing.type.listingType.replace(/-/g, ' ')}</div>
                        <div className="text-sm text-gray-500">
                          {listing.type.permanent ? 'Permanent' : `${listing.type.months} month${listing.type.months !== 1 ? 's' : ''}`}
                        </div>
                      </td>
                      <td className="p-3 font-medium">${listing.price}</td>
                      <td className="p-3 text-center">
                        <span className="font-medium">{listing.metrics.dr.value}</span>
                        <span className="text-xs text-green-600 ml-1">
                          {listing.metrics.dr.percentage}
                        </span>
                      </td>
                      <td className="p-3 text-center font-medium">{listing.metrics.da}</td>
                      <td className="p-3">
                        <Badge variant={
                          listing.status === 'approved' ? 'success' :
                          listing.status === 'rejected' ? 'destructive' : 'default'
                        }>
                          {listing.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          {listing.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApprove(listing.id)}
                                disabled={processingIds.has(listing.id)}
                              >
                                {processingIds.has(listing.id) ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleReject(listing.id)}
                                disabled={processingIds.has(listing.id)}
                              >
                                {processingIds.has(listing.id) ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                          >
                            <Link href={`/admin/marketplace/edit/${listing.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(listing.id)}
                            disabled={processingIds.has(listing.id)}
                          >
                            {processingIds.has(listing.id) ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit modal */}
      {showEditModal && editingListing && (
        <ListingFormModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingListing(null);
          }}
          onSubmit={handleSave}
          initialData={editingListing}
        />
      )}
    </>
  );
} 