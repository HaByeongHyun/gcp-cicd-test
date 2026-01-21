---
name: build-check
description: Runs lint, type-check, and build to verify the project is ready for commit or deployment. Use before committing, creating PRs, or deploying.
---

# Build Check

커밋이나 배포 전에 프로젝트가 정상적으로 빌드되는지 검증합니다.

## Execution Steps

**1. Lint Check**

- Run `pnpm lint`
- Report any ESLint errors
- Stop if critical errors found

**2. Type Check**

- Run `pnpm tsc --noEmit`
- Check for TypeScript errors
- Show file and line numbers for errors

**3. Production Build**

- Run `pnpm build`
- Measure build time
- Check build output size

**4. Results Summary**

- ✅ All checks passed: "Ready to commit/deploy"
- ❌ Failed checks: Detailed error messages with fix suggestions

## Additional Checks

- Report build warnings
- Check `.next` directory size (warn if > 500MB)
- Identify unused dependencies (if requested)

## Usage Scenarios

- Before git commit
- Before creating PR
- Before deployment
- Debugging CI/CD failures locally

## Options

User can request:

- `--skip-lint`: Skip lint check
- `--quick`: Only run type-check
- `--full`: Include tests (if test script exists)
