import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Simple debugging middleware
 * This adds a debug header in development mode
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_request: NextRequest) {
  const response = NextResponse.next()
  
  if (process.env.NODE_ENV !== 'production') {
    response.headers.set('x-debug-mode', 'enabled')
  }
  
  return response
}

// Only apply middleware to API routes
export const config = {
  matcher: ['/api/:path*'],
} 