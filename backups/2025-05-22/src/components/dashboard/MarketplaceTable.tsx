import { ExternalLink, Star } from 'lucide-react';
import React from 'react';

interface ListingData {
  id: string;
  price: number;
  currency: string;
  website: string;
  websiteUrl: string;
  verified: boolean;
  categories: string[];
  listingType: 'guest-post' | 'homepage-link' | 'innerpage-link' | 'sitewide-link';
  isPermanent: boolean;
  contentProvider: 'both' | 'you' | 'publisher';
  wordCount: number;
  workingDays: number;
  language: {
    name: string;
    native?: string;
  };
  secondaryLanguages?: string[];
  country: {
    code: string;
    name: string;
    percentage?: number;
  };
  metrics: {
    dr: number;
    da: number;
    as: number;
  };
  categories2: string[];
  traffic?: number;
}

interface MarketplaceTableProps {
  className?: string;
}

const mockListings: ListingData[] = [
  {
    id: '1',
    price: 340,
    currency: 'USD',
    website: 'fashionour.com',
    websiteUrl: 'https://fashionour.com',
    verified: true,
    categories: ['Ecommerce', 'Fashion magazine'],
    listingType: 'guest-post',
    isPermanent: true,
    contentProvider: 'both',
    wordCount: 500,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English'
    },
    country: {
      code: 'US',
      name: 'United States',
      percentage: 89
    },
    metrics: {
      dr: 45,
      da: 31,
      as: 23
    },
    categories2: ['Entertainment', 'Lifestyle']
  },
  {
    id: '2',
    price: 255,
    currency: 'USD',
    website: 'redoundo.com',
    websiteUrl: 'https://redoundo.com',
    verified: true,
    categories: ['Ecommerce', 'Marketplace'],
    listingType: 'guest-post',
    isPermanent: true,
    contentProvider: 'both',
    wordCount: 500,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English'
    },
    country: {
      code: 'US',
      name: 'United States'
    },
    metrics: {
      dr: 12,
      da: 15,
      as: 13
    },
    categories2: ['Business', 'Entertainment']
  },
  {
    id: '3',
    price: 109,
    currency: 'USD',
    website: 'cutnight.com',
    websiteUrl: 'https://cutnight.com',
    verified: true,
    categories: ['Nightlife insights', 'News and blogs'],
    listingType: 'guest-post',
    isPermanent: true,
    contentProvider: 'both',
    wordCount: 500,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English',
    },
    secondaryLanguages: ['UA'],
    country: {
      code: 'UA',
      name: 'Ukraine',
      percentage: 64
    },
    metrics: {
      dr: 24,
      da: 35,
      as: 28
    },
    categories2: ['Entertainment']
  },
  {
    id: '4',
    price: 99,
    currency: 'USD',
    website: 'cutnight.com',
    websiteUrl: 'https://cutnight.com',
    verified: true,
    categories: ['Nightlife insights', 'News and blogs'],
    listingType: 'homepage-link',
    isPermanent: true,
    contentProvider: 'both',
    wordCount: 500,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English',
    },
    secondaryLanguages: ['UA'],
    country: {
      code: 'UA',
      name: 'Ukraine',
      percentage: 64
    },
    metrics: {
      dr: 24,
      da: 35,
      as: 28
    },
    categories2: ['Entertainment']
  },
  {
    id: '5',
    price: 134,
    currency: 'USD',
    website: 'bettingappvision.co.uk',
    websiteUrl: 'https://bettingappvision.co.uk',
    verified: true,
    categories: ['Sports betting', 'Mobile apps'],
    listingType: 'guest-post',
    isPermanent: true,
    contentProvider: 'you',
    wordCount: 800,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English'
    },
    country: {
      code: 'GB',
      name: 'Great Britain',
      percentage: 77
    },
    metrics: {
      dr: 26,
      da: 35,
      as: 25
    },
    categories2: ['Gambling and Betting', 'Sports']
  },
  {
    id: '6',
    price: 153,
    currency: 'USD',
    website: 'transpormiles.com',
    websiteUrl: 'https://transpormiles.com',
    verified: true,
    categories: ['Travel planning', 'Places'],
    listingType: 'guest-post',
    isPermanent: true,
    contentProvider: 'both',
    wordCount: 500,
    workingDays: 3,
    language: {
      name: 'English',
      native: 'English'
    },
    country: {
      code: 'US',
      name: 'United States',
      percentage: 34
    },
    metrics: {
      dr: 50,
      da: 32,
      as: 21
    },
    categories2: ['Adult']
  }
];

const MarketplaceTable: React.FC<MarketplaceTableProps> = ({ className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
              Price
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Website
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
              Type
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
              Language
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
              Category
            </th>
            <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              Country
            </th>
            <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              DR
            </th>
            <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              DA
            </th>
            <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              AS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockListings.map((listing) => (
            <tr key={listing.id} className="hover:bg-gray-50">
              {/* Price column */}
              <td className="px-2 py-4 whitespace-nowrap">
                <div className="flex flex-col items-start">
                  <button className="mb-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded">
                    Buy
                  </button>
                  <div className="flex items-center">
                    <span className="font-medium">{listing.price} {listing.currency}</span>
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </td>
              
              {/* Website column */}
              <td className="px-2 py-4">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <a href={listing.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      {listing.website}
                    </a>
                    {listing.verified && (
                      <svg className="w-4 h-4 ml-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {listing.categories.map((category, idx) => (
                      <span key={idx} className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
              
              {/* Type column */}
              <td className="px-2 py-4">
                <div className="flex flex-col">
                  <div className="mb-1 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                    {listing.listingType === 'guest-post' ? 'Guest post' : 
                     listing.listingType === 'homepage-link' ? 'Homepage link' : 
                     listing.listingType === 'innerpage-link' ? 'Innerpage link' : 'Sitewide link'}
                    {listing.isPermanent && <span className="ml-1 text-xs text-yellow-600">Permanent</span>}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {listing.contentProvider === 'both' ? 'Both' : 
                     listing.contentProvider === 'you' ? 'You' : 'Publisher'}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {listing.wordCount} words
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approx. {listing.workingDays} working days
                  </div>
                </div>
              </td>
              
              {/* Language column */}
              <td className="px-2 py-4">
                <div className="font-medium">{listing.language.name}</div>
                {listing.language.native && listing.language.native !== listing.language.name && (
                  <div className="text-xs text-gray-500">{listing.language.native}</div>
                )}
                {listing.secondaryLanguages && listing.secondaryLanguages.length > 0 && (
                  <div className="text-xs text-gray-500">+{listing.secondaryLanguages.length}</div>
                )}
              </td>
              
              {/* Category column */}
              <td className="px-2 py-4">
                {listing.categories2.map((category, idx) => (
                  <div key={idx} className="text-sm">{category}</div>
                ))}
              </td>
              
              {/* Country column */}
              <td className="px-2 py-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">{listing.country.code}</span>
                    {listing.country.percentage && (
                      <span className="text-xs text-gray-500">({listing.country.percentage}%)</span>
                    )}
                  </div>
                </div>
              </td>
              
              {/* DR column */}
              <td className="px-2 py-4 text-center">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800">
                  {listing.metrics.dr}
                </span>
              </td>
              
              {/* DA column */}
              <td className="px-2 py-4 text-center">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800">
                  {listing.metrics.da}
                </span>
              </td>
              
              {/* AS column */}
              <td className="px-2 py-4 text-center">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800">
                  {listing.metrics.as}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketplaceTable; 