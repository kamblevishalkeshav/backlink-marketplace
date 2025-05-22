import AhrefsLogo from '@/components/icons/AhrefsLogo';
import MozLogo from '@/components/icons/MozLogo';
import SemrushLogo from '@/components/icons/SemrushLogo';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Filter, Plus, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Define the filter interface
export interface EnhancedFilters {
  languages: string[];
  countries: string[];
  categories: string[];
  sensitiveNiches: string[];
  noFollow: string | null;
  contentBy: string | null;
  sponsored: string | null;
  priceRange: { min: number; max: number };
  drRange: { min: number; max: number };
  daRange: { min: number; max: number };
  asRange: { min: number; max: number };
  trafficRange: { min: number; max: number };
  keywordsRange: { min: number; max: number };
  refDomainsRange: { min: number; max: number };
  competitorGapMatch: boolean;
  excludePurchased: boolean;
}

interface EnhancedFilterPanelProps {
  onApplyFilters: (filters: EnhancedFilters) => void;
}

const EnhancedFilterPanel: React.FC<EnhancedFilterPanelProps> = ({ onApplyFilters }) => {
  const { activeFilters, applyFilters: applyContextFilters } = useMarketplace();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(activeFilters.languages);
  const [countries, setCountries] = useState<string[]>(activeFilters.countries);
  const [categories, setCategories] = useState<string[]>(activeFilters.categories);
  const [sensitiveNiches, setSensitiveNiches] = useState<string[]>(activeFilters.sensitiveNiches);
  const [noFollow, setNoFollow] = useState<string | null>(activeFilters.noFollow);
  const [contentBy, setContentBy] = useState<string | null>(activeFilters.contentBy);
  const [sponsored, setSponsored] = useState<string | null>(activeFilters.sponsored);
  const [priceRange, setPriceRange] = useState(activeFilters.priceRange);
  const [drRange, setDrRange] = useState(activeFilters.drRange);
  const [daRange, setDaRange] = useState(activeFilters.daRange);
  const [asRange, setAsRange] = useState(activeFilters.asRange);
  const [trafficRange, setTrafficRange] = useState(activeFilters.trafficRange);
  const [keywordsRange, setKeywordsRange] = useState(activeFilters.keywordsRange);
  const [refDomainsRange, setRefDomainsRange] = useState(activeFilters.refDomainsRange);
  const [competitorGapMatch, setCompetitorGapMatch] = useState(activeFilters.competitorGapMatch);
  const [excludePurchased, setExcludePurchased] = useState(activeFilters.excludePurchased);
  const [countryTab, setCountryTab] = useState<'primary' | 'secondary'>('primary');
  const [languageTab, setLanguageTab] = useState<'include' | 'exclude'>('include');
  const [searchInputs, setSearchInputs] = useState({
    language: '',
    country: '',
    category: '',
    sensitiveNiche: '',
    noFollow: '',
    contentBy: '',
    sponsored: ''
  });

  const filterPanelRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the filter dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node) && activeFilter) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  const languageOptions = [
    { id: 'afrikaans', name: 'Afrikaans', nativeName: 'Afrikaans' },
    { id: 'albanian', name: 'Albanian', nativeName: 'Shqip' },
    { id: 'arabic', name: 'Arabic', nativeName: 'العربية' },
    { id: 'armenian', name: 'Armenian', nativeName: 'Հայերեն' },
    { id: 'belarusian', name: 'Belarusian', nativeName: 'Беларуская' },
    { id: 'bosnian', name: 'Bosnian', nativeName: 'bosanski jezik' }
  ];

  const countryOptions = [
    { id: 'afghanistan', name: 'Afghanistan' },
    { id: 'aland_islands', name: 'Åland Islands' },
    { id: 'albania', name: 'Albania' },
    { id: 'algeria', name: 'Algeria' },
    { id: 'american_samoa', name: 'American Samoa' },
    { id: 'andorra', name: 'Andorra' }
  ];

  const regionOptions = [
    { id: 'europe', name: 'Europe' },
    { id: 'western_europe', name: 'Western Europe' },
    { id: 'northern_europe', name: 'Northern Europe' },
    { id: 'eastern_europe', name: 'Eastern Europe' },
    { id: 'southern_europe', name: 'Southern Europe' },
    { id: 'north_america', name: 'North America' }
  ];

  const categoryOptions = [
    { id: 'adult', name: 'Adult' },
    { id: 'auto', name: 'Auto' },
    { id: 'business', name: 'Business' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'education', name: 'Education' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'finance', name: 'Finance' },
    { id: 'food_drink', name: 'Food and Drink' }
  ];

  const handleFilterToggle = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
  };

  const handleSearchChange = (field: keyof typeof searchInputs, value: string) => {
    setSearchInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleIncludeLanguage = (languageId: string) => {
    if (languages.includes(languageId)) {
      setLanguages(languages.filter(id => id !== languageId));
    } else {
      setLanguages([...languages, languageId]);
    }
  };

  const handleIncludeCountry = (countryId: string) => {
    if (countries.includes(countryId)) {
      setCountries(countries.filter(id => id !== countryId));
    } else {
      setCountries([...countries, countryId]);
    }
  };

  const handleIncludeCategory = (categoryId: string) => {
    if (categories.includes(categoryId)) {
      setCategories(categories.filter(id => id !== categoryId));
    } else {
      setCategories([...categories, categoryId]);
    }
  };

  const handleClearFilter = (filterId: string) => {
    switch (filterId) {
      case 'language':
        setLanguages([]);
        break;
      case 'country':
        setCountries([]);
        break;
      case 'category':
        setCategories([]);
        break;
      case 'sensitiveNiche':
        setSensitiveNiches([]);
        break;
      case 'noFollow':
        setNoFollow(null);
        break;
      case 'contentBy':
        setContentBy(null);
        break;
      case 'sponsored':
        setSponsored(null);
        break;
      case 'price':
        setPriceRange({ min: 0, max: 500 });
        break;
      case 'dr':
        setDrRange({ min: 0, max: 100 });
        break;
    }
  };

  const applyFilters = () => {
    const filters: EnhancedFilters = {
      languages,
      countries,
      categories,
      sensitiveNiches,
      noFollow,
      contentBy,
      sponsored,
      priceRange,
      drRange,
      daRange,
      asRange,
      trafficRange,
      keywordsRange,
      refDomainsRange,
      competitorGapMatch,
      excludePurchased
    };
    
    onApplyFilters(filters);
    applyContextFilters(filters);
    setActiveFilter(null);
  };

  // Platform filter handlers
  const handleCompetitorGapMatch = () => {
    setCompetitorGapMatch(!competitorGapMatch);
  };

  const handleExcludePurchased = () => {
    setExcludePurchased(!excludePurchased);
  };

  // Radio Button Option Component
  const RadioOption = ({ 
    id, 
    name, 
    value, 
    checked, 
    onChange, 
    label 
  }: { 
    id: string; 
    name: string; 
    value: string; 
    checked: boolean; 
    onChange: (value: string) => void; 
    label: string 
  }) => (
    <div className="flex items-center py-1 hover:bg-gray-50 cursor-pointer rounded-md px-2" onClick={() => onChange(value)}>
      <div className="relative flex items-center">
        <input 
          type="radio" 
          id={id} 
          name={name} 
          value={value} 
          checked={checked} 
          onChange={() => onChange(value)} 
          className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
        />
        <label htmlFor={id} className="text-sm cursor-pointer ml-2">
          {label}
        </label>
      </div>
    </div>
  );

  const renderNoFollowFilter = () => (
    <div className="space-y-1">
      <RadioOption
        id="nofollow-all"
        name="nofollow"
        value="all"
        checked={noFollow === 'all'}
        onChange={setNoFollow}
        label="All"
      />
      <RadioOption
        id="nofollow-yes"
        name="nofollow"
        value="yes"
        checked={noFollow === 'yes'}
        onChange={setNoFollow}
        label="Yes"
      />
      <RadioOption
        id="nofollow-no"
        name="nofollow"
        value="no"
        checked={noFollow === 'no'}
        onChange={setNoFollow}
        label="No"
      />
    </div>
  );

  const renderContentByFilter = () => (
    <div className="space-y-1">
      <RadioOption
        id="contentby-all"
        name="contentby"
        value="all"
        checked={contentBy === 'all'}
        onChange={setContentBy}
        label="All"
      />
      <RadioOption
        id="contentby-publisher"
        name="contentby"
        value="publisher"
        checked={contentBy === 'publisher'}
        onChange={setContentBy}
        label="Publisher"
      />
      <RadioOption
        id="contentby-buyer"
        name="contentby"
        value="buyer"
        checked={contentBy === 'buyer'}
        onChange={setContentBy}
        label="Buyer"
      />
    </div>
  );

  const renderSponsoredFilter = () => (
    <div className="space-y-1">
      <RadioOption
        id="sponsored-all"
        name="sponsored"
        value="all"
        checked={sponsored === 'all'}
        onChange={setSponsored}
        label="All"
      />
      <RadioOption
        id="sponsored-yes"
        name="sponsored"
        value="yes"
        checked={sponsored === 'yes'}
        onChange={setSponsored}
        label="Yes"
      />
      <RadioOption
        id="sponsored-no"
        name="sponsored"
        value="no"
        checked={sponsored === 'no'}
        onChange={setSponsored}
        label="No"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-4" ref={filterPanelRef}>
      {/* General filters */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-gray-500 mb-2 pb-1 border-b border-gray-100">General filters</h4>
        <div className="flex flex-wrap gap-2">
          {/* Price Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('price')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              Price <span className="mx-1 text-gray-400">from</span> ${priceRange.min} <span className="mx-1 text-gray-400">to</span> ${priceRange.max}
            </button>
            
            {activeFilter === 'price' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Price Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('price')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                          className="w-full px-2 py-2 text-sm border border-gray-200 rounded-md pl-8"
                        />
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">USD</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                          className="w-full px-2 py-2 text-sm border border-gray-200 rounded-md pl-8"
                        />
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">USD</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Language Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('language')}
            >
              <span className="font-medium flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Language
              </span>
              {languages.length > 0 && <span className="ml-1 text-xs bg-green-200 text-green-800 rounded-full px-1.5">{languages.length}</span>}
            </button>
            
            {activeFilter === 'language' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-2 border-b border-gray-200">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-sm font-medium">Language</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('language')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {/* Language Include/Exclude Tabs */}
                  <div className="flex rounded-md bg-gray-100 p-0.5 mb-2">
                    <button
                      className={`flex-1 text-sm py-1.5 rounded-md ${
                        languageTab === 'include' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setLanguageTab('include')}
                    >
                      Include
                    </button>
                    <button
                      className={`flex-1 text-sm py-1.5 rounded-md ${
                        languageTab === 'exclude' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setLanguageTab('exclude')}
                    >
                      Exclude
                    </button>
                  </div>
                  
                  {/* Search input */}
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Include Language"
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md"
                      value={searchInputs.language}
                      onChange={(e) => handleSearchChange('language', e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Language list with radio buttons instead of checkboxes */}
                <div className="max-h-56 overflow-y-auto p-2">
                  {languageOptions
                    .filter(
                      (lang) => 
                        lang.name.toLowerCase().includes(searchInputs.language.toLowerCase()) ||
                        lang.nativeName.toLowerCase().includes(searchInputs.language.toLowerCase())
                    )
                    .map((lang) => (
                      <div
                        key={lang.id}
                        className="flex items-center py-1.5 hover:bg-gray-50 cursor-pointer rounded-md px-2"
                        onClick={() => handleIncludeLanguage(lang.id)}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            id={`lang-${lang.id}`}
                            checked={languages.includes(lang.id)}
                            onChange={() => {}}
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`lang-${lang.id}`} className="text-sm cursor-pointer ml-2">
                            {lang.name}
                            <span className="text-gray-400 ml-1">({lang.nativeName})</span>
                          </label>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Country Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('country')}
            >
              <span className="font-medium flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Country
              </span>
              {countries.length > 0 && <span className="ml-1 text-xs bg-green-200 text-green-800 rounded-full px-1.5">{countries.length}</span>}
            </button>
            
            {activeFilter === 'country' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-2 border-b border-gray-200">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-sm font-medium">Country</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('country')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {/* Country Primary/Secondary Tabs */}
                  <div className="flex rounded-md bg-gray-100 p-0.5 mb-2">
                    <button
                      className={`flex-1 text-sm py-1.5 rounded-md ${
                        countryTab === 'primary' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setCountryTab('primary')}
                    >
                      Primary
                    </button>
                    <button 
                      className={`flex-1 text-sm py-1.5 rounded-md ${
                        countryTab === 'secondary' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setCountryTab('secondary')}
                    >
                      Secondary
                    </button>
                  </div>
                  
                  {/* Search input */}
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Primary Country"
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md"
                      value={searchInputs.country}
                      onChange={(e) => handleSearchChange('country', e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Show region selector only for primary tab */}
                {countryTab === 'primary' && (
                  <div className="px-2 py-2 border-b border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Regions</div>
                    <div className="flex flex-col gap-1.5 text-sm">
                      {regionOptions.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center py-1 hover:bg-gray-50 cursor-pointer rounded-md px-2"
                          onClick={() => {
                            // In a real implementation, this would set multiple countries in a region
                            handleIncludeCountry(region.id);
                          }}
                        >
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`region-${region.id}`}
                              checked={countries.includes(region.id)}
                              onChange={() => {}}
                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={`region-${region.id}`} className="text-sm cursor-pointer ml-2">
                              {region.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-center">
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Collapse Regions
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Country list with radio buttons */}
                <div className="max-h-56 overflow-y-auto p-2">
                  {countryOptions
                    .filter(country => 
                      country.name.toLowerCase().includes(searchInputs.country.toLowerCase())
                    )
                    .map((country) => (
                      <div
                        key={country.id}
                        className="flex items-center py-1.5 hover:bg-gray-50 cursor-pointer rounded-md px-2"
                        onClick={() => handleIncludeCountry(country.id)}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            id={`country-${country.id}`}
                            checked={countries.includes(country.id)}
                            onChange={() => {}}
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`country-${country.id}`} className="text-sm cursor-pointer ml-2">
                            {country.name}
                          </label>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Category Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('category')}
            >
              <span className="font-medium flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Category
              </span>
              {categories.length > 0 && <span className="ml-1 text-xs bg-green-200 text-green-800 rounded-full px-1.5">{categories.length}</span>}
            </button>
            
            {activeFilter === 'category' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-2 border-b border-gray-200">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-sm font-medium">Category</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('category')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {/* Include/Exclude Tabs */}
                  <div className="flex rounded-md bg-gray-100 p-0.5 mb-2">
                    <button
                      className="flex-1 text-sm py-1.5 rounded-md bg-white text-gray-800 shadow-sm"
                    >
                      Include
                    </button>
                    <button 
                      className="flex-1 text-sm py-1.5 rounded-md text-gray-500 hover:text-gray-700"
                    >
                      Exclude
                    </button>
                  </div>
                  
                  {/* Search input */}
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md"
                      value={searchInputs.category}
                      onChange={(e) => handleSearchChange('category', e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Category list with radio buttons */}
                <div className="max-h-56 overflow-y-auto p-2">
                  {categoryOptions
                    .filter(category => 
                      category.name.toLowerCase().includes(searchInputs.category.toLowerCase())
                    )
                    .map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center py-1.5 hover:bg-gray-50 cursor-pointer rounded-md px-2"
                        onClick={() => handleIncludeCategory(category.id)}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            id={`category-${category.id}`}
                            checked={categories.includes(category.id)}
                            onChange={() => {}}
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer ml-2">
                            {category.name}
                          </label>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sensitive Niche Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('sensitiveNiche')}
            >
              <span className="font-medium flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Sensitive niche
              </span>
              {sensitiveNiches.length > 0 && <span className="ml-1 text-xs bg-green-200 text-green-800 rounded-full px-1.5">{sensitiveNiches.length}</span>}
            </button>
            
            {activeFilter === 'sensitiveNiche' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-2 border-b border-gray-200">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-sm font-medium">Sensitive Niche</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('sensitiveNiche')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {/* Include/Exclude Tabs */}
                  <div className="flex rounded-md bg-gray-100 p-0.5 mb-2">
                    <button
                      className="flex-1 text-sm py-1.5 rounded-md bg-white text-gray-800 shadow-sm"
                    >
                      Include
                    </button>
                    <button 
                      className="flex-1 text-sm py-1.5 rounded-md text-gray-500 hover:text-gray-700"
                    >
                      Exclude
                    </button>
                  </div>
                  
                  {/* Search input */}
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search sensitive niches..."
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md"
                      value={searchInputs.sensitiveNiche}
                      onChange={(e) => handleSearchChange('sensitiveNiche', e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Sensitive niches list */}
                <div className="max-h-56 overflow-y-auto p-2">
                  {categoryOptions
                    .filter(category => 
                      category.name.toLowerCase().includes(searchInputs.sensitiveNiche.toLowerCase())
                    )
                    .map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center py-1 hover:bg-gray-50 cursor-pointer rounded-md px-2"
                        onClick={() => {
                          // Similar to other inclusion handlers
                          if (sensitiveNiches.includes(category.id)) {
                            setSensitiveNiches(sensitiveNiches.filter(id => id !== category.id));
                          } else {
                            setSensitiveNiches([...sensitiveNiches, category.id]);
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          id={`sensitive-${category.id}`}
                          checked={sensitiveNiches.includes(category.id)}
                          onChange={() => {}}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={`sensitive-${category.id}`} className="text-sm cursor-pointer flex-1">
                          {category.name}
                        </label>
                      </div>
                    ))
                  }
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Content By Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('contentBy')}
            >
              <span className="font-medium flex items-center">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Content by
              </span>
            </button>
            
            {activeFilter === 'contentBy' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Content By</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('contentBy')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {renderContentByFilter()}
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* No-Follow Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('noFollow')}
            >
              <span className="font-medium flex items-center">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> No-follow
              </span>
            </button>
            
            {activeFilter === 'noFollow' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">No-Follow</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('noFollow')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {renderNoFollowFilter()}
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sponsored Filter - Updated to match reference design */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('sponsored')}
            >
              <span className="font-medium flex items-center">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Sponsored
              </span>
            </button>
            
            {activeFilter === 'sponsored' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Sponsored</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('sponsored')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {renderSponsoredFilter()}
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metric Filters */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-gray-500 mb-2 pb-1 border-b border-gray-100">Metric filters</h4>
        <div className="flex flex-wrap gap-2">
          {/* DR Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('dr')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <AhrefsLogo width={20} height={20} className="mr-1" /> DR <span className="mx-1 text-gray-400">from</span> {drRange.min} <span className="mx-1 text-gray-400">to</span> {drRange.max}
            </button>
            
            {activeFilter === 'dr' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">DR Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('dr')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={drRange.min}
                        onChange={(e) => setDrRange({ ...drRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={drRange.max}
                        onChange={(e) => setDrRange({ ...drRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* DA Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('da')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <MozLogo width={20} height={20} className="mr-1" /> DA <span className="mx-1 text-gray-400">from</span> {daRange.min} <span className="mx-1 text-gray-400">to</span> {daRange.max}
            </button>
            
            {activeFilter === 'da' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">DA Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('da')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={daRange.min}
                        onChange={(e) => setDaRange({ ...daRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={daRange.max}
                        onChange={(e) => setDaRange({ ...daRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* AS Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('as')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <SemrushLogo width={24} height={24} className="mr-1" /> AS <span className="mx-1 text-gray-400">from</span> {asRange.min} <span className="mx-1 text-gray-400">to</span> {asRange.max}
            </button>
            
            {activeFilter === 'as' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">AS Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('as')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={asRange.min}
                        onChange={(e) => setAsRange({ ...asRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={asRange.max}
                        onChange={(e) => setAsRange({ ...asRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Traffic Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('traffic')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <AhrefsLogo width={20} height={20} className="mr-1" /> Traffic <span className="mx-1 text-gray-400">from</span> {trafficRange.min} <span className="mx-1 text-gray-400">to</span> {trafficRange.max}
            </button>
            
            {activeFilter === 'traffic' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Traffic Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('traffic')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        value={trafficRange.min}
                        onChange={(e) => setTrafficRange({ ...trafficRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        value={trafficRange.max}
                        onChange={(e) => setTrafficRange({ ...trafficRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Keywords Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('keywords')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <AhrefsLogo width={20} height={20} className="mr-1" /> Keywords <span className="mx-1 text-gray-400">from</span> {keywordsRange.min} <span className="mx-1 text-gray-400">to</span> {keywordsRange.max}
            </button>
            
            {activeFilter === 'keywords' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Keywords Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('keywords')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        value={keywordsRange.min}
                        onChange={(e) => setKeywordsRange({ ...keywordsRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        value={keywordsRange.max}
                        onChange={(e) => setKeywordsRange({ ...keywordsRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Ref Domains Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              onClick={() => handleFilterToggle('refDomains')}
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <AhrefsLogo width={20} height={20} className="mr-1" /> Ref. Domains <span className="mx-1 text-gray-400">from</span> {refDomainsRange.min} <span className="mx-1 text-gray-400">to</span> {refDomainsRange.max}
            </button>
            
            {activeFilter === 'refDomains' && (
              <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="p-3">
                  <div className="flex justify-between mb-3">
                    <h5 className="text-sm font-medium">Ref. domains Range</h5>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleClearFilter('refDomains')}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="number"
                        min="0"
                        value={refDomainsRange.min}
                        onChange={(e) => setRefDomainsRange({ ...refDomainsRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="number"
                        min="0"
                        value={refDomainsRange.max}
                        onChange={(e) => setRefDomainsRange({ ...refDomainsRange, max: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveFilter(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Platform Filters */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-2 pb-1 border-b border-gray-100">Platform filters</h4>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`flex items-center px-3 py-2 ${competitorGapMatch ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-white border border-gray-200 text-gray-700'} rounded-md text-sm hover:bg-gray-50`}
            onClick={handleCompetitorGapMatch}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Competitor gap match
          </button>
          <button 
            className={`flex items-center px-3 py-2 ${excludePurchased ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-white border border-gray-200 text-gray-700'} rounded-md text-sm hover:bg-gray-50`}
            onClick={handleExcludePurchased}
          >
            <Filter className="w-4 h-4 mr-1.5" />
            Exclude purchased
          </button>
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <div className="mt-4">
        <button 
          className="py-2 px-4 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default EnhancedFilterPanel; 