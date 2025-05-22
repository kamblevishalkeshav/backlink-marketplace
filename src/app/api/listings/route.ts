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
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Parse request body
    const body = await request.json();
    
    // Create the listing with nested data
    const {
      price, offerRate, website, type, language, category, metrics, niches, acceptedContent, publisherNote
    } = body;
    
    const listing = await prisma.listing.create({
      data: {
        price,
        offerRate,
        domain: website.domain,
        verified: website.verified || false,
        tags: website.tags || [],
        listingType: type.listingType.toUpperCase(),
        permanent: type.permanent,
        months: type.months,
        wordCount: type.wordCount,
        workingDays: type.workingDays,
        contentWriter: type.contentWriter.toUpperCase(),
        primaryLanguage: language.primary,
        nativeLanguage: language.native,
        extraLanguage: language.extra,
        category,
        countryCode: metrics.countryCode,
        da: metrics.da,
        drValue: metrics.dr.value,
        drPercentage: metrics.dr.percentage,
        as: metrics.as,
        traffic: metrics.traffic,
        keywords: metrics.keywords,
        refDomains: metrics.refDomains,
        niches,
        publisherNote,
        status: 'PENDING',
        createdById: user.id,
        countryTraffic: {
          create: metrics.countryTraffic?.map(ct => ({
            countryCode: ct.countryCode,
            percentage: ct.percentage,
            traffic: ct.traffic
          })) || []
        },
        acceptedContent: acceptedContent ? {
          create: {
            casino: acceptedContent.casino?.toUpperCase(),
            finance: acceptedContent.finance?.toUpperCase(),
            erotic: acceptedContent.erotic?.toUpperCase(),
            dating: acceptedContent.dating?.toUpperCase(),
            crypto: acceptedContent.crypto?.toUpperCase(),
            cbd: acceptedContent.cbd?.toUpperCase(),
            medicine: acceptedContent.medicine?.toUpperCase()
          }
        } : undefined
      }
    });
    
    return NextResponse.json({ 
      id: listing.id,
      message: 'Listing created successfully' 
    }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
} 