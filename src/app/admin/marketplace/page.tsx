'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card/index';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Listing } from '@/types/listing';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Copy,
    DollarSign,
    FileEdit,
    FilterX,
    Globe,
    LinkIcon,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
    Star,
    Trash2,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock data for demonstration - adding more items for pagination testing
const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    website: {
      domain: 'techblog.com',
      verified: true,
      tags: ['technology', 'programming'],
    },
    price: 249,
    offerRate: 10,
    isFavorite: true,
    type: {
      listingType: 'guest-post',
      permanent: true,
      wordCount: 800,
      workingDays: 5,
      contentWriter: 'both',
    },
    approx: {
      workingDays: 5,
    },
    language: {
      primary: 'English',
      native: 'English',
    },
    category: 'Technology',
    metrics: {
      countryCode: 'US',
      dr: {
        value: 72,
        percentage: '+8%',
      },
      da: 65,
      as: 70,
      traffic: 125000,
      keywords: 8500,
      refDomains: 320,
    },
    niches: ['Technology', 'Programming', 'Web Development'],
    status: 'approved',
    createdAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: '2',
    website: {
      domain: 'fitnesslife.com',
      verified: true,
      tags: ['fitness', 'health'],
    },
    price: 189,
    type: {
      listingType: 'homepage-link',
      permanent: false,
      months: 6,
      wordCount: 0,
      workingDays: 2,
      contentWriter: 'publisher',
    },
    approx: {
      workingDays: 2,
    },
    language: {
      primary: 'English',
      native: 'English',
    },
    category: 'Health',
    metrics: {
      countryCode: 'US',
      dr: {
        value: 54,
        percentage: '+3%',
      },
      da: 48,
      as: 50,
      traffic: 75000,
      keywords: 5200,
      refDomains: 180,
    },
    niches: ['Fitness', 'Health', 'Wellness'],
    status: 'approved',
    createdAt: new Date(2023, 6, 22).toISOString(),
  },
  {
    id: '3',
    website: {
      domain: 'traveldiaries.com',
      verified: false,
      tags: ['travel', 'adventure'],
    },
    price: 320,
    isFavorite: false,
    type: {
      listingType: 'guest-post',
      permanent: true,
      wordCount: 1200,
      workingDays: 7,
      contentWriter: 'you',
    },
    approx: {
      workingDays: 7,
    },
    language: {
      primary: 'English',
      native: 'English',
    },
    category: 'Travel',
    metrics: {
      countryCode: 'GB',
      dr: {
        value: 63,
        percentage: '+5%',
      },
      da: 58,
      as: 62,
      traffic: 92000,
      keywords: 6800,
      refDomains: 240,
    },
    niches: ['Travel', 'Tourism', 'Adventure'],
    status: 'pending',
    createdAt: new Date(2023, 7, 10).toISOString(),
  },
];

// Generate more mock data for testing pagination
for (let i = 4; i <= 15; i++) {
  MOCK_LISTINGS.push({
    id: `${i}`,
    website: {
      domain: `example${i}.com`,
      verified: i % 3 === 0,
      tags: ['sample', `tag${i}`],
    },
    price: 100 + (i * 10),
    isFavorite: i % 5 === 0,
    type: {
      listingType: i % 2 === 0 ? 'guest-post' : 'homepage-link',
      permanent: i % 2 === 0,
      wordCount: i % 2 === 0 ? 800 : 0,
      workingDays: 3,
      contentWriter: i % 3 === 0 ? 'you' : i % 3 === 1 ? 'publisher' : 'both',
    },
    approx: {
      workingDays: 3,
    },
    language: {
      primary: 'English',
      native: 'English',
    },
    category: i % 3 === 0 ? 'Technology' : i % 3 === 1 ? 'Health' : 'Travel',
    metrics: {
      countryCode: i % 3 === 0 ? 'US' : i % 3 === 1 ? 'GB' : 'CA',
      dr: {
        value: 40 + i,
        percentage: '+2%',
      },
      da: 35 + i,
      as: 38 + i,
      traffic: 10000 * i,
      keywords: 1000 * i,
      refDomains: 50 + (i * 5),
    },
    niches: i % 3 === 0 
      ? ['Technology', 'Programming'] 
      : i % 3 === 1 
        ? ['Health', 'Fitness'] 
        : ['Travel', 'Adventure'],
    status: i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected',
    createdAt: new Date(2023, i % 12, i + 1).toISOString(),
  });
}

export default function AdminMarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Bulk actions state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Advanced filtering
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    statuses: [] as string[],
    priceRange: [0, 1000] as [number, number],
    drRange: [0, 100] as [number, number],
    trafficMin: 0 as number,
    isVerified: null as boolean | null,
  });
  
  // Get unique options for filters
  const uniqueCategories = [...new Set(MOCK_LISTINGS.map(listing => listing.category))];
  const uniqueTypes = [...new Set(MOCK_LISTINGS.map(listing => listing.type.listingType))];
  const uniqueStatuses = [...new Set(MOCK_LISTINGS.map(listing => listing.status))];
  
  // Price range bounds
  const minPrice = Math.min(...MOCK_LISTINGS.map(listing => listing.price));
  const maxPrice = Math.max(...MOCK_LISTINGS.map(listing => listing.price));
  
  useEffect(() => {
    // Initialize price range based on actual data
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice]
    }));
    
    // Simulate API fetch delay
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setListings(MOCK_LISTINGS);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [minPrice, maxPrice]);
  
  const toggleFilter = (type: 'categories' | 'types' | 'statuses', value: string) => {
    setFilters(prev => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      types: [],
      statuses: [],
      priceRange: [minPrice, maxPrice],
      drRange: [0, 100],
      trafficMin: 0,
      isVerified: null,
    });
    setSearchQuery('');
    setCurrentPage(1);
  };
  
  // Filter listings based on all criteria
  const filteredListings = listings.filter(listing => {
    // Text search
    const matchesSearch = 
      searchQuery === '' ||
      listing.website.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.niches.some(niche => niche.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(listing.category);
    
    // Type filter
    const matchesType = 
      filters.types.length === 0 || 
      filters.types.includes(listing.type.listingType);
    
    // Status filter
    const matchesStatus = 
      filters.statuses.length === 0 || 
      filters.statuses.includes(listing.status);
    
    // Price range
    const matchesPrice = 
      listing.price >= filters.priceRange[0] && 
      listing.price <= filters.priceRange[1];
    
    // DR range
    const matchesDR = 
      listing.metrics.dr.value >= filters.drRange[0] && 
      listing.metrics.dr.value <= filters.drRange[1];
    
    // Traffic minimum
    const matchesTraffic = 
      listing.metrics.traffic >= filters.trafficMin;
    
    // Verification status
    const matchesVerification = 
      filters.isVerified === null || 
      listing.website.verified === filters.isVerified;
    
    return matchesSearch && 
           matchesCategory && 
           matchesType && 
           matchesStatus && 
           matchesPrice && 
           matchesDR && 
           matchesTraffic && 
           matchesVerification;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  // Reset pagination to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  const toggleFavorite = (id: string) => {
    setListings(prevListings =>
      prevListings.map(listing =>
        listing.id === id ? { ...listing, isFavorite: !listing.isFavorite } : listing
      )
    );
  };
  
  const deleteListing = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prevListings => prevListings.filter(listing => listing.id !== id));
    }
  };
  
  // Stats calculations
  const totalListings = listings.length;
  const averagePrice = totalListings ? Math.round(listings.reduce((sum, listing) => sum + listing.price, 0) / totalListings) : 0;
  const verifiedListings = listings.filter(listing => listing.website.verified).length;
  const averageDR = totalListings ? Math.round(listings.reduce((sum, listing) => sum + listing.metrics.dr.value, 0) / totalListings) : 0;
  
  const statCards = [
    {
      title: 'Total Listings',
      value: totalListings.toString(),
      icon: <LinkIcon className="h-5 w-5 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Average Price',
      value: `$${averagePrice}`,
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Verified Domains',
      value: `${verifiedListings} (${Math.round((verifiedListings / totalListings) * 100) || 0}%)`,
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Average DR',
      value: averageDR.toString(),
      icon: <TrendingUp className="h-5 w-5 text-amber-600" />,
      color: 'bg-amber-50 text-amber-600',
    },
  ];
  
  // Handle bulk selection
  const toggleSelectAll = () => {
    if (selectedIds.length === currentItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map(item => item.id));
    }
  };
  
  const toggleSelectItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} listings?`)) {
      setListings(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };
  
  const handleBulkFavorite = () => {
    setListings(prev => 
      prev.map(item => 
        selectedIds.includes(item.id) 
          ? { ...item, isFavorite: true }
          : item
      )
    );
    setSelectedIds([]);
  };
  
  const clearSelection = () => {
    setSelectedIds([]);
  };
  
  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace Listings</h1>
        <Link href="/admin/marketplace/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </Link>
      </div>
      
      {/* Stats Dashboard */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-4 sm:p-6 flex items-center">
                <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <Card className="mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search domains, categories or niches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </Button>
              {(filters.categories.length > 0 || 
                filters.types.length > 0 || 
                filters.statuses.length > 0 || 
                filters.isVerified !== null || 
                filters.trafficMin > 0 ||
                filters.priceRange[0] > minPrice ||
                filters.priceRange[1] < maxPrice ||
                filters.drRange[0] > 0 ||
                filters.drRange[1] < 100) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex items-center text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-100 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-sm mb-2">Categories</h3>
                  <div className="space-y-2">
                    {uniqueCategories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleFilter('categories', category)}
                        />
                        <Label 
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Listing Types */}
                <div>
                  <h3 className="font-medium text-sm mb-2">Listing Type</h3>
                  <div className="space-y-2">
                    {uniqueTypes.map(type => (
                      <div key={type} className="flex items-center">
                        <Checkbox 
                          id={`type-${type}`}
                          checked={filters.types.includes(type)}
                          onCheckedChange={() => toggleFilter('types', type)}
                        />
                        <Label 
                          htmlFor={`type-${type}`}
                          className="ml-2 text-sm font-normal cursor-pointer"
                        >
                          {type.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <h3 className="font-medium text-sm mb-2">Status</h3>
                  <div className="space-y-2">
                    {uniqueStatuses.map(status => (
                      <div key={status} className="flex items-center">
                        <Checkbox 
                          id={`status-${status}`}
                          checked={filters.statuses.includes(status)}
                          onCheckedChange={() => toggleFilter('statuses', status)}
                        />
                        <Label 
                          htmlFor={`status-${status}`}
                          className="ml-2 text-sm font-normal cursor-pointer"
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* More Filters */}
                <div>
                  <h3 className="font-medium text-sm mb-2">More Filters</h3>
                  
                  {/* Verification */}
                  <div className="mb-4">
                    <Label className="text-sm font-normal mb-2">Verification</Label>
                    <Select
                      value={filters.isVerified === null ? "any" : filters.isVerified ? "verified" : "unverified"}
                      onValueChange={(value) => {
                        setFilters(prev => ({
                          ...prev,
                          isVerified: value === "any" ? null : value === "verified"
                        }));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any status</SelectItem>
                        <SelectItem value="verified">Verified only</SelectItem>
                        <SelectItem value="unverified">Unverified only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-normal">Price Range</Label>
                      <span className="text-xs text-gray-500">
                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={minPrice}
                      max={maxPrice}
                      step={5}
                      value={filters.priceRange}
                      onValueChange={(value) => {
                        setFilters(prev => ({
                          ...prev,
                          priceRange: value as [number, number]
                        }));
                        setCurrentPage(1);
                      }}
                      className="py-2"
                    />
                  </div>
                  
                  {/* DR Range */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-normal">DR Range</Label>
                      <span className="text-xs text-gray-500">
                        {filters.drRange[0]} - {filters.drRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={filters.drRange}
                      onValueChange={(value) => {
                        setFilters(prev => ({
                          ...prev,
                          drRange: value as [number, number]
                        }));
                        setCurrentPage(1);
                      }}
                      className="py-2"
                    />
                  </div>
                  
                  {/* Min Traffic */}
                  <div>
                    <Label htmlFor="minTraffic" className="text-sm font-normal mb-2">Min. Traffic</Label>
                    <Input
                      id="minTraffic"
                      type="number"
                      min="0"
                      value={filters.trafficMin}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          trafficMin: parseInt(e.target.value) || 0
                        }));
                        setCurrentPage(1);
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-3 py-3 text-left w-10">
                  <Checkbox 
                    checked={selectedIds.length > 0 && selectedIds.length === currentItems.length}
                    onCheckedChange={toggleSelectAll}
                    className="rounded-sm"
                  />
                </th>
                <th className="px-6 py-3 text-left">Domain</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Type</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">DR/DA</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Traffic</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left hidden sm:table-cell">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <div className="h-6 w-6 border-2 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-3"></div>
                      Loading listings...
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    No listings found
                  </td>
                </tr>
              ) : (
                currentItems.map((listing) => (
                  <tr key={listing.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(listing.id) ? 'bg-indigo-50' : ''}`}>
                    <td className="px-3 py-4">
                      <Checkbox 
                        checked={selectedIds.includes(listing.id)}
                        onCheckedChange={() => toggleSelectItem(listing.id)}
                        className="rounded-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleFavorite(listing.id)}
                          className={`mr-2 focus:outline-none ${
                            listing.isFavorite ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'
                          }`}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                        <div>
                          <div className="font-medium text-gray-900">{listing.website.domain}</div>
                          <div className="text-xs text-gray-500 mt-1 flex gap-1 flex-wrap">
                            {/* Mobile-only info */}
                            <div className="md:hidden flex flex-col gap-1 mt-1">
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium">Type:</span>
                                <span className="capitalize">{listing.type.listingType.replace('-', ' ')}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium">DR:</span>
                                <span>{listing.metrics.dr.value}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium">Traffic:</span>
                                <span>{(listing.metrics.traffic/1000).toFixed(0)}K</span>
                              </div>
                            </div>
                            
                            {/* Niches tags */}
                            <div className="sm:hidden mt-2"></div> {/* Spacer for mobile */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.niches.slice(0, 2).map((niche, i) => (
                                <span key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                                  {niche}
                                </span>
                              ))}
                              {listing.niches.length > 2 && (
                                <span className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                                  +{listing.niches.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{listing.category}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="capitalize">{listing.type.listingType.replace('-', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div>DR {listing.metrics.dr.value}</div>
                      <div>DA {listing.metrics.da}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{listing.metrics.traffic.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-indigo-700">${listing.price}</span>
                      {listing.offerRate && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          -{listing.offerRate}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        listing.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : listing.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/marketplace/edit/${listing.id}`}
                              className="cursor-pointer flex items-center"
                            >
                              <FileEdit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleFavorite(listing.id)}
                            className="cursor-pointer"
                          >
                            <Star className={`mr-2 h-4 w-4 ${listing.isFavorite ? 'text-amber-400 fill-current' : ''}`} />
                            <span>{listing.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              navigator.clipboard.writeText(listing.website.domain);
                              // Would add toast notification in a real app
                            }}
                            className="cursor-pointer"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy Domain</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteListing(listing.id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="bg-indigo-50 p-4 border-t border-indigo-100 flex items-center justify-between">
            <div className="text-sm font-medium text-indigo-700">
              {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSelection}
                className="h-8 px-2 text-xs"
              >
                Cancel
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkFavorite}
                className="h-8 px-2 text-xs flex items-center"
              >
                <Star className="h-3 w-3 mr-1" />
                Add to Favorites
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleBulkDelete}
                className="h-8 px-2 text-xs flex items-center"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
        
        {!loading && filteredListings.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 gap-4">
            <div className="text-sm text-gray-500 order-2 sm:order-1">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredListings.length)} of {filteredListings.length} results
            </div>
            <div className="flex items-center space-x-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(pageNumber)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === pageNumber 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                          : 'text-gray-700'
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                }
                return null;
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 order-3">
              <span className="text-sm text-gray-500">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-8 rounded border border-gray-300 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 