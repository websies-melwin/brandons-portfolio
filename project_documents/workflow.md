# Brandon’s Portfolio – Project Workflow

**Root path:**  
`c/projects/brandon's_portfolio`

**Project documents (used by Claude Code):**

- `project_documents/workflow.md` – this file
- `project_documents/rules.md` – coding / architecture rules
- `project_documents/errors.md` – log of any errors + fix notes
- `project_documents/project_state.md` – short status update after **every completed task**

> Because of the `'` in the folder name, always wrap the path in quotes in the terminal:  
> `cd "c/projects/brandon's_portfolio"`

---

## Execution rules for Claude Code

- After **every step or logical chunk of work in each phase**, Claude must:
  - Pause.
  - Ask either:
    - “Continue to the next step?” **or**
    - A specific question if it needs information or a decision from me.
- Claude must **not** auto-run entire phases without checking in.
- **Hard pause before Phase 4 (Supabase setup)**:
  - Before starting Phase 4, Claude must explicitly ask:  
    > “You said you need to do a few things with Supabase before Phase 4. Are you ready to proceed with Supabase setup now?”
  - It must only proceed with Phase 4 after I confirm.

For every meaningful completed step, Claude should also:
- Append a short update to `project_documents/project_state.md`.
- If an error occurred and took more than a few minutes to resolve, log it with details in `project_documents/errors.md`.

---

## Phase 0 – Local repo & environment

**Goal:** Clean project folder, Git initialized, project_documents ready for Claude Code.

**Tasks**

1. Create project directory (if not already exists):
   - `mkdir "c/projects/brandon's_portfolio"`
   - `cd "c/projects/brandon's_portfolio"`

2. Initialize Git:
   - `git init`
   - Create initial `.gitignore` (Node, Next, env files).

3. Create `project_documents` folder and base files:
   - `mkdir project_documents`
   - Create empty files:
     - `workflow.md` (this file)
     - `rules.md`
     - `errors.md`
     - `project_state.md`

4. Open this folder in Claude Code and pin the `project_documents` files.

**After completion:**  
Update `project_state.md` with a short note, e.g.:

> `[P0] Repo + project_documents created. Ready for app scaffold.`

---

## Phase 1 – Next.js app scaffold

**Goal:** Base Next.js + TypeScript + Tailwind app running locally.

**Tasks**

1. From project root (`c/projects/brandon's_portfolio`):

   ```bash
   npx create-next-app@latest app \
     --typescript \
     --tailwind \
     --eslint \
     --src-dir \
     --import-alias "@/*"
Move into the app folder:

bash
Copy code
cd app
Run dev server and confirm it works:

bash
Copy code
npm run dev
Confirm default Next.js page loads in the browser.

Commit initial scaffold:

bash
Copy code
git add .
git commit -m "chore: init next app"
Errors:
If create-next-app or npm install fails, copy the error + fix into project_documents/errors.md.

After completion:
Add to project_state.md:

[P1] Next.js TS+Tailwind app scaffolded and running locally.

Phase 2 – UI system (shadcn/ui baseline)
Goal: shadcn/ui installed and configured so the v0 block can be added cleanly.

Tasks

Ensure you’re inside the app folder (where package.json is).

Initialize shadcn:

bash
Copy code
npx shadcn@latest init
Accept defaults or align with preferred setup.

Verify:

components.json exists in the project root (inside app).

src/components/ui (or similar) is created.

Tailwind config updated according to shadcn instructions.

Add and test a sample component (e.g. button):

bash
Copy code
npx shadcn@latest add button
Use it in a test page and confirm it renders without errors.

Commit:

bash
Copy code
git add .
git commit -m "chore: init shadcn ui and test component"
Errors:
Log any shadcn / Tailwind issues in errors.md with problem + solution.

After completion:
Update project_state.md:

[P2] shadcn/ui initialized and verified with a test component.

Phase 3 – Integrate v0 Gallery Template
Goal: Import the gallery UI from v0 via shadcn add, get it rendering as a page.

v0 command (given):

bash
Copy code
npx shadcn@latest add "https://v0.app/chat/b/vdMmWZKSl1P?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mpHBcYpkkLYwoo4r.ojgotjRf5XSkNcy5N_ic2z_o1Fk4LciNDsfsB4kaQ7Ib3LyEHlQzeyQZ.I5xQoPXJi4DuELr0BxGAsg"
Tasks

Make sure you are in the app folder (root where package.json lives).

Run the exact command above, preserving the quotes.

Inspect what files were added:

New files under src/app/... (likely a page or route for the gallery).

Possibly new components under src/components/....

Start dev server:

bash
Copy code
npm run dev
Open the new gallery route in the browser:

Find the route created by the block (e.g. /gallery or whatever v0 generated).

Confirm:

Page compiles with no errors.

Layout and styling look correct.

Decide how it fits into routing:

Option A: make gallery the homepage – integrate it into src/app/page.tsx (or replace its content).

Option B: keep it at e.g. /gallery and add navigation from the home page.

Commit:

bash
Copy code
git add .
git commit -m "feat: add v0 gallery template via shadcn"
If the command fails

Capture the full error text and add to errors.md under a heading like:

md
Copy code
## v0 gallery import – error
Fallback if needed:

In v0, open Code view.

Copy the page and its components manually into src/app and src/components.

Fix imports until the app compiles and the gallery renders.

After completion:
Update project_state.md:

[P3] v0 gallery template imported and rendering in Next app (route: /...).

Phase 4 – Supabase setup (PAUSE BEFORE START)
IMPORTANT – HARD PAUSE:

Claude must not start this phase automatically.

Before starting Phase 4, Claude must ask:

“You said you need to do a few things with Supabase before Phase 4. Are you ready to proceed with Supabase setup now?”

Only proceed when I explicitly confirm.

Goal: Supabase project created, environment wired into Next, client ready.

Tasks

In Supabase dashboard:

Create new project: brandons_portfolio.

Obtain:

SUPABASE_URL

SUPABASE_ANON_KEY

In the app project folder, create .env.local:

env
Copy code
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
Install Supabase client library:

bash
Copy code
npm install @supabase/supabase-js
Create a Supabase client helper, e.g. src/lib/supabaseClient.ts:

ts
Copy code
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
Commit:

bash
Copy code
git add .
git commit -m "chore: configure supabase client"
After completion:
Add to project_state.md:

[P4] Supabase project created and wired into Next via supabase client helper.

Phase 5 – Admin Centre (2 users: you + Brandon)
Goal: Minimal admin panel to manage portfolio content, restricted to exactly 2 users.

High-level design

Auth via Supabase (email/password or magic link) with exactly two allowed accounts:

melwin@websies.co

brandon.bui@gmail.com

Admin route: /admin (protected).

From /admin, manage:

Projects / gallery items (title, description, images, tags).

Basic profile info (Brandon bio, socials, avatar).

Tasks

In Supabase:

Enable email auth.

Create two users manually with these emails:

melwin@websies.co

brandon.bui@gmail.com

Optionally:

Add a profiles table or use metadata to mark both as admin / owner.

In Next app:

Set up Supabase auth helpers (RSC or client-side, whatever standard you decide).

Create /login page:

Email + password or magic link login using Supabase.

Create /admin layout + page:

If user is not logged in → redirect to /login.

If logged in but email is not one of the two above → show 403 or redirect.

Admin UI skeleton:

/admin shows:

Simple navigation for “Projects”, “Profile”.

A table/list of projects (portfolio_projects in Supabase).

Implement basic CRUD for projects (at least create + list + delete, update later).

Wire gallery to admin data model:

Define portfolio_projects schema in Supabase (table fields):

id

title

slug

description

thumbnail_url

tags (array/text)

github_url (optional)

live_url (optional)

created_at, updated_at

Make sure admin creates/edits records in this table.

Commit in logical chunks:

bash
Copy code
git add .
git commit -m "feat: supabase auth and login page"
git add .
git commit -m "feat: admin route and basic project CRUD"
After completion:
Update project_state.md:

[P5] Admin centre created with Supabase auth (users: melwin@websies.co, brandon.bui@gmail.com), basic project CRUD connected to gallery data model.

Phase 6 – Content wiring & polish
Goal: Tie gallery UI to real Supabase data and finish the public-facing site.

Tasks

Replace any hardcoded gallery data with Supabase queries:

Server components or client hooks, depending on chosen pattern.

Use portfolio_projects table as the single source of truth.

Ensure each project item displayed in the gallery has:

Title

Category / tags

Short description

Thumbnail image (Supabase Storage or external URL)

Links (GitHub, live site) where relevant.

Build Brandon-specific pages:

/ – Hero section, intro, featured work (pull from Supabase).

/projects – Full gallery (all projects from Supabase).

/about – Brandon bio, skills, tech stack, maybe timeline.

/contact – Contact form or clear links (email, socials).

Responsiveness:

Test and adjust for:

Mobile (small screens)

Tablet

Desktop

Clean up:

Remove any unused components/imports from v0 block.

Standardize typography, spacing, and colors so the site feels cohesive.

Commit:

bash
Copy code
git add .
git commit -m "feat: connect gallery to supabase and finalize public pages"
After completion:
Add to project_state.md:

[P6] Public portfolio pages complete, Supabase-powered gallery, responsive and polished.