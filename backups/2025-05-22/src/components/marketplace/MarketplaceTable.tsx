import AhrefsLogo from '@/components/icons/AhrefsLogo';
import MozLogo from '@/components/icons/MozLogo';
import SemrushLogo from '@/components/icons/SemrushLogo';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ArrowUpDown, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns, ExternalLink, Eye, EyeOff, FileText, Heart, Image, Info, Square, SquareCheck, TextIcon, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Define column structure
interface ColumnDef {
  id: string;
  name: string;
  width: string;
  minWidth?: string;
  sortable?: boolean;
  icon?: React.ReactNode;
  iconSize?: number;
}

// Define mock data types
interface Listing {
  id: string;
  price: number;
  isFavorite?: boolean;
  website: {
    domain: string;
    verified: boolean;
    tags?: string[];
  };
  type: {
    listingType: 'innerpage-link' | 'guest-post' | 'homepage-link' | 'sitewide-link';
    permanent: boolean;
    months?: number;
    wordCount: number;
    workingDays: number;
    contentWriter: 'both' | 'you' | 'publisher';
  };
  approx: {
    workingDays: number;
    wordCount?: number;
  };
  language: {
    primary: string;
    native: string;
    extra?: string;
  };
  category: string;
  metrics: {
    countryCode: string;
    dr: {
      value: number;
      percentage: string;
    };
  da: number;
  as: number;
  traffic: number;
  keywords: number;
  refDomains: number;
  };
  niches: string[];
  acceptedContent?: {
    casino?: 'accepted' | 'not-accepted' | 'prohibited';
    finance?: 'accepted' | 'not-accepted' | 'prohibited';
    erotic?: 'accepted' | 'not-accepted' | 'prohibited';
    dating?: 'accepted' | 'not-accepted' | 'prohibited';
    crypto?: 'accepted' | 'not-accepted' | 'prohibited';
    cbd?: 'accepted' | 'not-accepted' | 'prohibited';
    medicine?: 'accepted' | 'not-accepted' | 'prohibited';
  };
  publisherNote?: string;
  created: string;
}

interface MarketplaceTableProps {
  className?: string;
}

const MarketplaceTable = ({ className = '' }: MarketplaceTableProps) => {
  // Create a ref for column settings dropdown
  const columnSettingsRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentPage: contextCurrentPage, 
    setCurrentPage: contextSetCurrentPage, 
    totalPages: contextTotalPages,
  } = useMarketplace();

  // Local state for development
  const [currentPage, setCurrentPage] = useState(contextCurrentPage || 1);
  const [totalPages] = useState(contextTotalPages || 5);
  const [activeListingType, setActiveListingType] = useState('guest-posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [loading] = useState(false);
  
  // State to manage visible columns - start with exactly 8 columns
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>([]);
  
  // Show content options popup
  const [activeContentOptions, setActiveContentOptions] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<{ [key: string]: string }>({});
  const [selectedTier, setSelectedTier] = useState<{ [key: string]: string }>({});
  
  // Comparison feature
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const comparisonModalRef = useRef<HTMLDivElement>(null);
  
  // Add state for info tooltip
  const [showInfoTooltip, setShowInfoTooltip] = useState<string | null>(null);
  
  // Add state for country traffic card
  const [activeCountryTraffic, setActiveCountryTraffic] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [isChartAnimating, setIsChartAnimating] = useState(false);
  
  // Add state for metric rating cards
  const [activeMetric, setActiveMetric] = useState<{id: string, metric: 'dr' | 'da' | 'as'} | null>(null);
  const [isMetricAnimating, setIsMetricAnimating] = useState(false);
  
  // Add state for niche tooltip
  const [activeNicheTooltip, setActiveNicheTooltip] = useState<{id: string, niche: string} | null>(null);
  
  // Helper function to determine TAT display text
  const getTATDisplayText = (workingDays: number) => {
    if (workingDays <= 0) return ''; // Handle invalid values
    
    if (workingDays < 7) {
      // Less than a week, show in days
      return `${workingDays} working ${workingDays === 1 ? 'day' : 'days'}`;
    } else if (workingDays < 30) {
      // Less than a month, show in weeks
      const weeks = Math.round(workingDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    } else {
      // Show in months
      const months = Math.round(workingDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  // Effect to handle clicks outside the column settings dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnSettingsRef.current && !columnSettingsRef.current.contains(event.target as Node)) {
        setShowColumnSettings(false);
      }
    };
    
    if (showColumnSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnSettings]);
  
  // Effect to sync with context when page changes
  useEffect(() => {
    if (currentPage !== contextCurrentPage && contextSetCurrentPage) {
      contextSetCurrentPage(currentPage);
    }
  }, [currentPage, contextCurrentPage, contextSetCurrentPage]);

  // Effect to handle clicks outside the comparison modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comparisonModalRef.current && !comparisonModalRef.current.contains(event.target as Node)) {
        setShowComparison(false);
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowComparison(false);
      }
    };
    
    if (showComparison) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showComparison]);

  // Mock data for development and testing
  const mockListings: Listing[] = useMemo(() => [
    {
      id: '1',
      price: 100,
      isFavorite: false,
      website: {
        domain: 'example1.com',
        verified: true,
        tags: ['media consumption', 'mobile devices', 'technology updates']
      },
      type: {
        listingType: 'guest-post',
        permanent: true,
        months: 0,
        wordCount: 600,
        workingDays: 6,
        contentWriter: 'both'
      },
      approx: {
        workingDays: 3,
        wordCount: 1000,
      },
      language: {
        primary: 'English',
        native: 'English',
      },
      category: 'Technology',
      metrics: {
        countryCode: 'US',
        dr: {
          value: 45,
          percentage: '+5%',
        },
        da: 38,
        as: 32,
        traffic: 15000,
        keywords: 2500,
        refDomains: 120,
      },
      niches: ['Tech', 'Software', 'SaaS'],
      acceptedContent: {
        casino: 'not-accepted',
        finance: 'accepted',
        erotic: 'prohibited',
        dating: 'not-accepted',
        crypto: 'accepted',
        cbd: 'prohibited',
        medicine: 'not-accepted'
      },
      publisherNote: 'No affiliate links allowed.',
      created: '2023-08-15',
    },
    {
      id: '2',
      price: 150,
      isFavorite: true,
      website: {
        domain: 'example2.com',
        verified: false,
        tags: ['automotive technology', 'blog', 'industry news']
      },
      type: {
        listingType: 'guest-post',
        permanent: false,
        months: 12,
        wordCount: 600,
        workingDays: 2,
        contentWriter: 'you'
      },
      approx: {
        workingDays: 5,
      },
      language: {
        primary: 'English',
        native: 'English',
        extra: 'Spanish content available',
      },
      category: 'Marketing',
      metrics: {
        countryCode: 'UK',
        dr: {
          value: 62,
          percentage: '+12%',
        },
        da: 53,
        as: 42,
        traffic: 35000,
        keywords: 6000,
        refDomains: 450,
      },
      niches: ['Marketing', 'SEO', 'Digital Marketing'],
      acceptedContent: {
        casino: 'accepted',
        finance: 'accepted',
        erotic: 'not-accepted',
        dating: 'accepted',
        crypto: 'not-accepted',
        cbd: 'accepted',
        medicine: 'accepted'
      },
      created: '2023-09-20',
    }
  ], []);

  // Define all available columns with percentage-based widths for the first 8 columns
  const allColumns: ColumnDef[] = useMemo(() => [
    { id: 'price', name: 'Price', width: 'w-[11%]', sortable: true },
    { id: 'website', name: 'Website', width: 'w-[11%]', sortable: true },
    { id: 'type', name: 'Type', width: 'w-[11%]', sortable: true },
    { id: 'language', name: 'Language', width: 'w-[11%]' },
    { id: 'category', name: 'Category', width: 'w-[11%]' },
    { id: 'country', name: 'Country', width: 'w-[11%]', icon: <AhrefsLogo width={30} height={20} /> },
    { id: 'dr', name: 'DR', width: 'w-[11%]', sortable: true, icon: <AhrefsLogo width={30} height={20} /> },
    { id: 'da', name: 'DA', width: 'w-[11%]', sortable: true, icon: <MozLogo width={30} height={20} /> },
    { id: 'as', name: 'AS', width: 'w-[11%]', sortable: true, icon: <SemrushLogo width={30} height={20} /> },
    { id: 'traffic', name: 'Traffic', width: 'w-[120px]', minWidth: 'min-w-[120px]', sortable: true, icon: <AhrefsLogo width={30} height={20} /> },
    { id: 'keywords', name: 'Keywords', width: 'w-[120px]', minWidth: 'min-w-[120px]', sortable: true, icon: <AhrefsLogo width={30} height={20} /> },
    { id: 'refDomains', name: 'Ref. Domains', width: 'w-[120px]', minWidth: 'min-w-[120px]', sortable: true, icon: <AhrefsLogo width={30} height={20} /> },
    { id: 'niches', name: 'Niches', width: 'w-[150px]', minWidth: 'min-w-[150px]' },
    { id: 'publisherNote', name: 'Publisher Note', width: 'w-[180px]', minWidth: 'min-w-[180px]' },
    { id: 'created', name: 'Created', width: 'w-[120px]', minWidth: 'min-w-[120px]', sortable: true },
    { id: 'actions', name: '', width: 'w-[70px]', minWidth: 'min-w-[70px]' },
  ], []);

  // Initialize visibleColumnIds after allColumns is defined
  useEffect(() => {
    if (visibleColumnIds.length === 0 && allColumns.length > 0) {
      setVisibleColumnIds(allColumns.slice(0, 8).map(col => col.id));
    }
  }, [allColumns, visibleColumnIds.length]);
  
  // Define isColumnVisible function
  const isColumnVisible = useCallback((columnId: string) => {
    return visibleColumnIds.includes(columnId);
  }, [visibleColumnIds]);
  
  // Check if the price column is visible
  const isPriceVisible = useMemo(() => {
    return visibleColumnIds.includes('price');
  }, [visibleColumnIds]);
  
  // Calculate visible columns
  const visibleColumns = useMemo(() => {
    return allColumns
      .filter(col => isColumnVisible(col.id))
      .map(col => col.id);
  }, [visibleColumnIds, allColumns, isColumnVisible]);

  // Get classes for price column when it should be sticky
  const getPriceColumnClass = useCallback(() => {
    const baseClass = "px-2 py-2 whitespace-nowrap";
    
    // Only make it sticky if it's among the visible columns
    if (isPriceVisible) {
      return `${baseClass} sticky left-0 z-10 bg-white shadow-[1px_0_0_0_#e5e7eb]`;
    }
    
    return baseClass;
  }, [isPriceVisible]);

  // Get classes for price header when it should be sticky
  const getPriceHeaderClass = useCallback(() => {
    const baseClass = "whitespace-nowrap px-2 py-0.5 text-left font-medium text-xs bg-gray-50";
    
    // Only make it sticky if it's among the visible columns
    if (isPriceVisible) {
      return `${baseClass} sticky left-0 z-10 shadow-[1px_0_0_0_#e5e7eb]`;
    }
    
    return baseClass;
  }, [isPriceVisible]);

  const handleTabChange = (tab: string) => {
    setActiveListingType(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Toggle a column's visibility
  const toggleColumn = (columnId: string) => {
    setVisibleColumnIds(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  // Toggle all columns
  const toggleAllColumns = () => {
    if (visibleColumnIds.length === allColumns.length) {
      setVisibleColumnIds([]);
    } else {
      setVisibleColumnIds(allColumns.map(col => col.id));
    }
  };

  // Calculate filtered data based on tabs and search
  const filteredListings = useMemo(() => {
    return mockListings.filter(listing => {
      // Filter by listing type tab
      const typeMatch = activeListingType === 'guest-posts' ? listing.type.listingType === 'guest-post' : 
                      activeListingType === 'homepage-links' ? listing.type.listingType === 'homepage-link' :
                      activeListingType === 'innerpage-links' ? listing.type.listingType === 'innerpage-link' :
                      listing.type.listingType === 'sitewide-link';
  
      // Filter by search term
      const searchMatch = searchTerm ? 
        (listing.website.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.niches.some(niche => niche.toLowerCase().includes(searchTerm.toLowerCase()))) :
        true;
  
      return typeMatch && searchMatch;
    });
  }, [activeListingType, searchTerm, mockListings]);

  // Calculate minimum table width when showing more than 8 columns
  const calculateMinTableWidth = useCallback(() => {
    if (visibleColumns.length <= 8) {
      return '100%'; // Use full container width for 8 or fewer columns
    }

    // Calculate width for first 8 columns (% of container) plus fixed width for additional columns
    const firstEightWidth = '100%'; // 100% of container
    
    // For columns beyond 8, add fixed widths
    const additionalColumns = allColumns
      .filter(col => isColumnVisible(col.id) && !visibleColumns.slice(0, 8).includes(col.id));
    
    const additionalWidth = additionalColumns.reduce((total, col) => {
      // Extract numeric width from the width string (e.g., w-[120px] -> 120)
      const widthMatch = col.width.match(/\[(\d+)px\]/);
      const width = widthMatch ? parseInt(widthMatch[1], 10) : 120;
      return total + width;
    }, 0);
    
    // Return a string with calc expression
    return `calc(${firstEightWidth} + ${additionalWidth}px)`;
  }, [visibleColumns, allColumns, isColumnVisible]);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    // In a real app, you would update this via API
    // For this demo, we'll just update the local state
    
    // Create a new array with the updated listing
    // const updatedListings = mockListings.map(listing => {
    //   if (listing.id === id) {
    //     return {
    //       ...listing,
    //       isFavorite: !listing.isFavorite
    //     };
    //   }
    //   return listing;
    // });
    
    // In a real app, you would update the state via context or redux
    console.log('Toggled favorite for listing', id);
  };
  
  // Handle opening the URL
  const openUrl = (url: string) => {
    window.open(`https://${url}`, '_blank');
  };
  
  // Show screenshot preview
  const showScreenshot = (domain: string) => {
    // In a real app, you would show a modal with the screenshot
    console.log('Showing screenshot for', domain);
    // Example implementation could be:
    // 1. Show a modal
    // 2. Load screenshot from an API like urlbox.io, screenshotapi.net, etc.
    // 3. Display the image
    alert(`Showing screenshot for ${domain}`);
  };

  // Simplify the showContentOptions function
  const showContentOptions = (id: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Toggle the content options visibility
    setActiveContentOptions(prev => prev === id ? null : id);
    
    // Reset any existing info tooltips
    setShowInfoTooltip(null);
  };

  // Use ref for tooltip timer
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update info tooltip handler to use click instead of hover
  const handleInfoClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    // Toggle tooltip visibility
    const tooltipId = `info-${id}`;
    const isCurrentlyVisible = showInfoTooltip === tooltipId;
    
    // Clear any existing tooltips
    setShowInfoTooltip(isCurrentlyVisible ? null : tooltipId);
    
    // If we're opening the tooltip, set a timer to close it
    if (!isCurrentlyVisible) {
      // Clear any existing timers first
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
      
      // Set new timer
      tooltipTimerRef.current = setTimeout(() => {
        setShowInfoTooltip(current => current === tooltipId ? null : current);
        tooltipTimerRef.current = null;
      }, 3000);
    }
  };

  // Select language handler
  const handleLanguageSelect = (id: string, language: string) => {
    setSelectedLanguage({
      ...selectedLanguage,
      [id]: language
    });
  };

  // Select tier handler
  const handleTierSelect = (id: string, tier: string) => {
    setSelectedTier({
      ...selectedTier,
      [id]: tier
    });
  };

  // Toggle a listing for comparison
  const toggleListingForComparison = (id: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(listingId => listingId !== id);
      } else {
        if (prev.length >= 3) {
          // Limit to 3 listings for comparison
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };
  
  // Open comparison modal
  const openComparisonModal = () => {
    if (selectedForComparison.length > 0) {
      setShowComparison(true);
    }
  };
  
  // Clear all selected listings
  const clearComparisonSelections = () => {
    setSelectedForComparison([]);
  };
  
  // Get listings selected for comparison
  const listingsForComparison = useMemo(() => {
    return mockListings.filter(listing => selectedForComparison.includes(listing.id));
  }, [mockListings, selectedForComparison]);

  // Add a checkbox column to visibleColumnIds if it's not already there
  useEffect(() => {
    if (visibleColumnIds.length > 0 && !visibleColumnIds.includes('checkbox')) {
      setVisibleColumnIds(prev => ['checkbox', ...prev]);
    }
  }, [visibleColumnIds]);

  // Add checkbox column to allColumns if it's not already there
  const allColumnsWithCheckbox = useMemo(() => {
    const hasCheckbox = allColumns.some(col => col.id === 'checkbox');
    if (!hasCheckbox) {
      return [
        { id: 'checkbox', name: '', width: 'w-[40px]', minWidth: 'min-w-[40px]' },
        ...allColumns
      ];
    }
    return allColumns;
  }, [allColumns]);

  // Add a click outside handler for content options
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (activeContentOptions && 
          !(e.target as Element).closest(`[id^="trigger-"]`) &&
          !(e.target as Element).closest('.content-options-card')) {
        setActiveContentOptions(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [activeContentOptions]);

  // Function to show country traffic breakdown
  const showCountryTraffic = (id: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Toggle country traffic visibility
    if (activeCountryTraffic !== id) {
      setActiveCountryTraffic(id);
      setIsChartAnimating(true);
      
      // Reset animation flag after animation completes
      setTimeout(() => setIsChartAnimating(false), 1000);
    } else {
      setActiveCountryTraffic(null);
    }
  };
  
  // Add a click outside handler for country traffic card
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (activeCountryTraffic && 
          !(e.target as Element).closest(`[id^="country-"]`) &&
          !(e.target as Element).closest('.country-traffic-card')) {
        setActiveCountryTraffic(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [activeCountryTraffic]);
  
  // Function to show metric rating card (DR, DA, AS)
  const showMetricRating = (id: string, metric: 'dr' | 'da' | 'as', event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Toggle metric rating card visibility
    if (!activeMetric || activeMetric.id !== id || activeMetric.metric !== metric) {
      setActiveMetric({ id, metric });
      setIsMetricAnimating(true);
      
      // Reset animation flag after animation completes
      setTimeout(() => setIsMetricAnimating(false), 1000);
    } else {
      setActiveMetric(null);
    }
  };
  
  // Add a click outside handler for metric rating cards
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (activeMetric && 
          !(e.target as Element).closest(`[id^="metric-"]`) &&
          !(e.target as Element).closest('.metric-rating-card')) {
        setActiveMetric(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [activeMetric]);

  // Get country flag emoji based on country code
  const getCountryFlag = (countryCode: string) => {
    // Simple approach using flag emoji unicode
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <>
      <div className={`border border-gray-200 rounded-md overflow-visible ${className}`}>
        {/* Add animation styles */}
        <style jsx global>{`
          @keyframes pop-in {
            0% {
              opacity: 0;
              transform: translateX(-50%) translateY(-45%) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateX(-50%) translateY(-50%) scale(1);
            }
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .animate-pop-in {
            animation: pop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: top center;
          }

          .animate-fade-in {
            animation: fade-in 0.15s ease-in;
          }
          
          /* Chart segment animations */
          @keyframes fillChart {
            0% { stroke-dasharray: 0 251.2; }
            100% { stroke-dasharray: 251.2 0; }
          }
          
          @keyframes fillChartSegment {
            0% { stroke-dasharray: 0 251.2; }
            100% { stroke-dasharray: var(--dash-value) 251.2; }
          }
          
          .segment-animated {
            animation: fillChart 1s ease-in-out forwards;
          }
          
          .segment-animated-partial {
            animation: fillChartSegment 1s ease-in-out forwards;
          }
          
          .segment-hovered {
            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3));
          }
          
          @keyframes gauge-fill {
            0% { stroke-dasharray: 0, 140; }
            100% { stroke-dasharray: calc(var(--value) * 1.4), 140; }
          }
          
          .animate-gauge-fill {
            animation: gauge-fill 1s ease-out forwards;
          }
        `}</style>
        
        {/* Search bar with Column Settings and Compare button */}
        <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2 bg-white">
          <div className="flex items-center gap-2 relative" ref={columnSettingsRef}>
            <button 
              onClick={() => setShowColumnSettings(!showColumnSettings)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs py-0.5 px-1.5 rounded hover:bg-gray-100 transition-colors"
              aria-label="Toggle column visibility settings"
            >
              <Columns size={12} />
              <span className="text-xs">Columns</span>
            </button>
            
            {/* Column Settings Dropdown */}
            {showColumnSettings && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 w-[260px] p-1.5">
                <div className="border-b border-gray-200 pb-1 mb-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-xs">Column Visibility</h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setVisibleColumnIds(allColumns.slice(0, 8).map(col => col.id))}
                        className="text-[10px] bg-blue-50 text-blue-600 py-0.5 px-1 rounded hover:bg-blue-100"
                      >
                        Default (8)
                      </button>
                      <button
                        onClick={toggleAllColumns}
                        className="text-[10px] bg-gray-50 text-gray-600 py-0.5 px-1 rounded hover:bg-gray-100"
                      >
                        {visibleColumns.length === allColumns.length ? "Hide All" : "Show All"}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="max-h-[280px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-0.5">
                    {allColumns.map((column, index) => (
                      <div 
                        key={column.id}
                        className={`flex items-center justify-between py-0.5 px-1.5 rounded cursor-pointer hover:bg-gray-50 ${index < 8 ? 'border-l-2 border-blue-300' : ''}`}
                        onClick={() => toggleColumn(column.id)}
                      >
                        <span className="text-[10px] text-gray-700 flex items-center gap-1">
                          {isColumnVisible(column.id) ? (
                            <Eye size={10} className="text-blue-500" />
                          ) : (
                            <EyeOff size={10} className="text-gray-400" />
                          )}
                          {column.name}
                          {index < 8 && (
                            <span className="ml-1 text-[8px] text-blue-500">Default</span>
                          )}
              </span>
                        <div className={`w-3 h-3 rounded-sm flex items-center justify-center ${isColumnVisible(column.id) ? 'bg-blue-500' : 'border border-gray-300'}`}>
                          {isColumnVisible(column.id) && (
                            <Check size={8} className="text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {selectedForComparison.length > 0 && (
              <div className="flex items-center animate-slide-in">
                <button
                  onClick={openComparisonModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded transition-colors mr-2 flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Compare selected listings"
                >
                  <span className="mr-1">Compare</span>
                  <span className="inline-flex items-center justify-center bg-white bg-opacity-20 rounded-full h-4 w-4 text-[10px] font-bold group-hover:animate-pulse">
                    {selectedForComparison.length}
              </span>
                </button>
                <button
                  onClick={clearComparisonSelections}
                  className="text-gray-500 hover:text-gray-700 text-xs py-0.5 px-1.5 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Clear selection"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search websites or niches"
                className="py-1 pl-2.5 pr-7 text-xs border border-gray-300 rounded-md w-56"
                onChange={handleSearch}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        {/* Listing type tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex space-x-1 px-4 overflow-x-auto">
            <button
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap ${activeListingType === 'guest-posts' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleTabChange('guest-posts')}
            >
              Guest posts
            </button>
            <button
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap ${activeListingType === 'homepage-links' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleTabChange('homepage-links')}
            >
              Homepage links
            </button>
            <button
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap ${activeListingType === 'innerpage-links' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleTabChange('innerpage-links')}
            >
              Innerpage links
            </button>
            <button
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap ${activeListingType === 'sitewide-links' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleTabChange('sitewide-links')}
            >
              Sitewide links
            </button>
          </div>
        </div>
        
        {/* Table with horizontal scrolling */}
        <div className="overflow-visible bg-white relative">
          <div 
            className="w-full overflow-x-auto overflow-y-visible scroll-smooth"
            style={{ 
              width: '100%',
              maxWidth: '100%',
              overflowX: 'auto',
              overflowY: 'visible',
              position: 'relative'
            }}
          >
            <div className="relative overflow-visible">
              <table className="w-full divide-y divide-gray-200 text-sm font-bold" style={{ width: calculateMinTableWidth() }}>
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    {allColumnsWithCheckbox.map(column => (
                      isColumnVisible(column.id) && (
                        <th 
                          key={column.id}
                          className={column.id === 'price' ? getPriceHeaderClass() : 
                                   column.id === 'checkbox' ? 'whitespace-nowrap px-2 py-2 text-center w-[40px] min-w-[40px]' :
                                   `whitespace-nowrap px-2 py-2 text-left font-medium text-xs ${column.icon ? 'text-center' : ''}`}
                          style={{ 
                            width: column.id === 'checkbox' ? '40px' :
                                   visibleColumns.indexOf(column.id) < 8 && column.id !== 'checkbox' ? 
                                   `${100 / Math.min(8, visibleColumns.filter(id => id !== 'checkbox').length)}%` : 
                                   column.width.replace('w-', '')
                          }}
                        >
                          {column.id === 'checkbox' ? (
                            <div className="flex justify-center">
                              {selectedForComparison.length > 0 ? (
                                <button 
                                  onClick={clearComparisonSelections}
                                  className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                  aria-label="Clear all selections"
                                >
                                  <X size={14} />
                                </button>
                              ) : (
                                <span className="text-gray-400">
                                  <Square size={14} />
                                </span>
                              )}
                            </div>
                          ) : column.icon ? (
                            <div className="flex flex-col items-center justify-center">
                              {column.icon}
                              <div className="flex items-center justify-center mt-1">
                                <span className="text-[10px] text-gray-600 font-medium">{column.name}</span>
                                {column.sortable && <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400" />}
                              </div>
                            </div>
                          ) : column.id === 'actions' ? (
                            <Columns className="w-3 h-3 mx-auto" />
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 font-medium">{column.name}</span>
                              {column.sortable && <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400" />}
                            </div>
                          )}
            </th>
                      )
                    ))}
          </tr>
        </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={visibleColumns.length || 1} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                          <span className="ml-2 text-gray-500">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredListings.length === 0 ? (
                    <tr>
                      <td colSpan={visibleColumns.length || 1} className="text-center py-8 text-gray-500">
                        No listings found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredListings.map((listing) => (
                      <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                        {isColumnVisible('checkbox') && (
                          <td className="whitespace-nowrap p-3 text-center">
                <button
                              onClick={() => toggleListingForComparison(listing.id)}
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-blue-50 transition-colors"
                              aria-label={selectedForComparison.includes(listing.id) ? "Remove from comparison" : "Add to comparison"}
                            >
                              {selectedForComparison.includes(listing.id) ? (
                                <SquareCheck size={16} className="text-blue-500 animate-pop-in" />
                              ) : (
                                <Square size={16} className="text-gray-300 hover:text-blue-400 transition-colors" />
                              )}
                </button>
              </td>
                        )}
                        
                        {isColumnVisible('price') && (
                          <td className={getPriceColumnClass()}>
                            <div className="flex items-center">
                              <button className="bg-green-500 text-white text-xs font-medium py-1 px-2 rounded-md mr-2">
                                Buy
                              </button>
                              <span className="font-medium">{listing.price} USD</span>
                <button
                                className="ml-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-1 hover:bg-pink-50 transition-colors" 
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(listing.id); }}
                                aria-label={listing.isFavorite ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Heart 
                                  className={`h-4 w-4 transition-all duration-300 ${listing.isFavorite ? 'fill-pink-500 text-pink-500 animate-heartbeat' : 'text-gray-400 hover:text-pink-500'}`} 
                                />
                </button>
                            </div>
              </td>
                        )}
                        
                        {isColumnVisible('website') && (
                          <td className="whitespace-nowrap p-3">
                            <div className="flex flex-col">
                              <div className="flex items-center mb-1">
                                <a 
                                  href={`https://${listing.website.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline mr-1"
                                >
                                  {listing.website.domain}
                                </a>
                                {listing.website.verified && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                  </svg>
                                )}
                                <button 
                                  className="ml-2 text-gray-400 hover:text-blue-500 focus:outline-none"
                                  onClick={(e) => { e.stopPropagation(); openUrl(listing.website.domain); }}
                                  aria-label="Open website"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  className="ml-1 text-gray-400 hover:text-blue-500 focus:outline-none"
                                  onClick={(e) => { e.stopPropagation(); showScreenshot(listing.website.domain); }}
                                  aria-label="View screenshot"
                                >
                                  <Image className="h-3.5 w-3.5" />
                                </button>
                </div>
                              
                              {listing.website.tags && listing.website.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                                  {listing.website.tags.map((tag, tagIndex) => (
                                    <span 
                                      key={tagIndex} 
                                      className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                </div>
              </td>
                        )}
                        
                        {isColumnVisible('type') && (
                          <td className="whitespace-nowrap p-3 relative">
                            <div className="flex flex-col gap-1.5 group hover:bg-gray-50 rounded-md p-1 transition-colors duration-150">
                              {/* Type label with split design - refined to match reference exactly */}
                              <div className="rounded-md overflow-hidden shadow-sm">
                                <div className="flex bg-green-50">
                                  <div className="py-1.5 px-2.5 text-xs font-medium flex-grow text-green-800">
                                    {listing.type.listingType === 'guest-post' ? 'Guest post' : 
                                     listing.type.listingType === 'homepage-link' ? 'Homepage link' :
                                     listing.type.listingType === 'innerpage-link' ? 'Innerpage link' : 'Sitewide link'}
                                  </div>
                                  <div className="py-1.5 px-2.5 text-xs text-green-700 font-medium">
                                    {listing.type.permanent ? 'Permanent' : `${listing.type.months} months`}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Content Writer and Word count with improved design - now clickable */}
                              <div
                                id={`trigger-${listing.id}`}
                                className="flex items-center bg-gray-50 rounded-md px-2 py-1.5 mt-1 hover:bg-gray-100 transition-colors cursor-pointer group relative"
                                onClick={(e) => showContentOptions(listing.id, e)}
                              >
                                <div className="flex items-center">
                                  <FileText size={14} className="text-gray-500 mr-1.5 group-hover:text-blue-500 transition-colors" />
                                  <span 
                                    className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                                  >
                                    {listing.type.contentWriter === 'both' ? 'Both' : 
                                     listing.type.contentWriter === 'you' ? 'You' : 'Publisher'}
                                  </span>
                                </div>
                                <div className="mx-2 h-3 border-r border-gray-300"></div>
                                <div className="flex items-center">
                                  <TextIcon size={14} className="text-gray-500 mr-1.5 group-hover:text-blue-500 transition-colors" />
                                  <span 
                                    className="text-xs text-gray-700 group-hover:text-blue-600 transition-colors"
                                  >
                                    {listing.type.wordCount} words
                                  </span>
                                </div>
                                <ChevronDown 
                                  size={12} 
                                  className={`ml-1.5 text-gray-400 group-hover:text-blue-500 transition-transform duration-200 ${activeContentOptions === listing.id ? 'rotate-180' : ''}`}
                                />
                                
                                {/* New simplified content options popup - Moved inside the button element */}
                                {activeContentOptions === listing.id && (
                                  <div 
                                    className="content-options-card absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg"
                                    style={{ 
                                      width: '540px',
                                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                      top: '100%',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      marginTop: '10px'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex w-full overflow-hidden">
                                      {/* LEFT SECTION */}
                                      <div className="w-[320px] p-2 flex flex-col gap-2 border-r border-gray-200">
                                        {/* Content options header */}
                                        <div className="flex items-center justify-between mb-1">
                                          <div className="flex items-center">
                                            <FileText size={12} className="text-gray-400 mr-1.5 flex-shrink-0" />
                                            <h3 className="text-[11px] font-medium text-gray-700 truncate">Content options</h3>
                                          </div>
                                          <button
                                            onClick={() => setActiveContentOptions(null)}
                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                          >
                                            <X size={14} />
                                          </button>
                                        </div>
                                        
                                        {/* By you & By publisher section */}
                                        <div className="bg-white rounded-md p-2">
                                          <div className="mb-2">
                                            <div className="flex items-start gap-1.5" style={{ minWidth: 0 }}>
                                              <Check size={11} className="text-green-500 mt-0.5 flex-shrink-0" />
                                              <div style={{ minWidth: 0, width: "100%" }}>
                                                <h4 className="text-[11px] font-medium text-gray-700 mb-0.5 truncate">By you:</h4>
                                                <p className="text-[10px] text-gray-500 leading-tight break-words whitespace-normal" style={{ maxWidth: "100%" }}>
                                                  You can provide your own article or choose a <span className="font-medium text-gray-600">content product</span> and our copywriters will handle it for you.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="flex items-start gap-1.5" style={{ minWidth: 0 }}>
                                            <Check size={11} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <div style={{ minWidth: 0, width: "100%" }}>
                                              <h4 className="text-[11px] font-medium text-gray-700 mb-0.5 truncate">By publisher:</h4>
                                              <p className="text-[10px] text-gray-500 leading-tight break-words whitespace-normal" style={{ maxWidth: "100%" }}>
                                                Article by publisher price: <span className="font-medium text-gray-700">Free</span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Word count requirements */}
                                        <div className="bg-white rounded-md p-2">
                                          <div className="flex items-center mb-1">
                                            <TextIcon size={11} className="text-gray-500 mr-1.5" />
                                            <h4 className="text-[11px] font-medium text-gray-700">Word count requirements</h4>
                                          </div>
                                          <p className="text-[10px] text-gray-500 leading-tight ml-5 break-words whitespace-normal" style={{ maxWidth: "100%" }}>
                                            Minimum word count is <span className="font-medium text-gray-700">600 words</span>.
                                          </p>
                                        </div>
                                      </div>
                                      
                                      {/* RIGHT SECTION - further reduced width */}
                                      <div className="w-[220px] p-2">
                                        {/* Content Products header */}
                                        <div className="flex items-center justify-between mb-2">
                                          <h3 className="text-[11px] font-medium text-gray-700 truncate pr-1">Content Products by MeUp</h3>
                                          <button 
                                            className={`w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-full ${showInfoTooltip === `info-${listing.id}` ? 'text-blue-500 bg-blue-50' : ''}`}
                                            aria-label="Learn more about Content Products"
                                            onClick={(e) => handleInfoClick(listing.id, e)}
                                          >
                                            <Info size={10} />
                                          </button>
                                          {showInfoTooltip === `info-${listing.id}` && (
                                            <div className="absolute top-0 right-6 w-44 p-1.5 bg-gray-800 text-white text-[9px] rounded shadow-lg z-50 animate-fade-in">
                                              Content products are written by professional copywriters
                                              <div className="absolute top-1/2 right-0 w-2 h-2 -mr-1 transform -translate-y-1/2 rotate-45 bg-gray-800"></div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Product tiers - Now vertical */}
                                        <div className="flex flex-col gap-2.5">
                                          {/* Basic Tier */}
                                          <div 
                                            className={`bg-white border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm ${selectedTier[listing.id] === 'basic' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                                            onClick={() => handleTierSelect(listing.id, 'basic')}
                                            tabIndex={0}
                                            role="radio"
                                            aria-checked={selectedTier[listing.id] === 'basic'}
                                            onKeyDown={(e) => e.key === 'Enter' && handleTierSelect(listing.id, 'basic')}
                                          >
                                            <div className="p-2">
                                              <h4 className="font-medium text-[11px] mb-1">Basic</h4>
                                              <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center">
                                                  <TextIcon size={10} className="text-gray-500 mr-1" />
                                                  <span className="text-[10px] font-medium">600 words</span>
                                                </div>
                                                <span className="font-medium text-[10px] text-gray-700">25 USD</span>
                                              </div>
                                              <div className="relative">
                                                <select 
                                                  className="w-full py-0.5 px-2 text-[9px] border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                  value={selectedLanguage[listing.id] === 'english-basic' ? 'english-basic' : ''}
                                                  onChange={(e) => handleLanguageSelect(listing.id, e.target.value)}
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  <option value="english-basic">English</option>
                                                  <option value="french-basic">French</option>
                                                  <option value="german-basic">German</option>
                                                  <option value="spanish-basic">Spanish</option>
                                                </select>
                                                <ChevronDown size={9} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Basic+ Tier */}
                                          <div 
                                            className={`bg-white border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm ${selectedTier[listing.id] === 'basic-plus' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                                            onClick={() => handleTierSelect(listing.id, 'basic-plus')}
                                            tabIndex={0}
                                            role="radio"
                                            aria-checked={selectedTier[listing.id] === 'basic-plus'}
                                            onKeyDown={(e) => e.key === 'Enter' && handleTierSelect(listing.id, 'basic-plus')}
                                          >
                                            <div className="p-2">
                                              <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-medium text-[11px]">Basic+</h4>
                                                <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full shadow-sm">
                                                  Popular
                                                </div>
                                              </div>
                                              <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center">
                                                  <TextIcon size={10} className="text-gray-500 mr-1" />
                                                  <span className="text-[10px] font-medium">1000 words</span>
                                                </div>
                                                <span className="font-medium text-[10px] text-gray-700">35 USD</span>
                                              </div>
                                              <div className="relative">
                                                <select 
                                                  className="w-full py-0.5 px-2 text-[9px] border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                  value={selectedLanguage[listing.id] === 'english-plus' ? 'english-plus' : ''}
                                                  onChange={(e) => handleLanguageSelect(listing.id, e.target.value)}
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  <option value="english-plus">English</option>
                                                  <option value="french-plus">French</option>
                                                  <option value="german-plus">German</option>
                                                  <option value="spanish-plus">Spanish</option>
                                                </select>
                                                <ChevronDown size={9} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Small arrow pointing to button */}
                                    <div 
                                      className="absolute h-3 w-3 transform rotate-45 bg-white border-t border-l border-gray-200"
                                      style={{
                                        top: '-6px',
                                        left: '50%',
                                        marginLeft: '-6px'
                                      }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                              
                              {/* TAT (Turn Around Time) display */}
                              <div className="flex items-center bg-gray-50 rounded-md px-2 py-1.5 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-1.5">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="text-xs text-gray-700">
                                  Approx. {getTATDisplayText(listing.approx.workingDays)} TAT
                                </span>
                              </div>
                            </div>
              </td>
                        )}
                        
                        {isColumnVisible('language') && (
                          <td className="whitespace-nowrap p-3">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold">{listing.language.primary}</span>
                              {listing.language.extra && (
                                <span className="text-xs text-gray-500">{listing.language.extra}</span>
                              )}
                </div>
              </td>
                        )}
                        
                        {isColumnVisible('category') && (
                          <td className="whitespace-nowrap p-3">
                            <span className="text-xs font-bold">{listing.category}</span>
                          </td>
                        )}
                        
                        {isColumnVisible('country') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <div
                              id={`country-${listing.id}`}
                              className="inline-flex items-center justify-center bg-gray-100 rounded-sm px-2 py-1 cursor-pointer hover:bg-gray-200 relative"
                              onClick={(e) => showCountryTraffic(listing.id, e)}
                              onMouseEnter={(e) => showCountryTraffic(listing.id, e)}
                            >
                              <span className="text-sm mr-1.5">{getCountryFlag(listing.metrics.countryCode)}</span>
                              <span className="text-xs font-bold">{listing.metrics.countryCode}</span>
                              <ChevronDown size={12} className={`ml-1.5 text-gray-400 transition-transform duration-200 ${activeCountryTraffic === listing.id ? 'rotate-180' : ''}`} />
                              
                              {/* Country traffic breakdown card */}
                              {activeCountryTraffic === listing.id && (
                                <div 
                                  className="country-traffic-card absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg"
                                  style={{ 
                                    width: '320px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '5px'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="text-sm font-medium text-gray-700">Organic traffic by country</h3>
                                      <button
                                        onClick={() => setActiveCountryTraffic(null)}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                    
                                    {/* Chart and breakdown */}
                                    <div className="relative">
                                      {/* Donut chart - smaller size */}
                                      <div className="flex justify-center py-3">
                                        <div className="relative w-36 h-36 overflow-visible">
                                          {/* Colored donut segments */}
                                          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full overflow-visible" style={{ margin: '-10px' }}>
                                            {(() => {
                                              // Country traffic data
                                              const countries = [
                                                { id: 'other', name: 'Other countries', percent: 0.62, color: '#ff9d5c', traffic: Math.round(listing.metrics.traffic * 0.62) },
                                                { id: 'us', name: 'United States', percent: 0.20, color: '#3b82f6', traffic: Math.round(listing.metrics.traffic * 0.20) },
                                                { id: 'turkey', name: 'Turkey', percent: 0.09, color: '#06b6d4', traffic: Math.round(listing.metrics.traffic * 0.09) },
                                                { id: 'india', name: 'India', percent: 0.08, color: '#fbbf24', traffic: Math.round(listing.metrics.traffic * 0.08) }
                                              ];
                                              
                                              const circumference = 2 * Math.PI * 40; // 2πr where r=40
                                              let cumulativePercent = 0;
                                              
                                              return (
                                                <>
                                                  {/* Background circle */}
                                                  <circle 
                                                    cx="60" 
                                                    cy="60" 
                                                    r="40" 
                                                    fill="transparent" 
                                                    stroke="#f3f4f6" 
                                                    strokeWidth="12"
                                                  />
                                                  
                                                  {/* Country segments */}
                                                  {countries.map((country) => {
                                                    const dashValue = country.percent * circumference;
                                                    const dashOffset = -cumulativePercent * circumference;
                                                    cumulativePercent += country.percent;
                                                    
                                                    // Calculate angle for percentage label
                                                    const midAngle = (cumulativePercent - country.percent/2) * 2 * Math.PI - (Math.PI/2);
                                                    const labelRadius = 46;
                                                    const labelX = 60 + labelRadius * Math.cos(midAngle);
                                                    const labelY = 60 + labelRadius * Math.sin(midAngle);
                                                    
                                                    return (
                                                      <g key={country.id}>
                                                        <circle
                                                          cx="60"
                                                          cy="60"
                                                          r="40"
                                                          fill="transparent"
                                                          stroke={country.color}
                                                          strokeWidth="12"
                                                          strokeDasharray={isChartAnimating ? "0 251.2" : `${dashValue} ${circumference - dashValue}`}
                                                          strokeDashoffset={dashOffset}
                                                          transform="rotate(-90 60 60)"
                                                          style={{ 
                                                            transition: 'all 0.2s ease-out',
                                                            strokeWidth: hoveredSegment === country.id ? '16' : '12',
                                                            transform: hoveredSegment === country.id ? `scale(1.05)` : 'scale(1)',
                                                            transformOrigin: 'center',
                                                            transformBox: 'fill-box',
                                                            '--dash-value': dashValue
                                                          } as React.CSSProperties}
                                                          className={isChartAnimating ? 
                                                            (country.id === 'other' ? 'segment-animated' : 'segment-animated-partial') : 
                                                            (hoveredSegment === country.id ? 'segment-hovered' : '')}
                                                          onMouseEnter={() => setHoveredSegment(country.id)}
                                                          onMouseLeave={() => setHoveredSegment(null)}
                                                        />
                                                        
                                                        {/* Percentage label */}
                                                        <text
                                                          x={labelX}
                                                          y={labelY}
                                                          textAnchor="middle"
                                                          dominantBaseline="middle"
                                                          fill={country.color}
                                                          fontSize="9"
                                                          fontWeight="bold"
                                                          style={{ opacity: isChartAnimating ? 0 : 1, transition: 'opacity 0.5s ease' }}
                                                        >
                                                          {Math.round(country.percent * 100)}%
                                                        </text>
                                                      </g>
                                                    );
                                                  })}
                                                  
                                                  {/* Center text */}
                                                  <g>
                                                    {hoveredSegment ? (
                                                      // Show specific country traffic when hovering
                                                      <text 
                                                        x="60" 
                                                        y="58" 
                                                        textAnchor="middle" 
                                                        dominantBaseline="middle"
                                                        className="transition-all duration-300"
                                                      >
                                                        <tspan 
                                                          x="50" 
                                                          textAnchor="middle" 
                                                          dominantBaseline="middle" 
                                                          fontSize="13"
                                                          fontWeight="bold"
                                                          fill={countries.find(c => c.id === hoveredSegment)?.color || '#374151'}
                                                        >
                                                          {countries.find(c => c.id === hoveredSegment)?.traffic.toLocaleString()}
                                                        </tspan>
                                                        <tspan 
                                                          x="50" 
                                                          y="60" 
                                                          textAnchor="middle" 
                                                          dominantBaseline="middle" 
                                                          fontSize="7"
                                                          fill="#6B7280"
                                                        >
                                                          {countries.find(c => c.id === hoveredSegment)?.name}
                                                        </tspan>
                                                      </text>
                                                    ) : (
                                                      // Show total traffic by default
                                                      <text 
                                                        x="50" 
                                                        y="48" 
                                                        textAnchor="middle" 
                                                        dominantBaseline="middle"
                                                        className="transition-all duration-300"
                                                      >
                                                        <tspan 
                                                          x="50" 
                                                          textAnchor="middle" 
                                                          dominantBaseline="middle" 
                                                          fontSize="13"
                                                          fontWeight="bold"
                                                          fill="#374151"
                                                        >
                                                          {listing.metrics.traffic.toLocaleString()}
                                                        </tspan>
                                                        <tspan 
                                                          x="50" 
                                                          y="60" 
                                                          textAnchor="middle" 
                                                          dominantBaseline="middle" 
                                                          fontSize="7"
                                                          fill="#6B7280"
                                                        >
                                                          Total Traffic
                                                        </tspan>
                                                      </text>
                                                    )}
                                                  </g>
                                                </>
                                              );
                                            })()}
                                          </svg>
                                        </div>
                                      </div>
                                      
                                      {/* Color coded country list - more compact */}
                                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
                                        <div 
                                          className="flex items-center cursor-pointer hover:bg-gray-50 p-0.5 rounded"
                                          onMouseEnter={() => setHoveredSegment('us')}
                                          onMouseLeave={() => setHoveredSegment(null)}
                                        >
                                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-1.5"></div>
                                          <span className="text-xs">United States</span>
                                        </div>
                                        <div 
                                          className="flex items-center cursor-pointer hover:bg-gray-50 p-0.5 rounded"
                                          onMouseEnter={() => setHoveredSegment('turkey')}
                                          onMouseLeave={() => setHoveredSegment(null)}
                                        >
                                          <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mr-1.5"></div>
                                          <span className="text-xs">Turkey</span>
                                        </div>
                                        <div 
                                          className="flex items-center cursor-pointer hover:bg-gray-50 p-0.5 rounded"
                                          onMouseEnter={() => setHoveredSegment('india')}
                                          onMouseLeave={() => setHoveredSegment(null)}
                                        >
                                          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full mr-1.5"></div>
                                          <span className="text-xs">India</span>
                                        </div>
                                        <div 
                                          className="flex items-center cursor-pointer hover:bg-gray-50 p-0.5 rounded"
                                          onMouseEnter={() => setHoveredSegment('other')}
                                          onMouseLeave={() => setHoveredSegment(null)}
                                        >
                                          <div className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-1.5"></div>
                                          <span className="text-xs">Other countries</span>
                                        </div>
                                      </div>
                                      
                                      {/* Date info */}
                                      <div className="mt-2 text-center">
                                        <p className="text-[9px] text-gray-500">
                                          Last updated: <span className="font-medium">2023-05-03</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Small arrow pointing to button */}
                                  <div 
                                    className="absolute h-3 w-3 transform rotate-45 bg-white border-t border-l border-gray-200"
                                    style={{
                                      top: '-6px',
                                      left: '50%',
                                      marginLeft: '-6px'
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        
                        {isColumnVisible('dr') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <div 
                              id={`metric-dr-${listing.id}`}
                              className="flex flex-col items-center cursor-pointer relative"
                              onClick={(e) => showMetricRating(listing.id, 'dr', e)}
                              onMouseEnter={(e) => showMetricRating(listing.id, 'dr', e)}
                            >
                              <span className="text-xs font-bold bg-yellow-100 text-yellow-800 rounded-md px-2 py-1">{listing.metrics.dr.value}</span>
                              
                              {/* DR rating card */}
                              {activeMetric && activeMetric.id === listing.id && activeMetric.metric === 'dr' && (
                                <div 
                                  className="metric-rating-card absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg"
                                  style={{ 
                                    width: '160px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '5px'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3">
                                    {/* Semicircle gauge */}
                                    <div className="flex justify-center pb-2">
                                      <div className="relative h-24 w-40">
                                        <svg viewBox="0 0 100 50" className="w-full h-full">
                                          {/* Background semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#f3f4f6" 
                                            strokeWidth="10" 
                                            fill="none"
                                          />
                                          
                                          {/* Colored progress semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#fcd34d" 
                                            strokeWidth="8" 
                                            fill="none"
                                            strokeDasharray={`${listing.metrics.dr.value * 1.4}, 140`}
                                            strokeDashoffset="0"
                                            style={{ '--value': listing.metrics.dr.value } as React.CSSProperties}
                                            className={isMetricAnimating ? "animate-gauge-fill" : ""}
                                          />
                                          
                                          {/* Central text */}
                                          <text 
                                            x="50" 
                                            y="35" 
                                            textAnchor="middle" 
                                            dominantBaseline="middle"
                                            fontSize="16"
                                            fontWeight="bold"
                                            fill="#374151"
                                          >
                                            {listing.metrics.dr.value}/100
                                          </text>
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    {/* Label and date */}
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 font-medium">Domain rating</p>
                                      <p className="text-[9px] text-gray-500 mt-1">
                                        Last updated: <span className="font-medium">2025-05-03</span>
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Small arrow pointing to rating */}
                                  <div 
                                    className="absolute h-3 w-3 transform rotate-45 bg-white border-t border-l border-gray-200"
                                    style={{
                                      top: '-6px',
                                      left: '50%',
                                      marginLeft: '-6px'
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        
                        {isColumnVisible('da') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <div 
                              id={`metric-da-${listing.id}`}
                              className="flex flex-col items-center cursor-pointer relative"
                              onClick={(e) => showMetricRating(listing.id, 'da', e)}
                              onMouseEnter={(e) => showMetricRating(listing.id, 'da', e)}
                            >
                              <span className="text-xs font-bold bg-sky-100 text-sky-800 rounded-md px-2 py-1">{listing.metrics.da}</span>
                              
                              {/* DA rating card */}
                              {activeMetric && activeMetric.id === listing.id && activeMetric.metric === 'da' && (
                                <div 
                                  className="metric-rating-card absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg"
                                  style={{ 
                                    width: '160px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '5px'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3">
                                    {/* Semicircle gauge */}
                                    <div className="flex justify-center pb-2">
                                      <div className="relative h-24 w-40">
                                        <svg viewBox="0 0 100 50" className="w-full h-full">
                                          {/* Background semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#f3f4f6" 
                                            strokeWidth="10" 
                                            fill="none"
                                          />
                                          
                                          {/* Colored progress semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#7dd3fc" 
                                            strokeWidth="8" 
                                            fill="none"
                                            strokeDasharray={`${listing.metrics.da * 1.4}, 140`}
                                            strokeDashoffset="0"
                                            style={{ '--value': listing.metrics.da } as React.CSSProperties}
                                            className={isMetricAnimating ? "animate-gauge-fill" : ""}
                                          />
                                          
                                          {/* Central text */}
                                          <text 
                                            x="50" 
                                            y="35" 
                                            textAnchor="middle" 
                                            dominantBaseline="middle"
                                            fontSize="16"
                                            fontWeight="bold"
                                            fill="#374151"
                                          >
                                            {listing.metrics.da}/100
                                          </text>
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    {/* Label and date */}
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 font-medium">Domain authority</p>
                                      <p className="text-[9px] text-gray-500 mt-1">
                                        Last updated: <span className="font-medium">2025-05-03</span>
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Small arrow pointing to rating */}
                                  <div 
                                    className="absolute h-3 w-3 transform rotate-45 bg-white border-t border-l border-gray-200"
                                    style={{
                                      top: '-6px',
                                      left: '50%',
                                      marginLeft: '-6px'
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        
                        {isColumnVisible('as') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <div 
                              id={`metric-as-${listing.id}`}
                              className="flex flex-col items-center cursor-pointer relative"
                              onClick={(e) => showMetricRating(listing.id, 'as', e)}
                              onMouseEnter={(e) => showMetricRating(listing.id, 'as', e)}
                            >
                              <span className="text-xs font-bold bg-orange-100 text-orange-800 rounded-md px-2 py-1">{listing.metrics.as}</span>
                              
                              {/* AS rating card */}
                              {activeMetric && activeMetric.id === listing.id && activeMetric.metric === 'as' && (
                                <div 
                                  className="metric-rating-card absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg"
                                  style={{ 
                                    width: '160px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '5px'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3">
                                    {/* Semicircle gauge */}
                                    <div className="flex justify-center pb-2">
                                      <div className="relative h-24 w-40">
                                        <svg viewBox="0 0 100 50" className="w-full h-full">
                                          {/* Background semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#f3f4f6" 
                                            strokeWidth="10" 
                                            fill="none"
                                          />
                                          
                                          {/* Colored progress semicircle */}
                                          <path 
                                            d="M5,50 A45,45 0 0,1 95,50" 
                                            stroke="#fb923c" 
                                            strokeWidth="8" 
                                            fill="none"
                                            strokeDasharray={`${listing.metrics.as * 1.4}, 140`}
                                            strokeDashoffset="0"
                                            style={{ '--value': listing.metrics.as } as React.CSSProperties}
                                            className={isMetricAnimating ? "animate-gauge-fill" : ""}
                                          />
                                          
                                          {/* Central text */}
                                          <text 
                                            x="50" 
                                            y="35" 
                                            textAnchor="middle" 
                                            dominantBaseline="middle"
                                            fontSize="16"
                                            fontWeight="bold"
                                            fill="#374151"
                                          >
                                            {listing.metrics.as}/100
                                          </text>
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    {/* Label and date */}
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 font-medium">Authority Score</p>
                                      <p className="text-[9px] text-gray-500 mt-1">
                                        Last updated: <span className="font-medium">2025-05-07</span>
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Small arrow pointing to rating */}
                                  <div 
                                    className="absolute h-3 w-3 transform rotate-45 bg-white border-t border-l border-gray-200"
                                    style={{
                                      top: '-6px',
                                      left: '50%',
                                      marginLeft: '-6px'
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        
                        {isColumnVisible('traffic') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <span className="text-xs font-bold">
                              {listing.metrics.traffic.toLocaleString()}
                            </span>
                          </td>
                        )}
                        
                        {isColumnVisible('keywords') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <span className="text-xs font-bold">
                              {listing.metrics.keywords.toLocaleString()}
                            </span>
                          </td>
                        )}
                        
                        {isColumnVisible('refDomains') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <span className="text-xs font-bold">
                              {listing.metrics.refDomains.toLocaleString()}
                            </span>
                          </td>
                        )}
                        
                        {isColumnVisible('niches') && (
                          <td className="whitespace-nowrap p-3">
                            <div className="grid grid-cols-4 gap-1 w-[160px]">
                              {/* Casino Icon */}
                              {(listing.acceptedContent?.casino !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.casino === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'casino'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <rect x="2" y="4" width="20" height="16" rx="2" />
                                      <path d="M6 8h.01M12 8h.01M18 8h.01M6 12h.01M12 12h.01M18 12h.01" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'casino' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.casino === 'accepted' ? 'Accepts Casino content' : 'Does not accept Casino content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.casino === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* Finance/Trading Icon */}
                              {(listing.acceptedContent?.finance !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.finance === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'finance'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <path d="M2 2v20h20" />
                                      <path d="m5 12 5-4 4 4 5-8" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'finance' && (
                                      <div className="absolute z-10 w-52 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.finance === 'accepted' ? 'Accepts Finance/Trading content' : 'Does not accept Finance/Trading content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.finance === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* Erotic Icon */}
                              {(listing.acceptedContent?.erotic !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.erotic === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'erotic'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <div className="relative h-4 w-4 flex items-center justify-center">
                                      <div className="absolute inset-0 rounded-full border-2 border-current"></div>
                                      <span className="text-[9px] font-bold">18+</span>
                                    </div>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'erotic' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.erotic === 'accepted' ? 'Accepts Erotic content' : 'Does not accept Erotic content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.erotic === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* Dating Icon */}
                              {(listing.acceptedContent?.dating !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.dating === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'dating'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'dating' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.dating === 'accepted' ? 'Accepts Dating content' : 'Does not accept Dating content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.dating === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Crypto Icon */}
                              {(listing.acceptedContent?.crypto !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.crypto === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'crypto'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <circle cx="12" cy="12" r="10" />
                                      <path d="M9.5 9.5c.83-1.32 2.24-1.5 3-1.5 1.67 0 3 1 3 2.5s-1.33 2.5-3 2.5h0V15" />
                                      <line x1="12" y1="15" x2="12" y2="18" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'crypto' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.crypto === 'accepted' ? 'Accepts Crypto content' : 'Does not accept Crypto content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.crypto === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* CBD Icon */}
                              {(listing.acceptedContent?.cbd !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.cbd === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'cbd'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 22s8-4 8-10V4H8l-4 8h2v4l6 6z" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'cbd' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.cbd === 'accepted' ? 'Accepts CBD content' : 'Does not accept CBD content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.cbd === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* Medicine Icon */}
                              {(listing.acceptedContent?.medicine !== 'prohibited') && (
                                <div className="relative">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full ${listing.acceptedContent?.medicine === 'accepted' ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-50'}`}
                                    onMouseEnter={() => setActiveNicheTooltip({id: listing.id, niche: 'medicine'})}
                                    onMouseLeave={() => setActiveNicheTooltip(null)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 2a5 5 0 0 1 5 5v4h-2V7a3 3 0 1 0-6 0v4H7V7a5 5 0 0 1 5-5Z" />
                                      <path d="M3.5 11h17a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 19.5v-7A1.5 1.5 0 0 1 3.5 11Z" />
                                    </svg>
                                    {activeNicheTooltip?.id === listing.id && activeNicheTooltip?.niche === 'medicine' && (
                                      <div className="absolute z-10 w-44 bg-black bg-opacity-75 text-white text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 bottom-full mb-1">
                                        {listing.acceptedContent?.medicine === 'accepted' ? 'Accepts Medicine content' : 'Does not accept Medicine content'}
                                        <div className="absolute w-2 h-2 bg-black bg-opacity-75 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                                      </div>
                                    )}
                                    {listing.acceptedContent?.medicine === 'accepted' && (
                                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                                        x1
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        
                        {isColumnVisible('publisherNote') && (
                          <td className="whitespace-nowrap p-3">
                            <span className="text-xs text-gray-600">
                              {listing.publisherNote || 'No notes provided'}
                            </span>
                          </td>
                        )}
                        
                        {isColumnVisible('created') && (
                          <td className="whitespace-nowrap p-3">
                            <span className="text-xs">
                              {new Date(listing.created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </td>
                        )}
                        
                        {isColumnVisible('actions') && (
                          <td className="whitespace-nowrap p-3 text-center">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                              </svg>
                            </button>
                          </td>
                        )}
            </tr>
                    ))
                  )}
        </tbody>
      </table>

              {/* Scroll shadow indicator on the right */}
              {visibleColumns.length > 8 && (
                <div className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
              )}
    </div>
          </div>
        </div>
        
        {/* Add horizontal scroll indicator */}
        <div className="flex justify-end items-center px-4 py-1 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          <span>
            {visibleColumns.length > 8 && (
              <>
                <span className="mr-1">
                  Showing {Math.min(8, visibleColumns.length)} of {visibleColumns.length} columns
                </span>
                <span className="inline-flex items-center">
                  <ChevronRight size={12} className="ml-1" />
                  <span className="ml-1">Scroll right to see more</span>
                </span>
              </>
            )}
          </span>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span> pages
              </p>
            </div>
            <div>
              <nav className="relative inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                
                {/* Page numbers */}
                {Array.from({length: Math.min(5, totalPages)}).map((_, i) => {
                  const pageNum = currentPage <= 3 
                    ? i + 1 
                    : currentPage >= totalPages - 2 
                      ? totalPages - 4 + i 
                      : currentPage - 2 + i;
                  
                  if (pageNum <= 0 || pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === pageNum ? 'bg-green-50 border-green-500 text-green-600 z-10' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronsRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Comparison Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div 
              ref={comparisonModalRef}
              className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-pop-in"
              role="dialog"
              aria-modal="true"
              aria-labelledby="comparison-title"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 id="comparison-title" className="text-lg font-medium">Compare Listings</h2>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                  aria-label="Close comparison"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 flex-grow">
                <div className="grid grid-cols-4 gap-4">
                  {/* Labels column */}
                  <div className="space-y-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
                    <div className="h-12"></div> {/* Empty space for website row */}
                    <div className="font-medium">Price</div>
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Content Writer</div>
                    <div className="font-medium">Word Count</div>
                    <div className="font-medium">Language</div>
                    <div className="font-medium">Country</div>
                    <div className="font-medium">DR</div>
                    <div className="font-medium">DA</div>
                    <div className="font-medium">Traffic</div>
                    <div className="font-medium">Niches</div>
                  </div>
                  
                  {/* Listing columns */}
                  {listingsForComparison.map((listing, index) => (
                    <div key={listing.id} className="space-y-4 animate-slide-in" style={{ animationDelay: `${(index + 1) * 150}ms` }}>
                      {/* Website with remove button */}
                      <div className="h-12 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-blue-600">{listing.website.domain}</span>
                          <button 
                            onClick={() => toggleListingForComparison(listing.id)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Remove from comparison"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        {listing.website.verified && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Check size={12} className="text-blue-500 mr-1" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price */}
                      <div className="font-medium">{listing.price} USD</div>
                      
                      {/* Type */}
                      <div>
                        {listing.type.listingType === 'guest-post' ? 'Guest post' : 
                         listing.type.listingType === 'homepage-link' ? 'Homepage link' :
                         listing.type.listingType === 'innerpage-link' ? 'Innerpage link' : 'Sitewide link'}
                        {listing.type.permanent ? ' (Permanent)' : ` (${listing.type.months} months)`}
                      </div>
                      
                      {/* Content Writer */}
                      <div>
                        {listing.type.contentWriter === 'both' ? 'Both' : 
                         listing.type.contentWriter === 'you' ? 'You' : 'Publisher'}
                      </div>
                      
                      {/* Word Count */}
                      <div>{listing.type.wordCount} words</div>
                      
                      {/* Language */}
                      <div>
                        {listing.language.primary}
                        {listing.language.extra && <div className="text-xs text-gray-500">{listing.language.extra}</div>}
                      </div>
                      
                      {/* Country */}
                      <div>{listing.metrics.countryCode}</div>
                      
                      {/* DR */}
                      <div className="flex items-center">
                        {listing.metrics.dr.value}
                        <span className={`ml-1 text-xs ${listing.metrics.dr.percentage.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {listing.metrics.dr.percentage}
                        </span>
                      </div>
                      
                      {/* DA */}
                      <div>{listing.metrics.da}</div>
                      
                      {/* Traffic */}
                      <div>{listing.metrics.traffic.toLocaleString()}</div>
                      
                      {/* Niches */}
                      <div className="flex flex-wrap gap-1">
                        {listing.niches.map((niche, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {niche}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty columns if fewer than 3 listings */}
                  {Array.from({ length: 3 - listingsForComparison.length }).map((_, index) => (
                    <div 
                      key={`empty-${index}`} 
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-full animate-fade-in" 
                      style={{ animationDelay: `${(listingsForComparison.length + index + 1) * 150}ms` }}
                    >
                      <div className="text-center text-gray-400">
                        <Square size={24} className="mx-auto mb-2" />
                        <p>Select a listing to compare</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowComparison(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors mr-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
                {listingsForComparison.length > 0 && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Purchase Selected
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketplaceTable; 

