This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to GCP Cloud Run

This project is configured for automatic deployment to Google Cloud Run using GitHub Actions.

### Prerequisites

1. **GCP Project Setup**
   - Create a GCP project (or use existing one)
   - Enable the following APIs:
     ```bash
     gcloud services enable cloudbuild.googleapis.com
     gcloud services enable run.googleapis.com
     gcloud services enable artifactregistry.googleapis.com
     ```

2. **Create Artifact Registry Repository**
   ```bash
   gcloud artifacts repositories create gcp-cicd-test \
     --repository-format=docker \
     --location=asia-northeast3 \
     --description="Docker repository for gcp-cicd-test"
   ```

3. **Create Service Account**
   ```bash
   gcloud iam service-accounts create github-actions \
     --description="Service account for GitHub Actions" \
     --display-name="GitHub Actions"
   ```

4. **Grant Required Permissions**
   ```bash
   PROJECT_ID=$(gcloud config get-value project)

   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/run.admin"

   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/artifactregistry.writer"

   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   ```

5. **Create Service Account Key**
   ```bash
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
   ```

6. **Configure GitHub Secrets**

   Go to your GitHub repository → Settings → Secrets and variables → Actions

   Add the following secrets:
   - `GCP_PROJECT_ID`: Your GCP project ID
   - `GCP_SA_KEY`: Contents of the `key.json` file (entire JSON)

### Deployment Workflow

**Automatic Deployment:**
- Push to `main` branch → Deploys to Cloud Run
- Create tag (e.g., `v1.0.0`) → Deploys tagged version

**PR Testing:**
- Create/update PR → Runs CI tests (lint, build, Docker test)

### Manual Deployment

If you want to deploy manually:

```bash
# Build Docker image
docker build -t asia-northeast3-docker.pkg.dev/YOUR_PROJECT_ID/gcp-cicd-test/gcp-cicd-test:latest .

# Push to Artifact Registry
docker push asia-northeast3-docker.pkg.dev/YOUR_PROJECT_ID/gcp-cicd-test/gcp-cicd-test:latest

# Deploy to Cloud Run
gcloud run deploy gcp-cicd-test \
  --image=asia-northeast3-docker.pkg.dev/YOUR_PROJECT_ID/gcp-cicd-test/gcp-cicd-test:latest \
  --platform=managed \
  --region=asia-northeast3 \
  --allow-unauthenticated
```

### Local Docker Testing

```bash
# Build image
docker build -t gcp-cicd-test:local .

# Run container
docker run -p 3000:3000 gcp-cicd-test:local

# Open http://localhost:3000
```

### Environment Variables

Copy `.env.example` to `.env.local` for local development:
```bash
cp .env.example .env.local
```

For Cloud Run, set environment variables in the deployment workflow or via GCP Console.
