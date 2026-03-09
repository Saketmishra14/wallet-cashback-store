# GitHub Actions CI/CD Setup Guide

This guide helps you set up continuous integration and deployment for the wallet-cashback-store project using GitHub Actions.

## Overview

Two GitHub Actions workflows are configured:
- **Backend CI/CD** (`.github/workflows/backend.yml`) - Tests and deploys backend
- **Frontend CI/CD** (`.github/workflows/frontend.yml`) - Tests and deploys frontend

## Setting Up GitHub Actions

### Step 1: Configure GitHub Repository Secrets

Go to your GitHub repository:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

#### For Backend (Render)
```
Name: RENDER_DEPLOY_HOOK
Value: [Your Render Deploy Hook URL]
```

To get Render Deploy Hook:
- Go to Render Dashboard → Select your service
- Go to **Deploy** → **Trigger deploys** → **Get webhook URL**
- Copy the URL and paste as secret value

#### For Frontend (Vercel)
```
Name: VERCEL_TOKEN
Value: [Your Vercel API Token]

Name: VERCEL_PROJECT_ID
Value: [Your Vercel Project ID]

Name: VERCEL_ORG_ID
Value: [Your Vercel Organization/Team ID]
```

To get Vercel secrets:

**VERCEL_TOKEN:**
- Go to [Vercel Settings](https://vercel.com/account/tokens)
- Click "Create Token"
- Copy and paste as secret

**VERCEL_PROJECT_ID:**
- Go to Project Settings → General
- Find "Project ID" and copy

**VERCEL_ORG_ID:**
- Go to Team/Account Settings
- Find "Team ID" (if using team) or use account slug

### Step 2: Enable Workflows

1. Go to **Actions** tab in your repository
2. Workflows should be automatically detected
3. Click "Enable" if needed

### Step 3: Verify Setup

1. Make a small change to `backend/` folder and push
2. Check **Actions** tab to see backend workflow run
3. Make a change to `frontend/` folder and push
4. Check to see frontend workflow run

## Workflow Details

### Backend Workflow (backend.yml)

**Triggers:**
- Push to main or develop branch (changes in `backend/`)
- Pull requests to main or develop (changes in `backend/`)

**Jobs:**
1. **test-and-lint**
   - Installs dependencies
   - Runs security audit
   - Validates package.json

2. **build-check**
   - Verifies server module can be loaded
   - Checks dependencies

3. **deploy** (only on main branch push)
   - Triggers Render deployment webhook
   - Only runs after build passes

**What it checks:**
- ✅ All dependencies installable
- ✅ Security vulnerabilities
- ✅ Node.js compatibility (20.x)

### Frontend Workflow (frontend.yml)

**Triggers:**
- Push to main or develop branch (changes in `frontend/`)
- Pull requests to main or develop (changes in `frontend/`)

**Jobs:**
1. **test-and-lint**
   - Installs dependencies
   - Runs ESLint checks
   - Security audit

2. **build**
   - Builds project with Vite
   - Verifies dist folder created
   - Uploads build artifacts

3. **deploy** (only on main branch push)
   - Deploys to Vercel using CLI
   - Only runs after build succeeds

**What it checks:**
- ✅ ESLint passes
- ✅ Build creates valid dist folder
- ✅ No security vulnerabilities
- ✅ Node.js compatibility (20.x)

## Manual Deployment

If automated deployment isn't set up, you can deploy manually:

### Manual Backend Deployment
1. Go to Render Dashboard
2. Select your service
3. Click **Deploy** → **Deploy latest commit**

### Manual Frontend Deployment
1. Go to Vercel Dashboard
2. Select your project
3. Click **Deployments** → **Redeploy**

Or push to main branch (if GitHub is connected):
```bash
git push origin main
```

## Troubleshooting GitHub Actions

### Workflow won't run
- Check **Actions** tab for error messages
- Verify branch name is correct (main/develop)
- Check file paths trigger rules

### Backend deployment fails
- Verify RENDER_DEPLOY_HOOK secret is set correctly
- Check Render service is active
- Look at GitHub Actions logs for error details

### Frontend build fails
- Check ESLint errors in logs
- Verify all required files are committed
- Ensure package.json dependencies are correct

### Vercel deployment fails
- Verify Vercel tokens are correct
- Check project ID matches actual project
- Ensure environment variables are set in Vercel

## Monitoring Deployments

### GitHub Actions
- Click **Actions** tab to see all workflow runs
- Click a workflow to see detailed logs
- Watch for red (❌) or green (✅) status

### Render
- Go to Render Dashboard → Service → Logs
- Check deployment status
- View runtime logs

### Vercel
- Go to Vercel Dashboard → Deployments
- Click deployment to see build logs
- Check deployment status

## Advanced Configuration

### Skip Workflows
Add to commit message:
```
git commit -m "Update README [skip ci]"
```

### Manual Workflow Dispatch
In GitHub Actions, workflows can be set to allow manual triggering:

1. Add to workflow file:
```yaml
on:
  workflow_dispatch:
```

2. Go to Actions tab
3. Click workflow
4. Click "Run workflow" button

### Environment Variables in Workflows

Backend workflow environment:
- NODE_ENV: testing/production
- NODE_VERSION: 20.x

Frontend workflow environment:
- NODE_ENV: production
- NODE_VERSION: 20.x

## Best Practices

✅ **Do:**
- Keep secrets encrypted
- Test locally before pushing
- Use meaningful commit messages
- Monitor workflow runs regularly
- Update workflows when dependencies change

❌ **Don't:**
- Commit .env files
- Hardcode sensitive data
- Ignore workflow failures
- Use predictable secret names
- Store credentials in logs

## Getting Help

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Deployment Hooks](https://render.com/docs/deploy-hooks)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

## Quick Reference

| Task | Command |
|------|---------|
| Test backend locally | `cd backend && npm ci && npm start` |
| Test frontend build | `cd frontend && npm ci && npm run build` |
| View workflow logs | GitHub Actions tab → click workflow |
| Trigger manual deploy | GitHub Actions → workflow_dispatch |
| Check deployment status | Render/Vercel Dashboard |

---

**Last Updated**: March 9, 2026
**Status**: Ready for Production
