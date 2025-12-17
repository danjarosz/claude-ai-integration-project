# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

- Next.js 16 with App Router
- React 19, TypeScript, Tailwind CSS 4
- Source code in `src/` directory
- App Router pages in `src/app/`
- Path alias: `@/*` maps to `src/*`

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with navigation
│   │   ├── page.tsx        # Home page (/)
│   │   ├── globals.css     # Global styles
│   │   ├── favicon.ico
│   │   ├── about/
│   │   │   └── page.tsx    # About page (/about)
│   │   ├── blog/
│   │   │   └── page.tsx    # Blog page (/blog)
│   │   └── preview/
│   │       └── page.tsx    # Preview page (/preview)
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and helpers
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json
```

## Conventions

- When adding a new page component, always add a link to that page in the navigation (`src/app/layout.tsx`)
- Always update CLAUDE.md with the project structure when new files are added