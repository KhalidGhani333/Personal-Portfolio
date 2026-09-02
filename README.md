# Khalid Ghani — Portfolio

Personal portfolio site for Khalid Ghani — AI Automation Engineer & Website Developer.

Built with **Next.js 16 (App Router)**, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js dev server         |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build locally   |
| `npm run lint`  | Run oxlint                           |

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New… → Project** and import the GitHub repo.
3. Vercel auto-detects the **Next.js** preset — no configuration needed.
4. Deploy. Every push to the connected branch redeploys automatically and the
   production URL updates in place.

## Routes

| Path                   | Page                                    |
| ---------------------- | --------------------------------------- |
| `/`                    | Main portfolio (hero, about, projects…) |
| `/frontend-projects`   | Frontend project grid                   |
| `/full-stack-projects` | Full-stack project grid                 |
| `/ai-projects`         | AI project grid                         |

## Project structure

```
src/
  app/
    layout.tsx           Root layout, fonts, metadata
    page.tsx             Home route → <MainSite />
    globals.css          Tailwind entry + theme tokens
    frontend-projects/   Route pages (server components)
    full-stack-projects/
    ai-projects/
  components/
    MainSite.tsx         Client boundary for the interactive home page
    sections/            Hero, About, Projects, WhatYouGet, FAQ, Footer
    sidebar/             Fixed desktop sidebar cards
  lib/
    types.ts             Shared data + prop types
    scroll.ts, useActiveSection.ts, useFlyToTarget.ts
  data/content.ts        All copy, project lists, and nav config
public/                  Static images served at the site root
```
