# Comment System Implementation Plan

## Overview
Implement a full-featured comment system with authentication, real-time updates, and moderation.

## Technology Stack
- **Auth**: NextAuth.js v5 (Google/GitHub OAuth + credentials)
- **Database**: Supabase PostgreSQL + Prisma ORM
- **Real-time**: Supabase Realtime (WebSocket subscriptions)
- **Moderation**: Rate limiting + blocked words filter + admin dashboard

---

## Phase 1: Foundation Setup

### 1.1 Install Dependencies
```bash
npm install next-auth @prisma/client @supabase/supabase-js @auth/prisma-adapter bcryptjs
npm install -D prisma @types/bcryptjs
```

### 1.2 Environment Variables
Create `.env.local`:
```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"

# Supabase Realtime
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### 1.3 Database Schema
**File**: `prisma/schema.prisma`

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  password      String?
  role          UserRole  @default(USER)
  posts         Post[]
  comments      Comment[]
  accounts      Account[]
  sessions      Session[]
}

model Post {
  id        String    @id @default(cuid())
  slug      String    @unique
  title     String
  content   String
  excerpt   String
  published Boolean   @default(false)
  authorId  String
  author    User      @relation(...)
  comments  Comment[]
}

model Comment {
  id        String        @id @default(cuid())
  content   String
  status    CommentStatus @default(PENDING)
  postId    String
  authorId  String
  parentId  String?       // For replies (max 2 levels)
  // Relations...
}

enum UserRole { USER, MODERATOR, ADMIN }
enum CommentStatus { PENDING, APPROVED, REJECTED, SPAM }
```

---

## Phase 2: Authentication

### Files to Create:
| File | Purpose |
|------|---------|
| `src/lib/prisma.ts` | Prisma client singleton |
| `src/lib/auth.ts` | NextAuth configuration |
| `src/app/api/auth/[...nextauth]/route.ts` | Auth API route |
| `src/app/auth/signin/page.tsx` | Custom sign-in page |

### Auth Features:
- Google + GitHub OAuth providers
- Optional credentials (email/password)
- JWT sessions with user role
- Session includes: `id`, `email`, `name`, `image`, `role`

---

## Phase 3: Blog Post Infrastructure

### Update Existing:
- `src/app/blog/page.tsx` - Fetch posts from database

### Create New:
| File | Purpose |
|------|---------|
| `src/app/blog/[slug]/page.tsx` | Individual post page with comments |

### Post Features:
- Dynamic routing by slug
- Author info display
- Comment section integration

---

## Phase 4: Comment System

### API Routes:
| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/posts/[slug]/comments` | GET, POST | List/create comments |
| `/api/comments/[id]` | PATCH, DELETE | Edit/delete comment |

### UI Components:
| Component | Location | Purpose |
|-----------|----------|---------|
| `CommentForm` | `src/components/comments/` | Textarea + submit button |
| `Comment` | `src/components/comments/` | Single comment display |
| `CommentList` | `src/components/comments/` | Container with real-time |

### Comment Features:
- Create, edit, delete (own or admin)
- Nested replies (2 levels max)
- Optimistic UI updates
- Character limit (2000)

---

## Phase 5: Real-time Updates

### Files to Create:
| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client |
| `src/hooks/useCommentsRealtime.ts` | Real-time subscription hook |

### Real-time Flow:
1. Initial fetch via API route
2. Subscribe to `Comment` table changes via Supabase Realtime
3. On INSERT/UPDATE/DELETE → update local state
4. Refetch for INSERT to get full author data

---

## Phase 6: Moderation System

### Moderation Files:
| File | Purpose |
|------|---------|
| `src/lib/moderation/rate-limiter.ts` | 5 comments/minute limit |
| `src/lib/moderation/blocked-words.ts` | Content filtering |
| `src/lib/moderation/index.ts` | Main moderation pipeline |

### Admin Dashboard:
| File | Purpose |
|------|---------|
| `/api/admin/comments/route.ts` | Bulk moderation API |
| `/app/admin/comments/page.tsx` | Admin moderation UI |

### Moderation Features:
- Rate limiting: 5 comments per minute per user
- Blocked words: Auto-flag as SPAM
- Status workflow: PENDING → APPROVED/REJECTED/SPAM
- Bulk actions: Approve/reject multiple comments

---

## Phase 7: Layout Updates

### Update:
- `src/app/layout.tsx` - Add SessionProvider, user menu, admin link

### Add Navigation:
- Sign in/out buttons
- User avatar when authenticated
- Admin link for ADMIN/MODERATOR roles

---

## Implementation Order

1. **Foundation** (Phase 1)
   - Install deps, env vars, Prisma schema, run migrations

2. **Auth** (Phase 2)
   - NextAuth config, API route, sign-in page

3. **Blog Infrastructure** (Phase 3)
   - Seed posts to database, dynamic post pages

4. **Comments Core** (Phase 4)
   - API routes, UI components (no real-time yet)

5. **Real-time** (Phase 5)
   - Supabase client, realtime hook integration

6. **Moderation** (Phase 6)
   - Rate limiter, blocked words, admin dashboard

7. **Polish** (Phase 7)
   - Layout updates, error handling, tests

---

## File Structure Summary

```
prisma/
└── schema.prisma

src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── posts/[slug]/comments/route.ts
│   │   ├── comments/[id]/route.ts
│   │   └── admin/comments/route.ts
│   ├── auth/signin/page.tsx
│   ├── admin/comments/page.tsx
│   ├── blog/
│   │   ├── page.tsx (update)
│   │   └── [slug]/page.tsx (new)
│   └── layout.tsx (update)
├── components/
│   └── comments/
│       ├── Comment.tsx
│       ├── CommentForm.tsx
│       ├── CommentList.tsx
│       └── index.ts
├── hooks/
│   └── useCommentsRealtime.ts
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── supabase.ts
│   └── moderation/
│       ├── index.ts
│       ├── rate-limiter.ts
│       └── blocked-words.ts
└── types/
    └── next-auth.d.ts (type augmentation)
```

---

## Critical Files to Modify

| Existing File | Changes |
|---------------|---------|
| `src/app/blog/page.tsx` | Fetch from DB, link to individual posts |
| `src/app/layout.tsx` | SessionProvider, user menu |
| `CLAUDE.md` | Update project structure documentation |
| `package.json` | New dependencies |
