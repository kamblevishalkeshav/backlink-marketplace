import { handlePrismaError } from '@/lib/error-handler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * Detailed health check endpoint to verify the application and database connection
 * are working properly. This is useful for testing after deployment to Vercel.
 */
export async function GET() {
  try {
    // Simple query to test database connection
    const dbStartTime = Date.now()
    const count = await prisma.page.count()
    const dbResponseTime = Date.now() - dbStartTime
    
    // Simple database diagnostic
    const serverInfo = {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'not-vercel',
      region: process.env.VERCEL_REGION || 'unknown',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
    
    // Database diagnostic
    const dbInfo = {
      connected: true,
      pagesCount: count,
      responseTimeMs: dbResponseTime,
      clientInitialized: Boolean(prisma?.$connect),
    }
    
    return NextResponse.json({
      status: 'ok',
      server: serverInfo,
      database: dbInfo,
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    // Use our error handler for proper response formatting
    return handlePrismaError(error)
  }
} 