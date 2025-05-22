import { PrismaClient } from '@prisma/client';

// Debug script for Prisma connection issues
export async function debugPrisma() {
  console.log('🔍 Debugging Prisma connection...');
  
  try {
    // Create a fresh Prisma client for debugging
    const debugPrisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Not set');
    console.log('DIRECT_URL:', process.env.DIRECT_URL ? 'Set (hidden for security)' : 'Not set');
    console.log('NODE_ENV:', process.env.NODE_ENV);

    // Try to connect
    await debugPrisma.$connect();
    console.log('✅ Database connection successful');
    
    // Try a simple query to test read access
    console.log('Querying for all pages...');
    const pagesCount = await debugPrisma.page.count();
    console.log(`Found ${pagesCount} pages in the database`);
    
    // Look for the home page specifically
    console.log('Looking for home page...');
    const homePage = await debugPrisma.page.findUnique({
      where: { slug: 'home' },
      include: { sections: true }
    });
    
    if (homePage) {
      console.log('✅ Home page found in database:');
      console.log('   ID:', homePage.id);
      console.log('   Title:', homePage.title);
      console.log('   Published:', homePage.isPublished);
      console.log('   Sections:', homePage.sections.length);
    } else {
      console.log('❌ Home page NOT found in database with slug "home"');
    }
    
    await debugPrisma.$disconnect();
    return { success: true, pagesCount, homePage: homePage ? { id: homePage.id, title: homePage.title } : null };
  } catch (error) {
    console.error('❌ Prisma debug error:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
} 