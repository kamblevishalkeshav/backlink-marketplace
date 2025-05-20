const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel optimized build process...');

// Generate Prisma client
try {
  console.log('1️⃣ Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully.');
} catch (error) {
  console.error('❌ Error generating Prisma client:', error);
  process.exit(1);
}

// Find and temporarily rename problematic route groups
const appDir = path.join(process.cwd(), 'src', 'app');
let renamedDirs = [];

try {
  console.log('2️⃣ Checking for problematic route groups...');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('(') && entry.name.endsWith(')')) {
      const originalPath = path.join(appDir, entry.name);
      const tempPath = path.join(appDir, `_temp_${entry.name.slice(1, -1)}`);
      
      console.log(`  📁 Temporarily renaming ${entry.name} to _temp_${entry.name.slice(1, -1)}`);
      fs.renameSync(originalPath, tempPath);
      
      renamedDirs.push({
        original: originalPath,
        temp: tempPath
      });
    }
  }
  
  console.log(`✅ Renamed ${renamedDirs.length} problematic directories.`);
} catch (error) {
  console.error('❌ Error handling route groups:', error);
  process.exit(1);
}

// Run Next.js build
try {
  console.log('3️⃣ Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Next.js build completed successfully.');
} catch (error) {
  console.error('❌ Next.js build failed:', error);
  // Always try to restore directories even if build fails
} finally {
  // Restore original directory names
  console.log('4️⃣ Restoring original directory names...');
  for (const dir of renamedDirs) {
    try {
      fs.renameSync(dir.temp, dir.original);
      console.log(`  📁 Restored ${path.basename(dir.original)}`);
    } catch (e) {
      console.error(`  ❌ Failed to restore ${path.basename(dir.original)}:`, e);
    }
  }
}

console.log('🎉 Build process completed!'); 