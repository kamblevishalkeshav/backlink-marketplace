import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to handle errors
const handleError = (error: unknown) => {
  console.error('Listings API Error:', error);
  return NextResponse.json(
    { error: 'Something went wrong processing your request' },
    { status: 500 }
  );
};

// GET /api/listings - Get all listings with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Filters
    const minDA = searchParams.get('minDA') ? parseInt(searchParams.get('minDA')!) : undefined;
    const maxDA = searchParams.get('maxDA') ? parseInt(searchParams.get('maxDA')!) : undefined;
    const minDR = searchParams.get('minDR') ? parseInt(searchParams.get('minDR')!) : undefined;
    const maxDR = searchParams.get('maxDR') ? parseInt(searchParams.get('maxDR')!) : undefined;
    const minTraffic = searchParams.get('minTraffic') ? parseInt(searchParams.get('minTraffic')!) : undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sort') || 'newest';
    
    // Build the filter
    const where: Prisma.ListingWhereInput = {
      status: 'APPROVED' // Only show approved listings by default
    };
    
    // Only apply filters if provided
    if (minDA) where.da = { gte: minDA };
    if (maxDA) where.da = { ...where.da, lte: maxDA };
    if (minDR) where.drValue = { gte: minDR };
    if (maxDR) where.drValue = { ...where.drValue, lte: maxDR };
    if (minTraffic) where.traffic = { gte: minTraffic };
    if (minPrice) where.price = { gte: minPrice };
    if (maxPrice) where.price = { ...where.price, lte: maxPrice };
    
    // Search functionality
    if (search) {
      where.OR = [
        { domain: { contains: search, mode: 'insensitive' } },
        { niches: { has: search } },
        { tags: { has: search } },
        { category: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Build sorting
    let orderBy: Prisma.ListingOrderByWithRelationInput = { createdAt: 'desc' };
    
    switch (sortBy) {
      case 'priceAsc':
        orderBy = { price: 'asc' };
        break;
      case 'priceDesc':
        orderBy = { price: 'desc' };
        break;
      case 'daAsc':
        orderBy = { da: 'asc' };
        break;
      case 'daDesc':
        orderBy = { da: 'desc' };
        break;
      case 'drAsc':
        orderBy = { drValue: 'asc' };
        break;
      case 'drDesc':
        orderBy = { drValue: 'desc' };
        break;
      // Default is newest
    }
    
    // Execute query
    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          countryTraffic: true,
          acceptedContent: true
        }
      }),
      prisma.listing.count({ where })
    ]);
    
    // Format the result to match the expected structure
    const formattedListings = listings.map(listing => ({
      id: listing.id,
      price: listing.price,
      offerRate: listing.offerRate,
      website: {
        domain: listing.domain,
        verified: listing.verified,
        tags: listing.tags
      },
      type: {
        listingType: listing.listingType.toLowerCase(),
        permanent: listing.permanent,
        months: listing.months,
        wordCount: listing.wordCount,
        workingDays: listing.workingDays,
        contentWriter: listing.contentWriter.toLowerCase()
      },
      approx: {
        workingDays: listing.workingDays
      },
      language: {
        primary: listing.primaryLanguage,
        native: listing.nativeLanguage,
        extra: listing.extraLanguage
      },
      category: listing.category,
      metrics: {
        countryCode: listing.countryCode,
        countryTraffic: listing.countryTraffic.map(ct => ({
          countryCode: ct.countryCode,
          percentage: ct.percentage,
          traffic: ct.traffic || 0
        })),
        dr: {
          value: listing.drValue,
          percentage: listing.drPercentage
        },
        da: listing.da,
        as: listing.as,
        traffic: listing.traffic,
        keywords: listing.keywords,
        refDomains: listing.refDomains
      },
      niches: listing.niches,
      acceptedContent: listing.acceptedContent ? {
        casino: listing.acceptedContent.casino?.toLowerCase(),
        finance: listing.acceptedContent.finance?.toLowerCase(),
        erotic: listing.acceptedContent.erotic?.toLowerCase(),
        dating: listing.acceptedContent.dating?.toLowerCase(),
        crypto: listing.acceptedContent.crypto?.toLowerCase(),
        cbd: listing.acceptedContent.cbd?.toLowerCase(),
        medicine: listing.acceptedContent.medicine?.toLowerCase()
      } : {},
      publisherNote: listing.publisherNote,
      status: listing.status.toLowerCase(),
      createdAt: listing.createdAt.toISOString()
    }));
    
    return NextResponse.json({
      data: formattedListings,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/listings - Create a new listing
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/listings - Starting request processing');
    
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log('Authentication check:', session ? 'Authenticated' : 'Not authenticated');
    
    if (!session) {
      console.log('Authentication failed - returning 401');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Log user info
    console.log('User ID:', session.user?.id);
    console.log('User email:', session.user?.email);
    
    let data;
    try {
      data = await request.json();
      console.log('Parsed request data successfully');
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Log incoming data for debugging
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.website?.domain) {
      console.error('Missing required field: website.domain');
      return NextResponse.json(
        { error: 'Website domain is required' },
        { status: 400 }
      );
    }
    
    try {
      // Define interface for CountryTraffic items
      interface CountryTrafficItem {
        countryCode: string;
        percentage: string | number;
        traffic?: string | number;
      }
      
      // Create the listing from the nested data structure
      console.log('Attempting to create listing in database for domain:', data.website.domain);
      const listing = await prisma.listing.create({
        data: {
          domain: data.website.domain,
          price: parseFloat(data.price) || 0,
          offerRate: data.offerRate ? parseFloat(data.offerRate) : null,
          tags: Array.isArray(data.website.tags) ? data.website.tags : [],
          listingType: data.type.listingType.toUpperCase(),
          permanent: Boolean(data.type.permanent),
          months: data.type.permanent ? null : parseInt(data.type.months) || null,
          wordCount: parseInt(data.type.wordCount) || 0,
          workingDays: parseInt(data.type.workingDays) || 1,
          contentWriter: data.type.contentWriter.toUpperCase(),
          primaryLanguage: data.language.primary,
          nativeLanguage: data.language.native || data.language.primary,
          extraLanguage: data.language.extra,
          category: data.category || 'General',
          countryCode: data.metrics.countryCode || 'US',
          da: parseInt(data.metrics.da) || 0,
          drValue: parseInt(data.metrics.dr.value) || 0,
          drPercentage: data.metrics.dr.percentage || '',
          as: parseInt(data.metrics.as) || 0,
          traffic: parseInt(data.metrics.traffic) || 0,
          keywords: parseInt(data.metrics.keywords) || 0,
          refDomains: parseInt(data.metrics.refDomains) || 0,
          niches: Array.isArray(data.niches) ? data.niches : [],
          publisherNote: data.publisherNote,
          status: 'PENDING', // All new listings are pending review by default
          createdById: session.user?.id,
          verified: false,
          
          // Create the accepted content object
          acceptedContent: {
            create: {
              casino: data.acceptedContent?.casino || 'NOT_ACCEPTED',
              finance: data.acceptedContent?.finance || 'NOT_ACCEPTED',
              erotic: data.acceptedContent?.erotic || 'NOT_ACCEPTED',
              dating: data.acceptedContent?.dating || 'NOT_ACCEPTED',
              crypto: data.acceptedContent?.crypto || 'NOT_ACCEPTED',
              cbd: data.acceptedContent?.cbd || 'NOT_ACCEPTED',
              medicine: data.acceptedContent?.medicine || 'NOT_ACCEPTED',
            }
          },
          
          // Create country traffic data
          countryTraffic: {
            create: Array.isArray(data.metrics.countryTraffic) && data.metrics.countryTraffic.length > 0
              ? data.metrics.countryTraffic
                  .filter((item: CountryTrafficItem) => item.countryCode && item.percentage)
                  .map((item: CountryTrafficItem) => ({
                    countryCode: item.countryCode,
                    percentage: parseInt(String(item.percentage)) || 0,
                    traffic: parseInt(String(item.traffic)) || 0,
                  }))
              : []
          }
        },
      });
      
      console.log('Listing created successfully:', listing.id);
      return NextResponse.json(listing);
    } catch (dbError: unknown) {
      console.error('Database error:', dbError);
      // Check for specific database errors
      if (typeof dbError === 'object' && dbError !== null && 'code' in dbError) {
        const prismaError = dbError as { code: string; meta?: { field_name?: string } };
        
        if (prismaError.code === 'P2002') {
          return NextResponse.json(
            { error: 'A listing with this domain already exists' },
            { status: 409 }
          );
        }
        if (prismaError.code === 'P2003') {
          return NextResponse.json(
            { error: 'Foreign key constraint failed: ' + prismaError.meta?.field_name },
            { status: 400 }
          );
        }
      }
      throw dbError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error('Error creating listing (detailed):', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to create listing: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}

// For import multiple listings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get array of listings to import
    const { listings } = await request.json();
    
    if (!Array.isArray(listings) || listings.length === 0) {
      return NextResponse.json(
        { error: 'No listings provided' },
        { status: 400 }
      );
    }
    
    // Define interface for CSV import data
    interface ListingImportData {
      domain: string;
      price: string | number;
      offer_rate?: string | number;
      listing_type: string;
      is_permanent: string;
      months?: string | number;
      word_count?: string | number;
      working_days?: string | number;
      content_writer?: string;
      primary_language: string;
      native_language: string;
      extra_language?: string;
      category?: string;
      country_code?: string;
      da?: string | number;
      dr_value?: string | number;
      dr_percentage?: string;
      as_value?: string | number;
      traffic?: string | number;
      keywords?: string | number;
      ref_domains?: string | number;
      niches?: string;
      publisher_note?: string;
      accept_casino?: string;
      accept_finance?: string;
      accept_erotic?: string;
      accept_dating?: string;
      accept_crypto?: string;
      accept_cbd?: string;
      accept_medicine?: string;
      [key: string]: unknown;  // For dynamic country traffic fields
    }
    
    // Process each listing
    const results = await Promise.all(
      listings.map(async (listingData: ListingImportData) => {
        try {
          const listing = await prisma.listing.create({
            data: {
              domain: listingData.domain,
              price: parseFloat(String(listingData.price)) || 0,
              offerRate: listingData.offer_rate ? parseFloat(String(listingData.offer_rate)) : null,
              tags: [],
              listingType: mapListingType(listingData.listing_type),
              permanent: listingData.is_permanent === 'TRUE',
              months: listingData.is_permanent === 'TRUE' ? null : parseInt(String(listingData.months)) || null,
              wordCount: parseInt(String(listingData.word_count)) || 0,
              workingDays: parseInt(String(listingData.working_days)) || 1,
              contentWriter: mapContentWriter(listingData.content_writer || 'both'),
              primaryLanguage: listingData.primary_language,
              nativeLanguage: listingData.native_language,
              extraLanguage: listingData.extra_language || null,
              category: listingData.category,
              countryCode: listingData.country_code,
              da: parseInt(String(listingData.da)) || 0,
              drValue: parseInt(String(listingData.dr_value)) || 0,
              drPercentage: listingData.dr_percentage || '',
              as: parseInt(String(listingData.as_value)) || 0,
              traffic: parseInt(String(listingData.traffic)) || 0,
              keywords: parseInt(String(listingData.keywords)) || 0,
              refDomains: parseInt(String(listingData.ref_domains)) || 0,
              niches: listingData.niches ? listingData.niches.split(',').map((n: string) => n.trim()) : [],
              publisherNote: listingData.publisher_note || null,
              status: 'PENDING',
              createdById: session.user?.id,
              
              // Create acceptedContent record
              acceptedContent: {
                create: {
                  casino: mapAcceptanceStatus(listingData.accept_casino),
                  finance: mapAcceptanceStatus(listingData.accept_finance),
                  erotic: mapAcceptanceStatus(listingData.accept_erotic),
                  dating: mapAcceptanceStatus(listingData.accept_dating),
                  crypto: mapAcceptanceStatus(listingData.accept_crypto),
                  cbd: mapAcceptanceStatus(listingData.accept_cbd),
                  medicine: mapAcceptanceStatus(listingData.accept_medicine),
                }
              },
              
              // Create country traffic data
              countryTraffic: {
                create: createCountryTrafficData(listingData),
              }
            },
          });
          
          return {
            success: true,
            id: listing.id,
            domain: listing.domain
          };
        } catch (error) {
          console.error(`Error importing listing ${listingData.domain}:`, error);
          return {
            success: false,
            domain: listingData.domain,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      })
    );
    
    return NextResponse.json({
      success: true,
      total: listings.length,
      imported: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
  } catch (error) {
    console.error('Error importing listings:', error);
    return NextResponse.json(
      { error: 'Failed to import listings' },
      { status: 500 }
    );
  }
}

// Helper functions
function mapListingType(type: string): 'GUEST_POST' | 'HOMEPAGE_LINK' | 'INNERPAGE_LINK' | 'SITEWIDE_LINK' {
  const map: Record<string, 'GUEST_POST' | 'HOMEPAGE_LINK' | 'INNERPAGE_LINK' | 'SITEWIDE_LINK'> = {
    'guest-post': 'GUEST_POST',
    'homepage-link': 'HOMEPAGE_LINK',
    'innerpage-link': 'INNERPAGE_LINK',
    'sitewide-link': 'SITEWIDE_LINK',
  };
  
  return map[type.toLowerCase()] || 'GUEST_POST';
}

function mapContentWriter(type: string): 'BOTH' | 'YOU' | 'PUBLISHER' {
  const map: Record<string, 'BOTH' | 'YOU' | 'PUBLISHER'> = {
    'both': 'BOTH',
    'buyer': 'YOU',
    'publisher': 'PUBLISHER',
    'you': 'YOU',
  };
  
  return map[type.toLowerCase()] || 'BOTH';
}

function mapAcceptanceStatus(value?: string): 'ACCEPTED' | 'NOT_ACCEPTED' | 'PROHIBITED' {
  if (!value) return 'NOT_ACCEPTED';
  
  if (value === 'TRUE' || value === 'true' || value === '1' || value === 'yes') {
    return 'ACCEPTED';
  } else if (value === 'FALSE' || value === 'false' || value === '0' || value === 'no') {
    return 'NOT_ACCEPTED';
  } else if (value === 'prohibited') {
    return 'PROHIBITED';
  }
  
  return 'NOT_ACCEPTED';
}

function createCountryTrafficData(listingData: Record<string, unknown>) {
  const countryData = [];
  
  // Add country data if available (from CSV import format)
  for (let i = 1; i <= 5; i++) {
    const countryCode = listingData[`country${i}_code`];
    const percentage = listingData[`country${i}_percentage`];
    const traffic = listingData[`country${i}_traffic`];
    
    if (countryCode && percentage) {
      countryData.push({
        countryCode: String(countryCode),
        percentage: parseInt(String(percentage)) || 0,
        traffic: parseInt(String(traffic)) || 0,
      });
    }
  }
  
  return countryData;
} 