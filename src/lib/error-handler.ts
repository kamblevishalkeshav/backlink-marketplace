import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

/**
 * Handle Prisma errors in a consistent way across the application
 * This is especially helpful for serverless environments where connections
 * might time out or need to be re-established
 */
export function handlePrismaError(error: unknown) {
  console.error('Database error:', error)
  
  // For dev debugging only - remove in real production
  const debugInfo = process.env.NODE_ENV !== 'production' ? { 
    errorDetails: error instanceof Error ? error.stack : String(error) 
  } : {}
  
  if (error instanceof PrismaClientInitializationError) {
    return NextResponse.json({
      error: 'Database connection failed',
      message: 'Failed to initialize the database connection',
      ...debugInfo
    }, { status: 503 })
  }
  
  if (error instanceof PrismaClientKnownRequestError) {
    // Specific Prisma error codes can be handled here
    const code = error.code
    if (code === 'P2002') {
      return NextResponse.json({
        error: 'Conflict',
        message: 'A record with this identifier already exists',
        ...debugInfo
      }, { status: 409 })
    } else if (code === 'P2025') {
      return NextResponse.json({
        error: 'Not Found',
        message: 'Record not found',
        ...debugInfo
      }, { status: 404 })
    }
  }
  
  if (error instanceof PrismaClientRustPanicError) {
    // This is a serious internal error, might need to restart
    return NextResponse.json({
      error: 'Internal Server Error',
      message: 'A critical database error occurred',
      ...debugInfo
    }, { status: 500 })
  }
  
  if (error instanceof PrismaClientUnknownRequestError) {
    return NextResponse.json({
      error: 'Database Error',
      message: 'An unexpected database error occurred',
      ...debugInfo
    }, { status: 500 })
  }
  
  // Generic error response for anything else
  return NextResponse.json({
    error: 'Internal Server Error',
    message: 'Something went wrong',
    ...debugInfo
  }, { status: 500 })
} 