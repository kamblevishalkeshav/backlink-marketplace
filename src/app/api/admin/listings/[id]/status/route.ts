import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to handle errors
const handleError = (error: unknown) => {
  console.error('Admin Listings API Error:', error);
  return NextResponse.json(
    { error: 'Something went wrong processing your request' },
    { status: 500 }
  );
};

// PATCH /api/admin/listings/[id]/status - Update a listing status
export async function PATCH(
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
        { error: 'Forbidden: Only admins can update listing status' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { status } = body;

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid status provided. Must be "pending", "approved", or "rejected"' },
        { status: 400 }
      );
    }

    // Check if listing exists
    const existingListing = await prisma.listing.findUnique({
      where: { id: params.id }
    });

    if (!existingListing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Update the listing status
    const updatedListing = await prisma.listing.update({
      where: { id: params.id },
      data: {
        status: status.toUpperCase()
      }
    });

    return NextResponse.json({
      id: updatedListing.id,
      status: updatedListing.status.toLowerCase(),
      message: `Listing status updated to ${updatedListing.status.toLowerCase()}`
    });
  } catch (error) {
    return handleError(error);
  }
} 