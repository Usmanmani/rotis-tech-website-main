# ROTIS — Technical Documentation

> **Project:** ROTIS — Rotis Tech (Private) Limited
> **Developed by:** dotwasi
> **CEO & Owner:** Usman Yaseen
> **Copyright © 2026 Rotis Tech (Private) Limited. All Rights Reserved.**

Complete technical documentation for the Rotis Tech corporate website and portfolio web application.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Requirements](#2-system-requirements)
3. [Technology Stack](#3-technology-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Project Structure](#5-project-structure)
6. [Routing & Pages](#6-routing--pages)
7. [Components](#7-components)
8. [Services & AI Integration](#8-services--ai-integration)
9. [Forms (Netlify)](#9-forms-netlify)
10. [Styling & Theming](#10-styling--theming)
11. [Environment Variables](#11-environment-variables)
12. [Installation & Local Development](#12-installation--local-development)
13. [Build & Deployment](#13-build--deployment)
14. [Static Assets](#14-static-assets)
15. [Troubleshooting](#15-troubleshooting)
16. [License & Credits](#16-license--credits)

---

## 1. Introduction

This is a **single-page application (SPA)** built with React and TypeScript, bundled with Vite. It functions as:

- The **corporate website** of Rotis Tech (Private) Limited, presenting the company's vision and its flagship AI-powered hospitality platform, **ROTIS**.
- The **professional portfolio** of the founder and CEO, Usman Yaseen, including credentials, documents, and achievements.

Key capabilities: AI-generated business insights (Google Gemini), a market-research survey, a contact form (both via Netlify Forms), animated UI (Framer Motion), and interactive charts (Recharts).

---

## 2. System Requirements

### Development machine

| Requirement | Version | Notes |
|---|---|---|
| Node.js | **v18+** (LTS recommended) | Required by Vite 5 |
| npm | v9+ | Ships with Node.js |
| Git | Any recent | Version control |
| Modern browser | Chrome / Edge / Firefox / Safari | For development and testing |

### External services

| Service | Purpose | Required? |
|---|---|---|
| Google Gemini API key | AI insight generation | Yes, for AI features (`VITE_GEMINI_API_KEY`) |
| Netlify account | Hosting + form submissions | Yes, for contact/survey forms in production |
| GitHub account | Source hosting / CI trigger for Netlify | Recommended |

---

## 3. Technology Stack

### Runtime dependencies

| Package | Version | Role |
|---|---|---|
| `react`, `react-dom` | ^18.2.0 | UI framework |
| `react-router-dom` | ^6.23.1 | Client-side routing (HashRouter) |
| `framer-motion` | ^11.2.10 | Page and element animations |
| `recharts` | ^2.12.7 | Charts and data visualization |
| `@google/generative-ai` | ^0.12.0 | Google Gemini SDK (model: `gemini-1.5-flash`) |
| `@emailjs/browser` | ^4.3.3 | Client-side email sending |

### Development dependencies

| Package | Version | Role |
|---|---|---|
| `typescript` | ^5.2.2 | Static typing |
| `vite` | ^5.2.0 | Dev server + production bundler |
| `@vitejs/plugin-react` | ^4.2.1 | React fast-refresh + JSX transform |
| `tailwindcss` | ^3.4.3 | Utility-first CSS framework |
| `postcss` + `autoprefixer` | ^8.4.38 / ^10.4.19 | CSS processing pipeline |
| `@types/react`, `@types/react-dom` | ^18.2.x | Type definitions |

---

## 4. Architecture Overview

```
Browser
  └── index.html  (hosts #root + hidden Netlify form definitions)
        └── src/main.tsx  (React entry — mounts <App />)
              └── src/App.tsx  (HashRouter + route table)
                    └── components/Layout.tsx  (shared shell)
                          ├── components/Header.tsx
                          ├── <Outlet />  → one of 10 page components (src/pages/)
                          ├── components/Footer.tsx
                          └── components/WhatsAppButton.tsx
Services
  └── src/services/geminiService.ts → Google Gemini API (gemini-1.5-flash)
Forms
  └── Contact + Survey → POST to Netlify Forms (serverless)
```

Design decisions worth knowing:

- **HashRouter** (URLs like `/#/contact`) is used instead of BrowserRouter, so the SPA works on any static host without server-side redirect rules.
- **Netlify Forms** requires hidden "dummy" copies of every form (with every field name) in `index.html` so Netlify's build bots can register the form schema — do not remove them.
- **AI image generation** in `geminiService.ts` is simulated client-side (the browser Gemini SDK does not support image generation); it returns a dynamic placeholder image.

---

## 5. Project Structure

```
rotis-tech-website/
│
├── index.html               # HTML entry; #root div + hidden Netlify forms
├── package.json             # Name: rotis-tech-portfolio, v1.0.0, scripts, deps
├── vite.config.ts           # Vite config (React plugin only)
├── tailwind.config.js       # Brand theme: colors, fonts, content globs
├── postcss.config.js        # tailwindcss + autoprefixer
├── tsconfig.node.json       # TS config for Node-side tooling (vite.config.ts)
├── .gitignore               # Excludes node_modules, dist, .env.local, etc.
│
├── README.md                # Project overview and quick start
├── DOCUMENTATION.md         # This file
├── GITHUB_UPLOAD_GUIDE.md   # How to publish this repo to GitHub
├── LICENSE                  # Proprietary license
│
├── public/                  # Served as-is at site root
│   ├── assets/              # rotis-logo.png, rotis-logo.svg
│   ├── documents/           # Usman-Yasin-CV.pdf, certificates, transcripts
│   └── images/              # Product & service imagery (dashboard, kitchen, …)
│
└── src/
    ├── main.tsx             # ReactDOM.createRoot(...).render(<App />)
    ├── App.tsx              # HashRouter route definitions
    ├── index.css            # @tailwind directives + global base styles
    ├── components/          # Reusable UI (see §7)
    ├── pages/               # Route-level pages (see §6)
    └── services/
        └── geminiService.ts # Gemini AI wrapper (see §8)
```

---

## 6. Routing & Pages

All routes are declared in [src/App.tsx](src/App.tsx) inside a `HashRouter`, nested under the shared `Layout`:

| URL (hash) | File | Purpose |
|---|---|---|
| `/#/` | `src/pages/Home.tsx` | Landing page — hero and company introduction |
| `/#/about-company` | `src/pages/AboutCompany.tsx` | Company vision, mission, background |
| `/#/solution-rotis` | `src/pages/RotisSolution.tsx` | Flagship product: the ROTIS platform |
| `/#/portfolio-impact` | `src/pages/PortfolioImpact.tsx` | Portfolio and measurable impact |
| `/#/tech-stack` | `src/pages/TechStack.tsx` | Technologies used by the company |
| `/#/core-services` | `src/pages/CoreServices.tsx` | Service offerings (AI, cloud, mobile, UI/UX, …) |
| `/#/ai-expertise` | `src/pages/AiExpertise.tsx` | AI capabilities and expertise |
| `/#/acclaim-visa` | `src/pages/AcclaimVisa.tsx` | Founder credentials and achievements |
| `/#/contact` | `src/pages/Contact.tsx` | Contact form (Netlify Forms) |
| `/#/trial-demo` | `src/pages/TrialDemo.tsx` | Trial / demo request |

**Adding a new page:** create `src/pages/YourPage.tsx`, import it in `App.tsx`, and add a `<Route path="your-path" element={<YourPage />} />` inside the `Layout` route. Add a nav link in `Header.tsx`.

---

## 7. Components

| Component | File | Description |
|---|---|---|
| `Layout` | `src/components/Layout.tsx` | Page shell: renders `Header`, the routed page via `<Outlet />`, `Footer`, and the floating WhatsApp button |
| `Header` | `src/components/Header.tsx` | Top navigation bar linking to all pages |
| `Footer` | `src/components/Footer.tsx` | Footer with company information |
| `SurveyModal` | `src/components/SurveyModal.tsx` | Multi-question market-research survey; submits to the Netlify `survey` form; styled by `Survey.css` |
| `WhatsAppButton` | `src/components/WhatsAppButton.tsx` | Floating button opening a WhatsApp chat with the company number |

---

## 8. Services & AI Integration

### `src/services/geminiService.ts`

Wraps the Google Gemini SDK. Reads the API key from `import.meta.env.VITE_GEMINI_API_KEY`.

| Function | Signature | Behavior |
|---|---|---|
| `generateAiInsight` | `(prompt: string) => Promise<string>` | Sends a hospitality-industry-framed prompt to **gemini-1.5-flash** and returns the text response. Returns a friendly error string if the key is missing or the call fails. |
| `generateAiImage` | `(prompt: string) => Promise<string>` | **Simulated** — the client-side SDK cannot generate images, so this returns a dynamic placeholder image URL derived from the prompt. A production implementation would call a backend using a server-side SDK. |

> 🔑 The key is exposed to the browser (as with any `VITE_`-prefixed variable). Restrict the key in Google AI Studio (HTTP referrer restrictions) for production use.

---

## 9. Forms (Netlify)

Two forms are handled serverlessly by **Netlify Forms**:

1. **`contact`** — name, email, message (used by `src/pages/Contact.tsx`).
2. **`survey`** — 17 fields of market-research questions (used by `src/components/SurveyModal.tsx`).

**How it works:** Netlify's build bots scan static HTML at deploy time. Since this is a JS-rendered SPA, hidden mirror forms with `data-netlify="true"` and **every field name** exist in [index.html](index.html). At runtime, the React components POST URL-encoded data including a `form-name` field.

**Rules when modifying forms:**
- Any new field added in a React form **must also be added** to the matching hidden form in `index.html`, with an identical `name` attribute.
- Field names must match **exactly** (they include full question text for the survey).
- Both forms use the `bot-field` honeypot for spam protection.

Submissions appear in the Netlify dashboard under **Forms**.

---

## 10. Styling & Theming

- **Tailwind CSS 3** with a custom brand theme defined in [tailwind.config.js](tailwind.config.js) (brand colors such as `brand-dark`, `brand-light`, `brand-secondary`, custom fonts).
- Global styles in [src/index.css](src/index.css): the three `@tailwind` directives, dark body background, and a custom teal scrollbar.
- The survey modal has dedicated plain CSS in `src/components/Survey.css`.
- Animations are done with **Framer Motion** (page transitions, reveals).
- The design is **dark-themed and mobile-first**; prefer Tailwind utilities over new CSS files.

---

## 11. Environment Variables

Create `.env.local` in the project root (git-ignored):

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes (for AI features) | Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) |

Notes:
- Vite only exposes variables prefixed with `VITE_` to client code.
- On Netlify, set the same variable under **Site settings → Environment variables** — `.env.local` is not deployed.
- Restart the dev server after changing environment files.

---

## 12. Installation & Local Development

```bash
# 1. Clone
git clone https://github.com/<your-username>/rotis-tech-website.git
cd rotis-tech-website

# 2. Install dependencies
npm install

# 3. Configure environment
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local

# 4. Run the dev server (http://localhost:5173)
npm run dev
```

| Script | Command | Purpose |
|---|---|---|
| Dev | `npm run dev` | Vite dev server with hot module replacement |
| Build | `npm run build` | Production bundle → `dist/` |
| Preview | `npm run preview` | Serve `dist/` locally to verify the production build |

> Note: Netlify form submissions do **not** work on localhost — they require the site to be deployed on Netlify. Everything else works locally.

---

## 13. Build & Deployment

### Production build

```bash
npm run build     # outputs static site to dist/
npm run preview   # optional: smoke-test the build locally
```

### Deploying to Netlify (recommended — required for forms)

1. Push the repo to GitHub ([GITHUB_UPLOAD_GUIDE.md](GITHUB_UPLOAD_GUIDE.md)).
2. Netlify → **Add new site → Import an existing project → GitHub** → select the repo.
3. Settings: build command `npm run build`, publish directory `dist`.
4. Add environment variable `VITE_GEMINI_API_KEY`.
5. Deploy. Verify both forms appear under the site's **Forms** tab.

Every push to the connected branch triggers an automatic redeploy.

---

## 14. Static Assets

Everything in `public/` is copied verbatim to the site root at build time:

| Path | Contents |
|---|---|
| `public/assets/` | Company logos (`rotis-logo.png`, `rotis-logo.svg`) |
| `public/documents/` | Founder documents: CV, experience certificate, educational transcripts (PDF) |
| `public/images/` | Product screenshots (dashboard, kitchen, inventory, forecasting, menu, contactless) and service card images (`service-*.jpg`) |

Reference them with root-absolute paths, e.g. `/images/dashboard.jpg`.

---

## 15. Troubleshooting

| Problem | Cause / Fix |
|---|---|
| `VITE_GEMINI_API_KEY is not set` in console | Create `.env.local` with the key; restart `npm run dev`. On Netlify, set the env var in site settings and redeploy. |
| Forms don't submit locally | Expected — Netlify Forms only works on a deployed Netlify site. |
| Survey submissions missing fields | The field `name` in the React component doesn't exactly match the hidden form in `index.html`. Make them identical. |
| Blank page after deploy on a non-Netlify host | Ensure you deployed the `dist/` folder contents; HashRouter needs no redirects, so check the browser console for asset 404s (base path). |
| `npm install` fails | Verify Node.js is v18+ (`node -v`); delete `node_modules` and `package-lock.json`, then reinstall. |
| Styles missing / unstyled page | Tailwind content globs in `tailwind.config.js` must cover the file where you used the classes. |

---

## 16. License & Credits

| | |
|---|---|
| **Project** | ROTIS |
| **Company** | Rotis Tech (Private) Limited |
| **CEO & Owner** | Usman Yaseen |
| **Developed by** | dotwasi |
| **License** | Proprietary — see [LICENSE](LICENSE) |

**Copyright © 2026 Rotis Tech (Private) Limited. All Rights Reserved.**

This software and its documentation are the confidential and proprietary property of Rotis Tech (Private) Limited. Unauthorized copying, modification, distribution, or use, via any medium, is strictly prohibited without prior written permission from the owner.
