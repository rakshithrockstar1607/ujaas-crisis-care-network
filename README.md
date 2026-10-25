# UJAAS | Crisis Care Network

[![Deploy UJAAS to GitHub Pages](https://github.com/rakshithrockstar1607/ujaas-crisis-care-network/actions/workflows/deploy.yml/badge.svg)](https://github.com/rakshithrockstar1607/ujaas-crisis-care-network/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-22c55e?logo=github&logoColor=white)](https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)

> **"When half the world disappeared, everyday care disappeared with it. We still have each other."**

UJAAS is an India-first crisis care network set in Bengaluru immediately after the global Snap of April 2018. When essential routines collapsed and family caregivers disintegrated without warning, ordinary tasks became urgent emergencies. UJAAS organizes neighbourhood mutual aid, verified dependent care, and community-led relief with compassion, dignity, and calm.

---

## Live Production Website

- **Production Deployment:** [https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/](https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/)
- **Local Development URL:** [http://localhost:3000](http://localhost:3000)

---

## Core Product Capabilities

### 1. Section 01: Cinematic Hero & Branded Loader
- Atmospheric introductory experience with ambient ember lighting and calm progress transitions.
- High-resolution hero portrait showcasing the human bond between generations.
- Direct dual calls to action: "I need help" and "I can help".

### 2. Section 02: The Invisible Impact
- Editorial narrative illustrating how everyday responsibilities hold a community together.
- High-fidelity portrait of Savitri Amma (78, Indiranagar) paired with interactive care detail cards.
- Explores morning medication schedules, kitchen ration restocking, and quiet welfare checks.

### 3. Section 03: The Living Circle
- Interactive spatial constellation communicating that community care is dynamic, not static.
- Fluid floating nodes for neighbourhood members (Aarav, Meera, Priya, Rohan, Vikram).
- Living scenario selector displaying real-time impacts on dependent care, grocery pickups, and safeguarding.

### 4. My Circle: Care Network & Dependent Tracking
- Comprehensive family relationship map and check-in status overview.
- Status verification indicators (confirmed, needs review, missing check-in).
- Travel distances and estimated travel times across Bengaluru neighbourhoods (Indiranagar, Domlur, HAL 2nd Stage, Koramangala).

### 5. Help Now: Immediate Assistance Requests
- Streamlined multi-step request workflow for groceries, drinking water, medicine pickup, and emergency transport.
- Interactive verification map pairing requesters with trusted neighbourhood volunteers.
- Delivery receipt confirmation and handoff logging.

### 6. Child Safe: Sensitive Minor Protection Workflow
- Specialized protective reporting system for unattended children and displaced minors.
- Strict safeguards preventing unauthorized data sharing.
- Fictional coordinator triage view demonstrating verified handover protocols.

### 7. Account Switching & Browser Persistence
- Seeded demonstration account: **Aarav Sharma** (Grandson, Volunteer, Indiranagar).
- Custom account creation with phone verification simulation and neighbourhood selection.
- Complete state persistence across browser reloads using local storage.

---

## Design System

The visual language balances editorial warmth with modern digital utility:
- **70% Humanist Editorial:** Canela typography, generous negative space, natural photography, warm ivory surfaces (`#FAF7F0`).
- **30% Warm Neo-Brutalism:** Delicate solid borders, crisp offset pill badges, structured cards, tactile buttons.
- **Accents:** Enduring Action Orange (`#F45124`), Civic Deep Navy (`#091C33`), Emerald Safe (`#10B981`), Amber Attention (`#F59E0B`).

---

## Architecture & Codebase Structure

```
ujaas-crisis-care-network/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── fonts/                  # Canela serif web fonts (woff2)
│   ├── icons/                  # SVG icons and civic emblems
│   └── images/                 # Optimized webp/png photographs & avatars
├── src/
│   ├── components/             # React feature components
│   │   ├── Account/            # Profile management & switcher
│   │   ├── CareChain/          # Dependent care workflows & Leaflet maps
│   │   ├── ChildSafe/          # Protected child reporting system
│   │   ├── HelpNow/            # Assistance request creation & tracker
│   │   ├── InvisibleImpact/    # Section 02 editorial narrative
│   │   ├── LivingCircle/       # Section 03 interactive constellation
│   │   ├── Onboarding/         # 11-step civic onboarding journey
│   │   └── ...                 # SiteHeader, BrandedLoader, Hero, Modals
│   ├── context/                # CareContext & AccountContext state engines
│   ├── data/                   # Seed data, contacts, tasks, content copy
│   ├── styles/                 # Global styles, variables, typography
│   ├── types/                  # Strict TypeScript domain interfaces
│   └── utils/
│       └── assets.ts           # Subpath-safe asset URL resolution helper
├── index.html                  # HTML entry point with preload directives
├── vite.config.ts              # Vite configuration with production subpath
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript compiler options
```

---

## Local Development Setup

### Prerequisites
- Node.js 18 or higher (Node 20 recommended)
- npm 9 or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rakshithrockstar1607/ujaas-crisis-care-network.git
   cd ujaas-crisis-care-network
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run TypeScript type checks and build:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npx vite preview
   ```

---

## Deployment Pipeline

Deployment is fully automated using GitHub Actions:
1. Every commit pushed to the `main` branch triggers `.github/workflows/deploy.yml`.
2. The workflow performs a clean dependency install (`npm ci`), runs TypeScript checks and Vite build (`npm run build`).
3. The generated `dist` artifact is uploaded and deployed to GitHub Pages.
4. Updates appear live at [https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/](https://rakshithrockstar1607.github.io/ujaas-crisis-care-network/) within two minutes.

---

## Documentation Links

- [DEPLOYMENT.md](DEPLOYMENT.md): In-depth deployment architecture, custom domains, and troubleshooting.
- [AGENTS.md](AGENTS.md): Guide for AI assistants and engineers maintaining the codebase.
