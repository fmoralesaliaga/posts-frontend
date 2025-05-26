# Production Deployment Guide

This document provides instructions for deploying the Posts Frontend application to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Docker Deployment](#docker-deployment)
5. [Static Hosting Deployment](#static-hosting-deployment)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [CI/CD Integration](#cicd-integration)
8. [Rollback Procedure](#rollback-procedure)

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- Docker (optional, for containerized deployment)
- Access to the target deployment environment

## Environment Setup

1. Create a production environment file:

   ```bash
   cp .env.example .env.production
   ```

2. Edit `.env.production` with the appropriate values:

   ```
   VITE_API_URL=https://api.yourproductionserver.com/api
   NODE_ENV=production
   VITE_APP_TITLE="Posts Manager"
   ```

## Build Process

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Run tests to ensure everything works:

   ```bash
   npm run test
   ```

3. Build the application:

   ```bash
   npm run build
   ```

   This will create a `dist` directory with optimized production files.

## Docker Deployment

### Build the Docker Image

```bash
docker build -t posts-frontend:latest .
```

### Test the Docker Image Locally

```bash
docker run -p 8080:80 posts-frontend:latest
```

The application should now be available at http://localhost:8080

### Push to Container Registry

```bash
docker tag posts-frontend:latest your-registry.com/posts-frontend:latest
docker push your-registry.com/posts-frontend:latest
```

### Deploy to Kubernetes (Example)

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## Static Hosting Deployment

For static hosting providers (Netlify, Vercel, AWS S3, etc.):

1. Configure redirects for SPA routing:

   Create a `_redirects` file in the `public` directory:
   ```
   /* /index.html 200
   ```

2. Deploy the `dist` directory to your static hosting provider.

### Example: AWS S3 + CloudFront

```bash
aws s3 sync dist/ s3://your-bucket-name/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Post-Deployment Verification

1. Verify the application loads correctly
2. Check the API connection works
3. Verify key user flows:
   - Viewing posts
   - Creating new posts
   - Deleting posts
   - Filtering posts

## CI/CD Integration

We use GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/`:

1. `test.yml`: Runs tests on every push and pull request
2. `deploy.yml`: Builds and deploys on merges to main branch

## Rollback Procedure

If issues are detected after deployment:

1. Identify the last stable version/tag
2. For containerized deployments:
   ```bash
   kubectl rollout undo deployment/posts-frontend
   ```
   
   Or specifically to a version:
   ```bash
   kubectl set image deployment/posts-frontend posts-frontend=your-registry.com/posts-frontend:stable-version
   ```

3. For static hosting:
   - Redeploy the last known working version from your artifact repository
   - Or restore from a backup copy of the static files

## Performance Monitoring

Recommended tools for monitoring:
- Google Lighthouse for performance metrics
- Sentry.io for error tracking
- Google Analytics for user behavior metrics
