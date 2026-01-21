---
name: deploy-prep
description: Comprehensive pre-deployment checklist combining build checks, security audit, PWA validation, and environment verification. Use before production deployments.
---

# Deploy Prep

배포 전 종합 체크리스트를 실행하여 프로덕션 준비 상태를 확인합니다.

## Execution Phases

### Phase 1: Code Quality (build-check)

1. Lint check
2. Type check
3. Production build

### Phase 2: Security (security-audit)

1. Environment variables
2. Hardcoded secrets scan
3. Dependency vulnerabilities
4. Security headers

### Phase 3: PWA Validation (pwa-check)

1. Manifest file
2. Service Worker build
3. Icon files

### Phase 4: Environment Configuration

- [ ] `.env.production` ready?
- [ ] Production API endpoints configured?
- [ ] Domain settings correct?
- [ ] Analytics enabled?

### Phase 5: Performance Check

- [ ] Build size appropriate?
  - First Load JS < 200KB recommended
  - Each page < 100KB recommended
- [ ] Images optimized?
- [ ] No console.log remaining?

### Phase 6: SEO & Metadata

- [ ] `robots.txt` correct?
- [ ] Sitemap up-to-date?
- [ ] Meta tags on all pages?
- [ ] Open Graph images set?

### Phase 7: External Services

- [ ] API keys are production keys?
- [ ] Google Analytics configured?
- [ ] Google AdSense added? (if applicable)
- [ ] CDN configured?

### Phase 8: Git Status

- [ ] All changes committed?
- [ ] Synced with main branch?
- [ ] No conflicts?
- [ ] Need git tag?

## Pre-Deployment Checklist

### Before Deploy

```bash
# 1. Pull latest code
git pull origin main

# 2. Update dependencies (optional)
pnpm install

# 3. Verify build
pnpm build

# 4. Test production mode locally
pnpm start
# → Visit http://localhost:3000
```

### GCP Deployment Checks

- [ ] Cloud Build trigger configured?
- [ ] Environment variables set in Cloud Run/App Engine?
- [ ] Domain mapping complete?
- [ ] HTTPS certificate valid?
- [ ] Load balancer configured?

### Post-Deploy Verification

**1. Functionality Tests**

- [ ] Main page loads
- [ ] Search works
- [ ] Detail pages load
- [ ] PWA install prompt shows

**2. Performance Tests**

- [ ] Lighthouse score (Performance > 90)
- [ ] Core Web Vitals
- [ ] Image loading speed

**3. Security Tests**

- [ ] HTTPS enforced
- [ ] Security headers applied (check DevTools Network)
- [ ] No Mixed Content warnings

**4. SEO Tests**

- [ ] Request crawl in Google Search Console
- [ ] Meta tags verified (View Source)
- [ ] robots.txt accessible

## Rollback Plan

If issues occur:

1. Immediate rollback method ready
2. Version management via git tags
3. Database migration rollback script (if applicable)

## Notifications

After deployment:

- [ ] Notify team
- [ ] Check monitoring dashboard
- [ ] Start error log monitoring

## Deployment Status Report

### Readiness Status

- ✅ Ready: All checks passed
- ⚠️ Warning: Deployable with caution
- ❌ Not Ready: Critical issues found

### Failed Items Detail

For each failure:

- Description
- Impact
- Fix instructions
- Estimated time

### Success Message

```
🚀 Ready to Deploy!

✅ Code Quality: Pass
✅ Security: Pass
✅ PWA: Pass
✅ Configuration: Pass

You may proceed with deployment.
```

## Usage Scenarios

- Before production deployment
- Before staging deployment
- Before major feature release
- Regular deployments (weekly/monthly)

## Options

- `--quick`: Check essentials only
- `--full`: Include all tests
- `--fix`: Auto-fix safe issues
- `--staging`: Staging environment config
