const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to ensure a directory exists
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

console.log('🚀 Starting special Vercel build process...');

// Step 1: Run Prisma generate
try {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}

// Step 2: Create placeholder file for the problematic route
try {
  console.log('Creating placeholder manifest files...');
  
  const placeholders = [
    '.next/server/app/(dashboard)',
    '.next/server/app/(admin)',
    '.next/server/app/(auth)',
    '.next/server/app/(publisher)',
    '.next/server/app/(public)'
  ];
  
  placeholders.forEach(placeholder => {
    const dirPath = path.join(process.cwd(), placeholder);
    ensureDirExists(dirPath);
    
    // Create page_client-reference-manifest.js
    const manifestPath = path.join(dirPath, 'page_client-reference-manifest.js');
    fs.writeFileSync(manifestPath, '// Placeholder file created by build script\nmodule.exports = {};\n');
    console.log(`Created placeholder: ${manifestPath}`);
  });
  
  console.log('✅ Created all placeholder files');
} catch (error) {
  console.error('Error creating placeholders:', error);
  // Continue with build even if this fails
}

// Step 3: Run Next.js build
try {
  console.log('Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Next.js build completed');
} catch (error) {
  console.error('Next.js build failed:', error);
  process.exit(1);
}

console.log('🎉 Build process completed successfully!'); 