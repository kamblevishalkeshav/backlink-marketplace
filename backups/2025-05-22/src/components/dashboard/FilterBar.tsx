import { ChevronDown, Filter, Search, Sliders, X } from 'lucide-react';
import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [priceRange, setPriceRange] = useState<{ min: number, max: number | null }>({ min: 0, max: null });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filterCategories = [
    { id: 'language', label: 'Language', icon: <span className="text-xs">EN</span> },
    { id: 'country', label: 'Country', icon: <span className="text-xs">US</span> },
    { id: 'category', label: 'Category', icon: <span className="text-xs">CAT</span> },
    { id: 'niche', label: 'Sensitive niche', icon: <Sliders className="w-3 h-3" /> },
    { id: 'content', label: 'Content by', icon: <Sliders className="w-3 h-3" /> },
    { id: 'nofollow', label: 'No-follow', icon: <Sliders className="w-3 h-3" /> }
  ];
  
  const metricFilters = [
    { id: 'dr', label: 'DR', logo: '/ahrefs-logo.svg' },
    { id: 'da', label: 'DA', logo: '/moz-logo.svg' },
    { id: 'as', label: 'AS', logo: '/semrush-logo.svg' },
    { id: 'traffic', label: 'Traffic', logo: '/ahrefs-logo.svg' },
    { id: 'keywords', label: 'Keywords', logo: '/ahrefs-logo.svg' },
    { id: 'refdomains', label: 'Ref. domains', logo: '/ahrefs-logo.svg' }
  ];
  
  const platformFilters = [
    { id: 'competitor-gap', label: 'Competitor gap match', icon: <Filter className="w-3 h-3" /> },
    { id: 'exclude-purchased', label: 'Exclude purchased', icon: <X className="w-3 h-3" /> }
  ];
  
  return (
    <div className="bg-white rounded-lg">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filters</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-700 hover:bg-gray-50">
              <Search className="w-3 h-3 mr-1.5 text-gray-500" />
              Search websites or niches...
            </button>
            <img src="/ahrefs-logo.svg" alt="Ahrefs" className="h-5" />
            <img src="/semrush-logo.svg" alt="SEMrush" className="h-5" />
            <img src="/moz-logo.svg" alt="Moz" className="h-5" />
          </div>
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-2">General filters</h4>
        <div className="flex flex-wrap gap-2">
          {/* Price Range Filter */}
          <div className="relative inline-block">
            <button 
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:bg-gray-50"
              onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
            >
              Price <span className="mx-1 text-gray-400">from</span> {priceRange.min} <span className="mx-1 text-gray-400">to</span> {priceRange.max || '∞'} USD
              <ChevronDown className="ml-1.5 w-3 h-3" />
            </button>
            {activeFilter === 'price' && (
              <div className="absolute z-10 mt-1 p-3 bg-white rounded-md shadow-lg border border-gray-200 w-64">
                <div className="flex gap-2 mb-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input 
                      type="number" 
                      min="0"
                      value={priceRange.min} 
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input 
                      type="number" 
                      min="0"
                      value={priceRange.max || ''} 
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || null})}
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                      placeholder="∞"
                    />
                  </div>
                </div>
                <button className="w-full py-1.5 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700">
                  Apply
                </button>
              </div>
            )}
          </div>
          
          {/* Other General Filters */}
          {filterCategories.map(filter => (
            <button 
              key={filter.id}
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:bg-gray-50"
            >
              {filter.label} <ChevronDown className="ml-1.5 w-3 h-3" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Metric filters</h4>
        <div className="flex flex-wrap gap-2">
          {metricFilters.map(metric => (
            <div key={metric.id} className="flex items-center gap-1">
              <img src={metric.logo} alt={metric.label} className="w-4 h-4" />
              <span className="text-xs font-medium">{metric.label}</span>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1">
                <input 
                  type="number" 
                  min="0"
                  placeholder="0"
                  className="w-10 text-xs border-none focus:outline-none"
                />
                <span className="text-xs text-gray-400">to</span>
                <input 
                  type="number" 
                  min="0"
                  placeholder="∞"
                  className="w-10 text-xs border-none focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-xs font-medium text-gray-500 mb-2">Platform filters</h4>
        <div className="flex flex-wrap gap-2">
          {platformFilters.map(filter => (
            <button 
              key={filter.id}
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:bg-gray-50"
            >
              <span className="mr-1.5">{filter.icon}</span>
              {filter.label} <ChevronDown className="ml-1.5 w-3 h-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 