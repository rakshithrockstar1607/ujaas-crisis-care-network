# AGENTS.md — Development and Maintenance Guide for AI Agents & Engineers

This document contains persistent architectural rules, asset conventions, and operational workflows for any developer or AI assistant working on the **UJAAS: Crisis Care Network** codebase.

---

## 1. Project Context & Philosophy

- **Project Name:** UJAAS (Crisis Care Network)
- **Setting:** Fictional humanitarian crisis-response product set in Bengaluru immediately following the Snap of April 2018.
- **Design Language:** 70% Humanist Editorial x 30% Warm Neo-Brutalism.
  - Serif headlines: Canela (`Canela`, serif)
  - Supporting text: Inter (`Inter`, sans-serif)
  - Palette: Warm Ivory (`#FAF7F0`), Deep Navy (`#091C33`), Action Orange (`#F45124`), Soft Parchment (`#FFFDF9`), Alert Vermillion (`#DC2626`).
  - Tactile borders, subtle offset shadows, gentle spatial hover physics.
- **Writing Standard:** Zero em dashes in user-facing text. Use hyphens, colons, commas, or parentheses instead.

---

## 2. Technical Stack

- **Framework:** React 19 with TypeScript
- **Bundler:** Vite 6
- **Styling:** CSS Modules with CSS custom properties
- **Icons:** Lucide React
- **Mapping:** Leaflet with custom SVG/HTML markers and civic radar pulses
- **State Management:** React Context (`CareContext`, `AccountContext`) with browser localStorage persistence

---

## 3. Asset Resolution & GitHub Pages Subdirectory Rules

The production site is hosted on GitHub Pages under a subpath:
`https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/`

In local development, the site runs at root:
`http://localhost:3000/`

To prevent 404 errors on public assets (images, icons, fonts) across environments:

### Rule 1: Always Use `getAssetUrl` for JavaScript/TypeScript Image Paths
Whenever referencing an image in TSX, state, or data arrays, wrap the path with `getAssetUrl`:
```tsx
import { getAssetUrl } from '../utils/assets';

// Inside component or data definition:
<img src={getAssetUrl('/images/contacts/aarav.png')} alt="Aarav" />
```
The helper function handles both root `/` and subpath `/ujaas-crisis-care-network/` idempotently without double-prefixing.

### Rule 2: Asset Paths in CSS Modules
In CSS files, place bundled fonts or background images in `src/assets/` and use relative paths so Vite processes, hashes, and rebases them automatically during production builds without public-folder dev warnings:
```css
/* In src/styles/fonts.css */
@font-face {
  font-family: 'Canela';
  src: url('../assets/fonts/canela/Canela-Regular-Trial.woff2') format('woff2');
}

/* In component CSS modules */
.photoBackground {
  background-image: url('../../assets/images/onboarding-elder.png');
}
```

### Rule 3: Asset References in `index.html`
In `index.html`, use `%BASE_URL%` placeholders:
```html
<link rel="icon" type="image/png" href="%BASE_URL%images/logo-emblem.png" />
<link rel="preload" href="%BASE_URL%fonts/canela/Canela-Regular-Trial.woff2" as="font" type="font/woff2" crossorigin />
```

---

## 4. Local Development & Verification

- **Start Dev Server:**
  ```bash
  npm run dev
  ```
  Runs at [http://localhost:3000](http://localhost:3000).

- **Production Build:**
  ```bash
  npm run build
  ```
  Runs TypeScript type-checks (`tsc`) and bundles with Vite using base `/ujaas-crisis-care-network/`.

- **Preview Production Build Locally:**
  ```bash
  npx vite preview
  ```

---

## 5. Deployment & CI/CD Pipeline

Continuous deployment is fully automated via GitHub Actions:
- **Workflow configuration:** `.github/workflows/deploy.yml`
- **Triggers:** Automatic on every push to the `main` branch, plus manual `workflow_dispatch`.
- **Target Repository:** `rakshithrockstar1607/ujaas-crisis-care-network`
- **Target Environment:** GitHub Pages (`github-pages`)
- **Live Production URL:** `https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/`

When updating features or fixing bugs:
1. Ensure all changes pass `npm run build`.
2. Commit with conventional commit messages (e.g. `feat: ...`, `fix: ...`, `refactor: ...`).
3. Push to `main`. GitHub Actions will automatically rebuild and deploy within 1 to 2 minutes.
