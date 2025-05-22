// Database verification script
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function verifyDatabase() {
  console.log('Verifying database connection and content...');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check for home page
    const homePage = await prisma.page.findUnique({
      where: { slug: 'home' },
      include: { sections: true }
    });
    
    if (homePage) {
      console.log('✅ Home page found in database:');
      console.log('   ID:', homePage.id);
      console.log('   Title:', homePage.title);
      console.log('   Sections:', homePage.sections.length);
      homePage.sections.forEach((section, i) => {
        console.log(`   - Section ${i+1}: ${section.name} (Type: ${section.type})`);
      });
    } else {
      console.log('❌ Home page NOT found in database');
      
      // Create it if needed
      console.log('Creating home page...');
      const newHomePage = await prisma.page.create({
        data: {
          title: 'Home Page',
          slug: 'home',
          isPublished: true
        }
      });
      console.log('✅ Created basic home page with ID:', newHomePage.id);
    }
    
    // List all pages in the database
    const allPages = await prisma.page.findMany();
    console.log('\nAll pages in database:');
    allPages.forEach((page, i) => {
      console.log(`${i+1}. "${page.title}" (Slug: ${page.slug}, ID: ${page.id})`);
    });
    
  } catch (error) {
    console.error('❌ Database verification failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase(); 