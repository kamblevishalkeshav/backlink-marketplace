'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Listing, ListingStatus } from '@/types/listing';
import { CheckCircle, Loader2, Trash, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    domain: 'example.com',
    category: 'Technology',
    da: 55,
    traffic: 12000,
    price: 150,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    domain: 'newsblog.net',
    category: 'News',
    da: 70,
    traffic: 85000,
    price: 300,
    status: 'approved',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    domain: 'fashionista.co',
    category: 'Fashion',
    da: 45,
    traffic: 5000,
    price: 90,
    status: 'rejected',
    createdAt: new Date().toISOString(),
  },
];

export default function ListingTable() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | ListingStatus>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setIsLoading(false);
    }, 500);
  }, []);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch = l.domain.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status ? l.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }, [listings, search, status]);

  const handleApprove = (id: string) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'approved' } : l)));
  };

  const handleReject = (id: string) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'rejected' } : l)));
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this listing?')) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Search domain…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />

          <div className="flex items-center gap-2">
            {(['', 'pending', 'approved', 'rejected'] as ('' | ListingStatus)[]).map((s) => (
              <Button
                key={s || 'all'}
                variant={status === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatus(s)}
              >
                {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-t">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left">Domain</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">DA</th>
                <th className="px-4 py-2 text-left">Traffic</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No listings found.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-t">
                    <td className="px-4 py-2 font-medium text-gray-900">{l.domain}</td>
                    <td className="px-4 py-2">{l.category}</td>
                    <td className="px-4 py-2">{l.da}</td>
                    <td className="px-4 py-2">{l.traffic.toLocaleString()}</td>
                    <td className="px-4 py-2">${l.price}</td>
                    <td className="px-4 py-2">
                      <Badge variant={l.status === 'approved' ? 'default' : l.status === 'pending' ? 'outline' : 'destructive'}>
                        {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                      {l.status === 'pending' && (
                        <Button size="icon" variant="outline" onClick={() => handleApprove(l.id)}>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {l.status !== 'rejected' && (
                        <Button size="icon" variant="outline" onClick={() => handleReject(l.id)}>
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                      <Button size="icon" variant="outline" onClick={() => handleDelete(l.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 