const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting custom build process...');

// Ensure node_modules/.prisma exists
const prismaDir = path.join(process.cwd(), 'node_modules', '.prisma');
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
  console.log('Created .prisma directory');
}

try {
  // Run prisma generate explicitly
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma Client generated successfully!');
  
  // Verify that the Prisma client was generated
  const nodeModulesPrismaClient = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
  if (fs.existsSync(nodeModulesPrismaClient)) {
    console.log('Prisma client exists at:', nodeModulesPrismaClient);
  } else {
    console.warn('Warning: Prisma client directory not found at expected location');
  }

  // Run Next.js build
  console.log('Starting Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Next.js build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 