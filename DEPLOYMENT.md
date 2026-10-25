# DEPLOYMENT.md — Production Deployment & Continuous Delivery Guide

This document outlines the deployment architecture, configuration steps, and maintenance procedures for the **UJAAS: Crisis Care Network** web application.

---

## 1. Hosting Architecture Overview

- **Platform:** GitHub Pages
- **Environment:** Static Single-Page Application (SPA)
- **Deployment Mechanism:** GitHub Actions with official Pages actions
- **Production URL:** [https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/](https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/)
- **Repository:** [https://github.com/rakshithrockstar1607/ujaas-crisis-care-network](https://github.com/rakshithrockstar1607/ujaas-crisis-care-network)
- **Primary Branch:** `main`

---

## 2. CI/CD Workflow (`.github/workflows/deploy.yml`)

Deployment is managed by an automated pipeline triggered on:
- Every `push` to the `main` branch.
- Manual trigger via `workflow_dispatch` in the GitHub Actions tab.

### Pipeline Stages

1. **Checkout Repository:** Retrieves source code using `actions/checkout@v4`.
2. **Setup Node.js:** Provisions Node.js 20 with package-lock cache enabled via `actions/setup-node@v4`.
3. **Install Dependencies:** Executes `npm ci` for deterministic, clean package installation.
4. **Compile & Bundle:** Runs `npm run build`, which triggers:
   - TypeScript compiler verification (`tsc`).
   - Vite production bundle with base path `/ujaas-crisis-care-network/`.
5. **Configure GitHub Pages:** Provisions pages metadata via `actions/configure-pages@v5`.
6. **Upload Artifact:** Packages the `./dist` directory using `actions/upload-pages-artifact@v3`.
7. **Deploy to Pages:** Publishes to the live production environment using `actions/deploy-pages@v4`.

---

## 3. GitHub Pages Repository Configuration

To activate GitHub Actions deployment in the GitHub repository:

1. Navigate to your repository: `https://github.com/rakshithrockstar1607/ujaas-crisis-care-network`
2. Click **Settings** in the top navigation bar.
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - For **Source**, select **GitHub Actions** from the dropdown.
5. Once selected, GitHub will automatically connect subsequent runs of `.github/workflows/deploy.yml`.

---

## 4. Subdirectory Base Path Management

GitHub Pages hosts project repositories under a subpath: `/<repository-name>/`.

### Vite Configuration (`vite.config.ts`)
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ujaas-crisis-care-network/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
}));
```
- In development (`npm run dev`), `base` is `/` so local testing runs at `http://localhost:3000/`.
- In production build (`npm run build`), `base` is `/ujaas-crisis-care-network/`, ensuring all script, style, and asset references point to the correct subdirectory.

### Asset Utility (`src/utils/assets.ts`)
All dynamic image and asset paths in the frontend code are wrapped with `getAssetUrl(path)`:
```ts
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseSubpath = cleanBase.replace(/^\//, '');
  if (baseSubpath && cleanPath.startsWith(baseSubpath)) {
    return `/${cleanPath}`;
  }
  return `${cleanBase}${cleanPath}`;
}
```
This utility prevents broken image links, handles cached avatars, and avoids duplicate path prefixing.

---

## 5. Future Custom Domain Configuration

If UJAAS is later mapped to a custom domain (e.g. `ujaas.org` or `care.ujaas.in`):

1. **Update `vite.config.ts`:**
   Change `base` to `/` for root-level domain hosting:
   ```ts
   base: '/',
   ```
2. **Add Custom Domain in GitHub:**
   - Go to **Settings > Pages > Custom domain**.
   - Enter your domain name and save.
   - Configure DNS records (A records or CNAME) with your DNS registrar.
   - Enable **Enforce HTTPS**.
3. Commit and push the updated `vite.config.ts` to `main`.

---

## 6. Troubleshooting Common Issues

### Issue: GitHub Pages displays 404 for assets or scripts
- **Cause:** Base path mismatch between Vite configuration and repository name.
- **Solution:** Verify `base: '/ujaas-crisis-care-network/'` in `vite.config.ts` matches the exact GitHub repository name.

### Issue: Fonts or icons do not display
- **Cause:** Absolute paths in CSS files bypassed Vite rebasing.
- **Solution:** In CSS files, use relative paths to font files (e.g. `../../public/fonts/...`) so Vite bundles and resolves them with the appropriate subpath.

### Issue: Deployment workflow fails on `npm ci`
- **Cause:** Inconsistency between `package.json` and `package-lock.json`.
- **Solution:** Run `npm install` locally, verify that `package-lock.json` is updated, and commit both files.
