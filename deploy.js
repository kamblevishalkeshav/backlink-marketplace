const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Preparing for Vercel deployment...');

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';
console.log(`Deployment environment: ${isVercel ? 'Vercel' : 'Local'}`);

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.warn('⚠️ Warning: DATABASE_URL is not set. Set this in Vercel environment variables.');
}

// Run prisma generate
try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully!');

  // Verify client was generated
  const prismaClientPath = './node_modules/.prisma/client';
  if (fs.existsSync(prismaClientPath)) {
    console.log(`✅ Prisma Client exists at: ${prismaClientPath}`);
  } else {
    console.warn('⚠️ Warning: Prisma Client directory not found!');
  }

  // If on Vercel, we're done
  if (isVercel) {
    console.log('✅ Deployment preparation complete. Next.js build will run automatically.');
  } else {
    // Local deployment, run Next.js build
    console.log('Running Next.js build locally...');
    execSync('npx next build', { stdio: 'inherit' });
    console.log('✅ Next.js build completed successfully!');
  }
} catch (error) {
  console.error('❌ Deployment preparation failed:', error.message);
  process.exit(1);
} 