# Project State

[P0] Repo initialized with Git + .gitignore. project_documents folder ready. Ready for app scaffold.

[P1] Next.js TS+Tailwind app scaffolded in /app folder. Dev server verified at localhost:3003. Initial commit done.

[P2] shadcn/ui initialized and verified with test button component. Removed tw-animate-css import (caused build error). Committed.

[P3] v0 3D infinite gallery integrated at homepage (/). Uses placeholder images for now. Plan: gallery hero (2 rotations) → about preview → card gallery. Committed.

[P4] Supabase project connected (external account). .env.local created, @supabase/supabase-js installed, client helper at src/lib/supabaseClient.ts. Committed.

[P5] Admin centre created with Supabase auth. Login at /login, protected admin at /admin. Admin users: melwin@websies.co, brandon.bui04@gmail.com. Project CRUD with multi-media upload (first image = thumbnail, additional media via "+" button). portfolio_projects table with additional_media JSONB column. Committed.
