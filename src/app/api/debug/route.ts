import { debugPrisma } from '@/lib/debug-prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Debug endpoint called');
    const result = await debugPrisma();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({ 
      error: 'Debug error', 
      message: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 