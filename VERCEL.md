# Deploying to Vercel

This document provides instructions for deploying this Next.js application with Prisma to Vercel.

## Prerequisites

1. A Vercel account: https://vercel.com/signup
2. A PostgreSQL database (Supabase, Railway, Neon, etc.)
3. Your code pushed to a GitHub repository

## Deployment Steps

### 1. Set up your environment variables

When deploying to Vercel, you need to set the following environment variables:

- **DATABASE_URL**: Your PostgreSQL connection string
  - Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
  - Example with Supabase: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres`

- **NEXTAUTH_SECRET**: A random string for session encryption
  - Generate with: `openssl rand -base64 32`

- **NEXTAUTH_URL**: Your production URL
  - Example: `https://your-app.vercel.app`

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Install Command: `npm install`
4. Add all environment variables
5. Click "Deploy"

### 3. Troubleshooting

If you encounter issues with Prisma during deployment:

1. **Connection Errors**: Ensure your DATABASE_URL is correct and the database is accessible from Vercel
2. **Build Failures**: Check the Vercel build logs for details
3. **Runtime Errors**: Use the health endpoint `/api/health` to check the database connection

### 4. Testing Your Deployment

After deployment, verify your application by:

1. Visit the health endpoint: `https://your-app.vercel.app/api/health`
2. Check that the database connection is successful
3. Test the core functionality of your application

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma with Vercel Guide](https://www.prisma.io/docs/orm/more/deployment/deployment-guides/deploying-to-vercel)
- [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) - For improved database performance in serverless environments 