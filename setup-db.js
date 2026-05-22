const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up SQLite database...\n');

// Remove the .prisma folder to avoid file locks
const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma');
if (fs.existsSync(prismaClientPath)) {
  console.log('Removing old Prisma client...');
  try {
    fs.rmSync(prismaClientPath, { recursive: true, force: true });
    console.log('✓ Old Prisma client removed\n');
  } catch (err) {
    console.log('Warning: Could not remove old client, continuing...\n');
  }
}

// Generate Prisma client
console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('\n✓ Database setup complete!');
  console.log('\nYou can now run: npm run dev');
} catch (err) {
  console.error('\n✗ Error generating Prisma client');
  console.error('Please close any running dev servers and try again.');
  process.exit(1);
}
