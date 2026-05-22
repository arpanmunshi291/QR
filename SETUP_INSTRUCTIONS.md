# Database Setup Instructions

## Issue
The Prisma client generation is failing because a file is locked. This typically happens when:
- A development server is running
- Another Node.js process is using the Prisma client
- VS Code or another editor has locked the file

## Solution

### Step 1: Stop All Running Processes
1. Close any terminal windows running `npm run dev` or similar commands
2. Stop any Node.js processes in Task Manager (Ctrl+Shift+Esc)
3. Close and reopen your code editor if needed

### Step 2: Generate Prisma Client
Once all processes are stopped, run:
```bash
cd saas-app
npx prisma generate
```

### Step 3: Start Your Application
```bash
npm run dev
```

## What Was Changed

### Database Migration: PostgreSQL → SQLite
- ✅ Updated `prisma/schema.prisma` to use SQLite
- ✅ Updated `.env` and `.env.local` with SQLite connection
- ✅ Removed PostgreSQL-specific `@db.Text` attributes
- ✅ Created SQLite database at `prisma/dev.db`
- ✅ Added missing `zod` dependency

### Files Modified
1. **saas-app/.env** - Changed DATABASE_URL to SQLite
2. **saas-app/.env.local** - Changed DATABASE_URL to SQLite
3. **saas-app/prisma/schema.prisma** - Updated for SQLite compatibility
4. **saas-app/package.json** - Added zod dependency

## Verification
After setup, you should be able to:
- Sign up with email/password
- Sign in with email/password
- Sign in with Google OAuth
- Create QR codes

## Troubleshooting

### If you still get file lock errors:
1. Restart your computer (this will close all locked processes)
2. Run `npx prisma generate` immediately after restart
3. Then run `npm run dev`

### If you get "Prisma Client not found" errors:
Run: `npx prisma generate`

### If you want to reset the database:
```bash
# Delete the database file
rm prisma/dev.db

# Recreate it
npx prisma db push
```
