import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// PrismaClient initialization with better error handling for serverless environments
// Learn more: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// Define global type for TypeScript
// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined
}

// Simple function to create a Prisma client with Accelerate
function createPrismaClient() {
  // During build phase or static generation, return a dummy client
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === undefined) {
    return {} as PrismaClient & ReturnType<typeof withAccelerate>;
  }
  
  return new PrismaClient().$extends(withAccelerate());
}

// In development, reuse the same client across hot reloads
// In production, create a fresh client for each request
const prisma = global.prisma || createPrismaClient();

// Only cache the client in development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 