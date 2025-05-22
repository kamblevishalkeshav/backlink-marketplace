import { Listing } from '@/types/listing';

// Default empty listing for new entries
export const DEFAULT_LISTING: Omit<Listing, 'id' | 'status' | 'createdAt'> = {
  price: 0,
  offerRate: 0,
  isFavorite: false,
  website: {
    domain: '',
    verified: false,
    tags: [],
  },
  type: {
    listingType: 'guest-post',
    permanent: true,
    months: 0,
    wordCount: 500,
    workingDays: 3,
    contentWriter: 'both',
  },
  approx: {
    workingDays: 3,
  },
  language: {
    primary: 'English',
    native: 'English',
  },
  category: '',
  metrics: {
    countryCode: 'US',
    countryTraffic: [],
    dr: {
      value: 0,
      percentage: '+0%',
    },
    da: 0,
    as: 0,
    traffic: 0,
    keywords: 0,
    refDomains: 0,
  },
  niches: [],
  acceptedContent: {
    casino: 'not-accepted',
    finance: 'not-accepted',
    erotic: 'not-accepted',
    dating: 'not-accepted',
    crypto: 'not-accepted',
    cbd: 'not-accepted',
    medicine: 'not-accepted',
  },
}; 