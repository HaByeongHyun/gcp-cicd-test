---
name: pwa-check
description: Validates PWA configuration including manifest, service worker, icons, and installation prompts. Use after PWA setup or before deployment.
---

# PWA Check

PWA(Progressive Web App) 설정과 기능을 검증합니다.

## Validation Checklist

### 1. Manifest File

- [ ] `manifest.webmanifest` exists in public/
- [ ] Required fields present:
  - `name`, `short_name`
  - `start_url`
  - `display`
  - `icons` (192x192, 512x512 minimum)
  - `theme_color`, `background_color`
- [ ] Icon files actually exist
- [ ] Manifest linked in `layout.tsx`

**Verification:**

```bash
ls -la public/manifest.webmanifest
ls -la public/icons/
```

### 2. Service Worker

- [ ] Service Worker file generated (`public/sw.js`)
- [ ] Serwist config in `next.config.ts`
- [ ] Service Worker properly registered
- [ ] Caching strategy appropriate

**Check locations:**

- `next.config.ts` - Serwist configuration
- `src/app/sw.ts` - Service Worker source
- `public/sw.js` - Built Service Worker

### 3. Install Prompt

- [ ] `PWAInstallPrompt` component implemented
- [ ] `beforeinstallprompt` event captured
- [ ] localStorage exception handling
- [ ] No memory leaks (useRef usage verified)

**Location:** `src/components/pwa-install-prompt.tsx`

### 4. HTTPS Configuration

- [ ] Production uses HTTPS
- [ ] No Mixed Content warnings
- [ ] Secure Context maintained

### 5. Offline Functionality

- [ ] Basic pages load offline
- [ ] Cached resources served correctly
- [ ] Sync works on network recovery

### 6. Performance

- [ ] Service Worker size < 100KB
- [ ] Cache size reasonable
- [ ] Cache expiration strategy exists

## Build Verification

After build, verify these files exist:

```bash
ls -la public/sw.js
ls -la public/manifest.webmanifest
ls -la public/icons/
```

## Browser Testing Guide

Build and test locally:

```bash
pnpm build
pnpm start
```

**DevTools Checks:**

1. **Application > Manifest**
   - Manifest info displayed
   - All icons load

2. **Application > Service Workers**
   - Registration status
   - Activated state

3. **Application > Cache Storage**
   - Cache created
   - Resources cached

4. **Lighthouse > PWA**
   - Score > 80 (target)
   - Review failed items

## Common Issues

### Issue 1: Service Worker Registration Failed

- Missing `sw.js` → Check build
- Not HTTPS → Test on localhost or HTTPS
- Path error → Verify `/sw.js` path

### Issue 2: Install Prompt Not Showing

- Already installed → Clear localStorage and retry
- Chrome criteria not met → Run Lighthouse
- Event not captured → Check PWAInstallPrompt component

### Issue 3: Icons Not Displaying

- Path error → Check `public/icons/`
- Wrong size → Verify 192x192, 512x512
- CORS issue → Verify same-origin

## Report Format

### Summary

- ✅ Passed checks
- ❌ Failed checks
- ⚠️ Warnings

### Recommended Actions

Priority-ordered fix list

## Usage Scenarios

- After initial PWA setup
- Before deployment
- Diagnosing PWA bugs
- Regular PWA health checks
