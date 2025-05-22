import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// PrismaClient initialization with better error handling for serverless environments
// Learn more: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// Define global type for TypeScript
// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined
}

// Create the Prisma client with Accelerate
function createPrismaClient() {
  // During build phase, create a basic client
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });
  
  // Only use Accelerate in non-development environments
  if (process.env.NODE_ENV !== 'development') {
    return client.$extends(withAccelerate());
  }
  
  return client;
}

// Use the global client in development to prevent connection pool exhaustion
// In production, create a fresh client for each request
const prisma = global.prisma || createPrismaClient();

// Only store the client in global in development
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

// Test the connection
prisma.$connect()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((e) => {
    console.error('Database connection failed:', e);
  });

export default prisma;