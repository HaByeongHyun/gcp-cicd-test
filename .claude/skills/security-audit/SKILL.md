---
name: security-audit
description: Performs comprehensive security scan including secrets, vulnerabilities, headers, and configurations. Use for security reviews, before deployments, or periodic audits.
---

# Security Audit

프로젝트의 보안 상태를 종합적으로 점검합니다.

## Audit Categories

### 1. Secret Detection

- [ ] Search for hardcoded API keys, passwords, tokens
- [ ] Verify `.env*` files are in `.gitignore`
- [ ] Check `.env.example` exists and is up-to-date
- [ ] Verify `NEXT_PUBLIC_` prefix usage is correct

**Detection Patterns:**

```bash
# Search for common secret patterns
grep -r "api.*key.*=.*['\"]" src/
grep -r "password.*=.*['\"]" src/
grep -r "secret.*=.*['\"]" src/
```

### 2. Security Headers

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy configured
- [ ] Content-Security-Policy (if applicable)

**Location:** Check `next.config.ts` headers() function

### 3. Dependency Vulnerabilities

- Run `pnpm audit`
- Count HIGH/CRITICAL vulnerabilities
- List updatable packages
- Recommend fixes

### 4. Sensitive File Exposure

- [ ] `.git` excluded from deployment
- [ ] `node_modules` in `.gitignore`
- [ ] No backup files (_.bak, _.old) committed
- [ ] No credential files (gcp-key.json, etc.)

### 5. API Security

- [ ] Environment variable validation
- [ ] Input sanitization on API routes
- [ ] Rate limiting configured
- [ ] CORS not overly permissive

### 6. PWA Security

- [ ] Service Worker safely implemented
- [ ] No sensitive data in manifest
- [ ] localStorage error handling

## Risk Classification

- 🔴 **Critical**: Immediate action required
- 🟡 **High**: Fix soon
- 🟠 **Medium**: Should address
- 🟢 **Low**: Best practice improvement
- ℹ️ **Info**: For awareness

## Report Format

For each finding:

- Description
- Risk level
- Impact assessment
- Remediation steps
- Reference links

## Usage Scenarios

- Weekly/monthly security reviews
- Before major deployments
- After adding new features
- Post-incident investigation

## Options

- `--fix`: Auto-fix safe issues
- `--report`: Generate detailed report file
- `--ci`: Concise output for CI/CD
