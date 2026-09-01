# Khalid Ghani — Portfolio

Personal portfolio site for Khalid Ghani (RIYOX) — AI Automation Engineer & Website Developer.

Built with React 19, React Router, Vite, Tailwind CSS v4, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run oxlint                           |

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New… → Project** and import the GitHub repo.
3. Vercel auto-detects the Vite framework preset. Defaults are correct:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy.

`vercel.json` rewrites all routes to `index.html` so client-side routes
(`/frontend-projects`, `/full-stack-projects`, `/ai-projects`) resolve on
direct navigation and refresh.

## Project structure

```
src/
  components/
    sections/      Hero, About, Projects, WhatYouGet, FAQ, Footer
    sidebar/       Fixed desktop sidebar cards
  pages/           Sub-route pages for project categories
  lib/             Hooks and helpers (scroll, active section, fly-to-target)
  data/content.js  All copy, project lists, and nav config
public/            Static images served at the site root
```
