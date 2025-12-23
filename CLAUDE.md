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
│   │   ├── globals.css     # Global styles with CSS custom properties
│   │   ├── favicon.ico
│   │   ├── about/
│   │   │   └── page.tsx    # About page (/about)
│   │   ├── blog/
│   │   │   └── page.tsx    # Blog page (/blog)
│   │   └── preview/
│   │       └── page.tsx    # Component preview page (/preview)
│   ├── ui/                  # UI Component Library
│   │   ├── index.ts        # Main barrel export
│   │   ├── types.ts        # Shared types (Theme, Size, ColorVariant, etc.)
│   │   ├── utils/
│   │   │   └── cn.ts       # Class name utility (clsx + tailwind-merge)
│   │   ├── typography/     # Typography components
│   │   │   ├── Heading.tsx # h1-h6
│   │   │   ├── Text.tsx    # p, span, small, etc.
│   │   │   ├── Code.tsx    # code, pre, kbd
│   │   │   ├── Blockquote.tsx
│   │   │   └── List.tsx    # ul, ol, li
│   │   ├── forms/          # Form components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Label.tsx
│   │   │   ├── Fieldset.tsx
│   │   │   └── Form.tsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Container.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Stack.tsx   # Stack, HStack, VStack
│   │   │   ├── Grid.tsx
│   │   │   └── Section.tsx # section, article, aside
│   │   ├── data-display/   # Data display components
│   │   │   ├── Badge.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── DescriptionList.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── InitialsAvatar.tsx  # Initials-only avatar
│   │   │   └── Meter.tsx   # Progress and Meter
│   │   ├── navigation/     # Navigation components
│   │   │   ├── Link.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Menu.tsx
│   │   │   └── Tabs.tsx
│   │   └── feedback/       # Feedback components
│   │       ├── Alert.tsx
│   │       ├── Spinner.tsx
│   │       └── Skeleton.tsx
│   ├── components/         # App-specific components
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

## UI Library

Import components from `@/ui`:

```tsx
import { Button, Input, Card, Badge } from "@/ui";
```

### Dark Mode Support

All components support dual dark mode:
1. **Automatic**: Uses Tailwind's `dark:` prefix, respects `prefers-color-scheme`
2. **Explicit**: Pass `theme="light"` or `theme="dark"` prop to override

### Component Categories

- **Typography**: Heading, Text, Code, Pre, Kbd, Blockquote, List
- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio, Label, Form
- **Layout**: Container, Card, Divider, Stack, Grid, Section
- **Data Display**: Badge, Table, DescriptionList, Avatar, InitialsAvatar, Progress, Meter
- **Navigation**: Link, NavLink, Breadcrumb, Menu, Tabs
- **Feedback**: Alert, Spinner, Skeleton

## Conventions

- When adding a new page component, always add a link to that page in the navigation (`src/app/layout.tsx`)
- Always update CLAUDE.md with the project structure when new files are added
- Use UI components from `@/ui` for consistent styling
- Components support `theme`, `size`, and `variant` props for customization
