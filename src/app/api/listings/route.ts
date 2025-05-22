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
    console.log('Received data:', JSON.stringify(data));
    
    // Validate required fields
    if (!data.domain) {
      console.error('Missing required field: domain');
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }
    
    // Extract and format data
    const {
      domain,
      price,
      offerRate,
      listingType,
      permanent,
      months,
      wordCount,
      workingDays,
      contentWriter,
      primaryLanguage,
      nativeLanguage,
      extraLanguage,
      category,
      countryCode,
      da,
      drValue,
      drPercentage,
      as,
      traffic,
      keywords,
      refDomains,
      niches,
      publisherNote,
      acceptedContent,
      countryTraffic,
      tags = [],
    } = data;
    
    console.log('Extracted fields successfully');
    
    try {
      // Create the listing
      console.log('Attempting to create listing in database for domain:', domain);
      const listing = await prisma.listing.create({
        data: {
          domain,
          price: parseFloat(price) || 0,
          offerRate: offerRate ? parseFloat(offerRate) : null,
          tags: Array.isArray(tags) ? tags : [],
          listingType: listingType || 'GUEST_POST',
          permanent: Boolean(permanent),
          months: permanent ? null : parseInt(months) || null,
          wordCount: parseInt(wordCount) || 0,
          workingDays: parseInt(workingDays) || 1,
          contentWriter: contentWriter || 'BOTH',
          primaryLanguage: primaryLanguage || 'English',
          nativeLanguage: nativeLanguage || primaryLanguage || 'English',
          extraLanguage,
          category: category || 'General',
          countryCode: countryCode || 'US',
          da: parseInt(da) || 0,
          drValue: parseInt(drValue) || 0,
          drPercentage: drPercentage || '',
          as: parseInt(as) || 0,
          traffic: parseInt(traffic) || 0,
          keywords: parseInt(keywords) || 0,
          refDomains: parseInt(refDomains) || 0,
          niches: Array.isArray(niches) ? niches : [],
          publisherNote,
          status: 'PENDING', // All new listings are pending review by default
          createdById: session.user?.id,
          verified: false,
          
          // Create the accepted content object
          acceptedContent: {
            create: {
              casino: acceptedContent?.casino || 'NOT_ACCEPTED',
              finance: acceptedContent?.finance || 'NOT_ACCEPTED',
              erotic: acceptedContent?.erotic || 'NOT_ACCEPTED',
              dating: acceptedContent?.dating || 'NOT_ACCEPTED',
              crypto: acceptedContent?.crypto || 'NOT_ACCEPTED',
              cbd: acceptedContent?.cbd || 'NOT_ACCEPTED',
              medicine: acceptedContent?.medicine || 'NOT_ACCEPTED',
            }
          },
          
          // Create country traffic data
          countryTraffic: {
            create: Array.isArray(countryTraffic) && countryTraffic.length > 0
              ? countryTraffic
                  .filter((item: any) => item.countryCode && item.percentage)
                  .map((item: any) => ({
                    countryCode: item.countryCode,
                    percentage: parseInt(item.percentage) || 0,
                    traffic: parseInt(item.traffic) || 0,
                  }))
              : []
          }
        },
      });
      
      console.log('Listing created successfully:', listing.id);
      return NextResponse.json(listing);
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      // Check for specific database errors
      if (dbError.code === 'P2002') {
        return NextResponse.json(
          { error: 'A listing with this domain already exists' },
          { status: 409 }
        );
      }
      if (dbError.code === 'P2003') {
        return NextResponse.json(
          { error: 'Foreign key constraint failed: ' + dbError.meta?.field_name },
          { status: 400 }
        );
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
    
    // Process each listing
    const results = await Promise.all(
      listings.map(async (listingData) => {
        try {
          const listing = await prisma.listing.create({
            data: {
              domain: listingData.domain,
              price: parseFloat(listingData.price) || 0,
              offerRate: listingData.offer_rate ? parseFloat(listingData.offer_rate) : null,
              tags: [],
              listingType: mapListingType(listingData.listing_type),
              permanent: listingData.is_permanent === 'TRUE',
              months: listingData.is_permanent === 'TRUE' ? null : parseInt(listingData.months) || null,
              wordCount: parseInt(listingData.word_count) || 0,
              workingDays: parseInt(listingData.working_days) || 1,
              contentWriter: mapContentWriter(listingData.content_writer),
              primaryLanguage: listingData.primary_language,
              nativeLanguage: listingData.native_language,
              extraLanguage: listingData.extra_language || null,
              category: listingData.category,
              countryCode: listingData.country_code,
              da: parseInt(listingData.da) || 0,
              drValue: parseInt(listingData.dr_value) || 0,
              drPercentage: listingData.dr_percentage || '',
              as: parseInt(listingData.as_value) || 0,
              traffic: parseInt(listingData.traffic) || 0,
              keywords: parseInt(listingData.keywords) || 0,
              refDomains: parseInt(listingData.ref_domains) || 0,
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
            error: (error as Error).message
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
  const map: Record<string, any> = {
    'guest-post': 'GUEST_POST',
    'homepage-link': 'HOMEPAGE_LINK',
    'innerpage-link': 'INNERPAGE_LINK',
    'sitewide-link': 'SITEWIDE_LINK',
  };
  
  return map[type.toLowerCase()] || 'GUEST_POST';
}

function mapContentWriter(type: string): 'BOTH' | 'YOU' | 'PUBLISHER' {
  const map: Record<string, any> = {
    'both': 'BOTH',
    'buyer': 'YOU',
    'publisher': 'PUBLISHER',
    'you': 'YOU',
  };
  
  return map[type.toLowerCase()] || 'BOTH';
}

function mapAcceptanceStatus(value: string): 'ACCEPTED' | 'NOT_ACCEPTED' | 'PROHIBITED' {
  if (value === 'TRUE' || value === 'true' || value === '1' || value === 'yes') {
    return 'ACCEPTED';
  } else if (value === 'FALSE' || value === 'false' || value === '0' || value === 'no') {
    return 'NOT_ACCEPTED';
  } else if (value === 'prohibited') {
    return 'PROHIBITED';
  }
  
  return 'NOT_ACCEPTED';
}

function createCountryTrafficData(listingData: any) {
  const countryData = [];
  
  // Add country data if available (from CSV import format)
  for (let i = 1; i <= 5; i++) {
    const countryCode = listingData[`country${i}_code`];
    const percentage = listingData[`country${i}_percentage`];
    const traffic = listingData[`country${i}_traffic`];
    
    if (countryCode && percentage) {
      countryData.push({
        countryCode: countryCode,
        percentage: parseInt(percentage) || 0,
        traffic: parseInt(traffic) || 0,
      });
    }
  }
  
  return countryData;
} 