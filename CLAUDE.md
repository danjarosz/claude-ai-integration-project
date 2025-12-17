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