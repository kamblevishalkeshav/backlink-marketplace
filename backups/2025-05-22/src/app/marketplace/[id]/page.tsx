'use client';

import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Listing, useListings } from '@/hooks/useListings';
import {
    ArrowLeft,
    Clock,
    ExternalLink,
    Globe,
    Info,
    Loader2,
    Shield,
    TrendingUp,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OrderForm from './OrderForm';

export default function ListingDetail({ params }: { params: { id: string } }) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { fetchListingById, loading, error } = useListings();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      const result = await fetchListingById(params.id);
      if (result) {
        setListing(result);
      }
    };

    fetchListing();
  }, [fetchListingById, params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
        <p className="text-muted-foreground">Loading listing details...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-muted/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-primary">Listing Not Found</h3>
          <p className="text-muted-foreground mb-6">
            The listing you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link 
        href="/marketplace" 
        className="inline-flex items-center text-sm text-secondary hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listing details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">{listing.website}</h1>
              <span className="bg-accent/20 text-secondary text-sm font-medium px-3 py-1 rounded-full">
                {listing.category}
              </span>
            </div>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className="bg-primary/5 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Domain Authority</span>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-accent" />
                    <span className="font-medium">{listing.domainAuthority}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Domain Rating</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-accent" />
                    <span className="font-medium">{listing.domainRating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Monthly Traffic</span>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1 text-accent" />
                    <span className="font-medium">{listing.traffic}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Link Type</span>
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1 text-accent" />
                    <span className="font-medium">{listing.linkType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mb-8">
            <Card className="border-muted">
              <CardHeader className="bg-primary/5 border-b border-muted">
                <CardTitle className="text-primary">Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Website</dt>
                    <dd className="mt-1 flex items-center">
                      <a 
                        href={listing.domain} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary hover:underline flex items-center transition-colors"
                      >
                        {listing.website}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Price</dt>
                    <dd className="mt-1 font-semibold text-primary">{listing.price}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Turnaround Time</dt>
                    <dd className="mt-1 flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-accent" />
                      {listing.turnaroundTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Indexing</dt>
                    <dd className="mt-1">{listing.indexing}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Language</dt>
                    <dd className="mt-1">{listing.language}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Accepted Anchors</dt>
                    <dd className="mt-1">{listing.acceptedAnchors}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {listing.requirements && (
              <Card className="border-muted">
                <CardHeader className="bg-primary/5 border-b border-muted">
                  <CardTitle className="text-primary">Requirements</CardTitle>
                  <CardDescription>Content requirements for this listing</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc pl-5 space-y-2">
                    {listing.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="text-sm">{requirement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Order section */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card className="border-muted">
              <CardHeader className="bg-primary/5 border-b border-muted">
                <CardTitle className="text-primary">Order Backlink</CardTitle>
                <CardDescription>Get a backlink from {listing.website}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!showOrderForm ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">Price</span>
                        <span className="font-bold text-primary">{listing.price}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="h-4 w-4 mr-1 text-secondary" />
                        <span>Delivery in {listing.turnaroundTime}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-primary">Secure Transaction</h4>
                          <p className="text-sm text-secondary mt-1">
                            Payment is held in escrow until you verify the backlink is live.
                          </p>
                        </div>
                      </div>
                    </div>

                    {listing.publisherInfo && (
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-secondary">About the Publisher</h4>
                            <div className="text-sm text-secondary/80 mt-1 space-y-1">
                              <p>Name: {listing.publisherInfo.name}</p>
                              <p>Registered since: {listing.publisherInfo.registeredSince}</p>
                              <p>Completed orders: {listing.publisherInfo.completedOrders}</p>
                              <p>Rating: {listing.publisherInfo.rating}/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      onClick={() => setShowOrderForm(true)}
                    >
                      Place Order
                    </Button>
                  </div>
                ) : (
                  <OrderForm 
                    listingId={listing.id} 
                    price={parseInt(listing.price.replace(/\D/g, ''))}
                    onCancel={() => setShowOrderForm(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 