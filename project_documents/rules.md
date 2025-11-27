Portfolio – Project Rules

These rules apply to this project and to any AI assistant (Claude Code) working inside it.

Root path (Windows):

- `c/projects/brandon's_portfolio`

Always wrap the path in quotes in terminals:

- `cd "c/projects/brandon's_portfolio"`

---

## 1. Tech Stack

**Frontend**

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Library: shadcn/ui
- Additional UI source: v0 blocks (imported via `npx shadcn@latest add "<url>"`)

**Backend / Data**

- Supabase:
  - Postgres DB
  - Auth
  - Storage (for images if needed)
- API: Next.js route handlers or RSC queries via Supabase client

---

## 2. Project Structure Rules

Inside `c/projects/brandon's_portfolio/app`:

- Source root: `src/`

**Expected structure:**

- `src/app/`
  - `page.tsx` – home page
  - `layout.tsx` – root layout
  - `about/` – about page
  - `projects/` – projects gallery
  - `contact/` – contact page
  - `login/` – login page
  - `admin/` – admin centre
- `src/components/`
  - `ui/` – shadcn components
  - `layout/` – layout, header, footer, navigation
  - `portfolio/` – portfolio-specific UI (cards, grids, etc.)
- `src/lib/`
  - `supabaseClient.ts` – client setup
  - Any helpers: `auth.ts`, `validators.ts`, etc.
- `public/`
  - Static assets (favicons, logos, OG images, etc.)

**Rules:**

- Do not dump random components into `src/app`. Put reusable components in `src/components`.
- Keep v0-generated components grouped logically (e.g. under `portfolio/`) once you refactor.
- Avoid deep nesting beyond 3 levels unless necessary.

---

## 3. Naming Conventions

**Files**

- React components: `PascalCase.tsx`
  - Example: `ProjectCard.tsx`, `AdminSidebar.tsx`
- Hooks / utils: `camelCase.ts`
  - Example: `useSupabaseAuth.ts`, `getProjectBySlug.ts`
- Route files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` as per Next standards.

**Components**

- Component names must match file names:
  - `ProjectCard.tsx` → `export function ProjectCard(...) {}`
- Avoid generic names like `Component.tsx`, `Widget.tsx`.

**Database tables**

- Use `snake_case` for tables and columns:
  - `portfolio_projects`
  - `created_at`, `updated_at`
- Relation field names:
  - `user_id`, `project_id`, etc.

---

## 4. TypeScript & Code Quality

- TypeScript is **mandatory**.
- Enable strict mode (`"strict": true`) in `tsconfig.json` if it isn’t already.
- No `any` unless absolutely unavoidable. Prefer:
  - Proper interfaces / types.
  - Inferred types where obvious.

**Promises / async:**

- Always `await` async calls.
- Wrap critical Supabase calls in `try/catch` when used in client components or handlers that can fail.

**Imports:**

- Use configured alias: `@/` for imports:
  - `import { ProjectCard } from "@/components/portfolio/ProjectCard";`
- Do not use long relative paths like `../../../components/...` when `@/` is available.

---

## 5. Tailwind & UI Rules

**General**

- Use Tailwind classes for layout and spacing.
- Avoid inline styles unless necessary.
- Prefer shadcn primitives for buttons, inputs, forms, etc.

**Spacing & layout**

- Base spacing scale: use Tailwind defaults (`p-4`, `p-6`, `gap-4`, `gap-6`).
- Keep sections consistent:
  - Max width: typically `max-w-5xl` or `max-w-6xl`, centered with `mx-auto`.
  - Horizontal padding: `px-4` or `px-6` on small, `px-8`+ on large.

**Typography**

- Use a consistent set of sizes:
  - Page title: `text-3xl md:text-4xl font-bold`
  - Section title: `text-2xl md:text-3xl font-semibold`
  - Body: `text-sm md:text-base`
- Don’t hardcode random font families unless configured in Tailwind.

**Components from v0**

- After importing a v0 block:
  - Clean up unused props, imports and dead code.
  - Align spacing / typography with the rest of the site.
  - Avoid leaving placeholder text or gibberish.

---

## 6. Routing & Pages

**Required routes**

- `/` – Home
  - Hero, short intro, featured projects.
- `/projects` – Full gallery
  - List of all projects from Supabase.
- `/about` – Brandon’s bio, skills, tech stack.
- `/contact` – Contact info or simple form.
- `/login` – Supabase auth entry.
- `/admin` – Admin dashboard (protected).

**Rules**

- No random additional top-level routes without purpose.
- Use nested segments inside `/admin` for admin views, e.g.:
  - `/admin/projects`
  - `/admin/profile`
- Public routes must **never** expose admin-only data.

---

## 7. Supabase Rules

**Environment**

- Only use:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- These must be stored in `.env.local` (not committed).
- All Supabase client instances must come from `src/lib/supabaseClient.ts`.

**Tables**

- Core table for this project:
  - `portfolio_projects`
- Minimum fields:
  - `id` (uuid or bigint, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `thumbnail_url` (text)
  - `tags` (text[] or text)
  - `github_url` (text, nullable)
  - `live_url` (text, nullable)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

**RLS (Row Level Security)**

- For public reading of projects:
  - RLS may allow read access to `portfolio_projects` for anonymous users.
- For write access:
  - Limit to authenticated users, and ideally only to the two admin accounts.

---

## 8. Auth & Admin Rules

**Admin users (hard requirement)**

Only these emails are allowed to manage content:

- `melwin@websies.co`
- `brandon.bui@gmail.com`

**Supabase auth**

- Enable email/password or magic link auth.
- The two admin accounts must be created in Supabase.

**Access control**

- `/login`:
  - Used for sign-in.
- `/admin` and nested routes:
  - Require user to be authenticated.
  - Require user email to be **one of the two admin emails above**.
  - Anyone else:
    - Redirect to `/` or show 403.

**Implementation rule**

- Do not hardcode business logic spread all over the app. Centralize admin check in a helper where possible, e.g.:

  ```ts
  export function isAdmin(email: string | null | undefined) {
    return email === "melwin@websies.co" || email === "brandon.bui@gmail.com";
  }
Use that helper consistently wherever admin gating is required.

9. Data Flow & Gallery Behaviour
Source of truth

All project data rendered in the gallery must come from Supabase (portfolio_projects).

No duplicated hardcoded project arrays in components.

Home page

Shows a limited set of featured projects.

Either:

is_featured boolean in DB, or

Selected top N projects by created_at or order.

Projects page

Shows full project list.

Basic filters are allowed (tags, categories) but not required from day one.

Admin

Must allow:

Create new project.

Update existing project.

Delete project.

Changes in admin must reflect on public pages without extra manual steps.

10. Error Handling & Logging
Runtime errors

For client-visible paths:

Use proper try/catch or error boundaries where appropriate.

Don’t leave the app broken with cryptic errors.

errors.md usage

If an error takes more than a few minutes to troubleshoot:

Log it in project_documents/errors.md with structure:

md
Copy code
## [Date] Short title

**Context:** what you were doing  
**Error:** full error message / stack  
**Cause:** what it turned out to be (if known)  
**Fix:** what you changed  
Keep it concise but clear enough so the same error isn’t repeated later.

11. project_state.md Rules
After each meaningful step (as defined in workflow.md phases):

Append a short entry with:

Phase or area (e.g. [P3], [Admin])

What was done

Any obvious TODOs

Example entry:

md
Copy code
[P3] v0 gallery integrated at /projects. Layout ok on desktop, needs mobile tweaks. Next: connect to Supabase data.
No walls of text. 1–4 lines per update is enough.

12. Claude Code Behaviour Rules
These are binding rules for AI working in this repo.

General

Always read workflow.md first to understand current phase.

After finishing each step or logical chunk:

Stop and ask:

“Continue to the next step?”
or

A specific question if input is needed.

Hard pause for Phase 4

Must not start Phase 4 (Supabase setup) without explicit confirmation from me.

Must ask:

“You said you need to do a few things with Supabase before Phase 4. Are you ready to proceed with Supabase setup now?”

Only proceed after clear confirmation.

File editing

When editing workflow.md, rules.md, errors.md, or project_state.md:

Keep formatting clean and consistent.

Don’t overwrite unrelated sections.

When touching many files at once:

Describe briefly in the chat what was changed and why.

Assumptions

If something is unclear:

Ask a direct question in the chat instead of guessing silently.

Do not introduce new major tools or libraries (e.g. Redux, Zustand, different UI kits) without approval.

