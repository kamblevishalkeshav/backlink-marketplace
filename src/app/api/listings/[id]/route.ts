import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { AcceptedContent, CountryTraffic, Listing as PrismaListing } from '@prisma/client';
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

// Complete type for listing with relations
type ListingWithRelations = PrismaListing & {
  countryTraffic: CountryTraffic[];
  acceptedContent: AcceptedContent | null;
};

// Helper function to format listing data
const formatListing = (listing: ListingWithRelations) => ({
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
    countryTraffic: listing.countryTraffic.map((ct: CountryTraffic) => ({
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
});

// GET /api/listings/[id] - Get a single listing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        countryTraffic: true,
        acceptedContent: true
      }
    });

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(formatListing(listing));
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/listings/[id] - Update a listing
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Check if listing exists
    const existingListing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        countryTraffic: true,
        acceptedContent: true
      }
    });

    if (!existingListing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Extract data from request
    const {
      price, offerRate, website, type, language, category, metrics, niches, acceptedContent, publisherNote
    } = body;

    // Update the listing
    const updatedListing = await prisma.$transaction(async (tx) => {
      // Delete existing country traffic
      if (metrics?.countryTraffic) {
        await tx.countryTraffic.deleteMany({
          where: { listingId: params.id }
        });
      }

      // Update the main listing
      const listing = await tx.listing.update({
        where: { id: params.id },
        data: {
          price,
          offerRate,
          domain: website?.domain,
          verified: website?.verified,
          tags: website?.tags,
          listingType: type?.listingType?.toUpperCase(),
          permanent: type?.permanent,
          months: type?.months,
          wordCount: type?.wordCount,
          workingDays: type?.workingDays,
          contentWriter: type?.contentWriter?.toUpperCase(),
          primaryLanguage: language?.primary,
          nativeLanguage: language?.native,
          extraLanguage: language?.extra,
          category,
          countryCode: metrics?.countryCode,
          da: metrics?.da,
          drValue: metrics?.dr?.value,
          drPercentage: metrics?.dr?.percentage,
          as: metrics?.as,
          traffic: metrics?.traffic,
          keywords: metrics?.keywords,
          refDomains: metrics?.refDomains,
          niches,
          publisherNote,
          countryTraffic: metrics?.countryTraffic ? {
            create: metrics.countryTraffic.map((ct: { countryCode: string; percentage: number; traffic?: number }) => ({
              countryCode: ct.countryCode,
              percentage: ct.percentage,
              traffic: ct.traffic
            }))
          } : undefined
        },
        include: {
          countryTraffic: true,
          acceptedContent: true
        }
      });

      // Update accepted content if provided
      if (acceptedContent) {
        if (existingListing.acceptedContent) {
          await tx.acceptedContent.update({
            where: { listingId: params.id },
            data: {
              casino: acceptedContent.casino?.toUpperCase(),
              finance: acceptedContent.finance?.toUpperCase(),
              erotic: acceptedContent.erotic?.toUpperCase(),
              dating: acceptedContent.dating?.toUpperCase(),
              crypto: acceptedContent.crypto?.toUpperCase(),
              cbd: acceptedContent.cbd?.toUpperCase(),
              medicine: acceptedContent.medicine?.toUpperCase()
            }
          });
        } else {
          await tx.acceptedContent.create({
            data: {
              listingId: params.id,
              casino: acceptedContent.casino?.toUpperCase(),
              finance: acceptedContent.finance?.toUpperCase(),
              erotic: acceptedContent.erotic?.toUpperCase(),
              dating: acceptedContent.dating?.toUpperCase(),
              crypto: acceptedContent.crypto?.toUpperCase(),
              cbd: acceptedContent.cbd?.toUpperCase(),
              medicine: acceptedContent.medicine?.toUpperCase()
            }
          });
        }
      }

      return listing;
    });

    return NextResponse.json(formatListing(updatedListing));
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/listings/[id] - Delete a listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if the user is an admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can delete listings' },
        { status: 403 }
      );
    }

    // Delete the listing (cascading will delete related data)
    await prisma.listing.delete({
      where: { id: params.id }
    });

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
} 