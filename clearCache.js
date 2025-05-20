const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Clearing Next.js and Vercel cache...');

// Paths to clear
const pathsToClear = [
  '.next',
  '.vercel/output',
  'node_modules/.cache'
];

// Remove directories
pathsToClear.forEach(dirPath => {
  const fullPath = path.join(process.cwd(), dirPath);
  
  if (fs.existsSync(fullPath)) {
    try {
      console.log(`Removing ${dirPath}...`);
      if (process.platform === 'win32') {
        // Windows requires a different approach for nested directories
        execSync(`rmdir /s /q "${fullPath}"`, { stdio: 'inherit' });
      } else {
        // Unix-based systems
        execSync(`rm -rf "${fullPath}"`, { stdio: 'inherit' });
      }
      console.log(`✅ Removed ${dirPath}`);
    } catch (error) {
      console.error(`❌ Failed to remove ${dirPath}:`, error.message);
    }
  } else {
    console.log(`Directory ${dirPath} does not exist, skipping.`);
  }
});

// Check for route groups with parentheses
const appDir = path.join(process.cwd(), 'src', 'app');
if (fs.existsSync(appDir)) {
  console.log('Checking for route groups with parentheses...');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('(') && entry.name.endsWith(')')) {
      const routePath = path.join(appDir, entry.name);
      console.log(`⚠️ Found route group with parentheses: ${entry.name}`);
      console.log(`Removing ${routePath}...`);
      
      try {
        if (process.platform === 'win32') {
          execSync(`rmdir /s /q "${routePath}"`, { stdio: 'inherit' });
        } else {
          execSync(`rm -rf "${routePath}"`, { stdio: 'inherit' });
        }
        console.log(`✅ Removed ${entry.name}`);
      } catch (error) {
        console.error(`❌ Failed to remove ${entry.name}:`, error.message);
      }
    }
  }
}

console.log('✨ Cache clearing complete!'); 